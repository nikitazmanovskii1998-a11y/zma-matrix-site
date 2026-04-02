"use client";

import Link from "next/link";
import { useState } from "react";
import { FormSuccessModal } from "@/components/forms/form-success-modal";
import {
  FORM_ERROR_STRIP_CLASS,
  FORM_ERROR_TEXT_CLASS,
  FORM_INPUT_CLASS,
  FORM_LABEL_CLASS,
  FORM_LABEL_REQUIRED_CLASS,
} from "@/components/forms/form-field-classes";
import { PhoneField } from "@/components/forms/phone-field";
import { GlassToggle } from "@/components/ui/glass-toggle";
import { Button } from "@/components/ui/button";
import {
  formatQuizProgress,
  resolveForm,
  resolveFormValidation,
  resolveModalCloseLabel,
  resolveQuiz,
  resolveQuizOptionalLabel,
  resolveQuizProgressTemplate,
} from "@/i18n/fallbacks";
import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import { isValidEmail } from "@/lib/form-validation";
import { isValidInternationalPhone } from "@/lib/phone-international";
import { toLocalizedPath } from "@/lib/locale-path";
import { formatQuizAnswersForLead, quizServiceLine } from "@/lib/quiz-answers-format";
import { submitLead } from "@/lib/submit-lead";

type ProjectQuizProps = {
  dictionary: SiteDictionary;
  locale: Locale;
};

type Answers = Record<string, string | string[]>;
const ANSWER_BUTTON_BASE =
  "min-w-0 rounded border px-4 py-3 text-left break-words transition-colors";
const ANSWER_BUTTON_IDLE =
  "border-neon-line/20 bg-[var(--surface-2)] text-text-secondary hover:border-neon-line/35";
const ANSWER_BUTTON_ACTIVE =
  "border-neon-line/55 bg-[color-mix(in_srgb,var(--line-neon)_16%,var(--surface-2))] text-text-primary";

function computeFieldsValid(
  current: SiteDictionary["quiz"]["questions"][number] | undefined,
  answers: Answers,
): boolean {
  if (!current) return false;
  if (current.fields) {
    if (current.id === "contacts") {
      const nameVal = answers[`${current.id}.name`];
      const phoneVal = answers[`${current.id}.phone`];
      const nameOk =
        typeof nameVal === "string" && nameVal.trim().length > 0;
      const phoneOk =
        typeof phoneVal === "string" && isValidInternationalPhone(phoneVal);
      return nameOk && phoneOk;
    }
    const requiredKeys = current.fields.map((field) => field.id);
    return requiredKeys.every((key) => {
      const value = answers[`${current.id}.${key}`];
      return typeof value === "string" && value.trim().length > 0;
    });
  }
  const value = answers[current.id];
  if (current.allowMultiple) {
    return Array.isArray(value) && value.length > 0;
  }
  return typeof value === "string" && value.length > 0;
}

export function ProjectQuiz({ dictionary, locale }: ProjectQuizProps) {
  const quiz = resolveQuiz(dictionary);
  const formUi = resolveForm(dictionary);
  const validation = resolveFormValidation(dictionary);
  const questions = quiz.questions;

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [contactsShowErrors, setContactsShowErrors] = useState(false);

  const ariaClose = resolveModalCloseLabel(dictionary);
  const privacyHref = toLocalizedPath(locale, "privacy");

  if (questions.length === 0) {
    return null;
  }

  const current = questions[step];
  const isLast = step === questions.length - 1;
  const isContactsStep = current?.id === "contacts";

  const optionalLabel = resolveQuizOptionalLabel(quiz, locale);
  const progressText = formatQuizProgress(
    resolveQuizProgressTemplate(quiz, locale),
    step,
    questions.length,
    locale,
  );

  const fieldsValid = computeFieldsValid(current, answers);

  const contactName = String(answers["contacts.name"] ?? "").trim();
  const contactPhone = String(answers["contacts.phone"] ?? "").trim();
  const contactEmail = String(answers["contacts.email"] ?? "").trim();
  const contactsNameOk = contactName.length > 0;
  const contactsPhoneOk =
    contactPhone.length > 0 && isValidInternationalPhone(contactPhone);
  const contactsEmailOk =
    contactEmail.length === 0 || isValidEmail(contactEmail);

  const contactsValidationBanner =
    isContactsStep && contactsShowErrors
      ? !contactsNameOk
        ? validation.required
        : !contactsPhoneOk
          ? contactPhone.length === 0
            ? validation.required
            : validation.phone
          : !contactsEmailOk
            ? validation.email
            : null
      : null;

  const finishBrief = () => {
    setShowSuccess(true);
    setStep(0);
    setAnswers({});
    setPrivacyConsent(false);
    setConsentError(false);
    setContactsShowErrors(false);
  };

  const goToNext = () => {
    setStep((prev) => prev + 1);
  };

  const setSingle = (questionId: string, value: string, autoNext?: boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (autoNext) {
      setTimeout(() => {
        setStep((prev) => {
          if (prev >= questions.length - 1) return prev;
          return prev + 1;
        });
      }, 120);
    }
  };

  const toggleMulti = (questionId: string, value: string) => {
    setAnswers((prev) => {
      const currentValue = prev[questionId];
      const list = Array.isArray(currentValue) ? currentValue : [];
      const next = list.includes(value)
        ? list.filter((item) => item !== value)
        : [...list, value];
      return { ...prev, [questionId]: next };
    });
  };

  const setField = (questionId: string, fieldId: string, value: string) => {
    if (questionId === "contacts") {
      setContactsShowErrors(false);
      setSubmitError(false);
    }
    setAnswers((prev) => ({ ...prev, [`${questionId}.${fieldId}`]: value }));
  };

  const onNext = async () => {
    if (submitting) return;

    if (isLast && isContactsStep) {
      if (!contactsNameOk || !contactsPhoneOk || !contactsEmailOk) {
        setContactsShowErrors(true);
        return;
      }
      setContactsShowErrors(false);
      if (!privacyConsent) {
        setConsentError(true);
        return;
      }
      setSubmitError(false);
      setSubmitting(true);
      const name = contactName;
      const phone = contactPhone;
      const result = await submitLead({
        source: "Quiz",
        locale,
        serviceLine: quizServiceLine(answers),
        name,
        phone,
        email: contactEmail,
        telegramOrMax: String(answers["contacts.telegram"] ?? "").trim(),
        comment: formatQuizAnswersForLead(questions, answers),
      });
      setSubmitting(false);
      if (!result.ok) {
        setSubmitError(true);
        return;
      }
      finishBrief();
      return;
    }

    if (!fieldsValid) return;
    goToNext();
  };

  const onBack = () => {
    if (step === 0) return;
    setContactsShowErrors(false);
    setStep((prev) => prev - 1);
  };

  const onPrivacyToggle = (next: boolean) => {
    setPrivacyConsent(next);
    if (next) setConsentError(false);
  };

  if (!current) {
    return null;
  }

  const consentInvalid = consentError && !privacyConsent;

  return (
    <>
      <div className="surface-block surface-section">
        <h3 className="page-section-h3">{quiz.title}</h3>
        <p className="section-lead mt-3 min-w-0 max-w-3xl">{quiz.subtitle}</p>
        <div className="idea-detail mb-4 mt-5">{progressText}</div>
        <h4 className="idea-main font-semibold leading-snug">
          {current.question}
        </h4>

        {current.options ? (
          <div className="mt-6 grid min-w-0 gap-3 sm:grid-cols-2">
            {current.options.map((option, index) => {
              const selected = current.allowMultiple
                ? Array.isArray(answers[current.id]) &&
                  (answers[current.id] as string[]).includes(option)
                : answers[current.id] === option;
              return (
                <button
                  key={`${current.id}-${index}`}
                  type="button"
                  onClick={() =>
                    current.allowMultiple
                      ? toggleMulti(current.id, option)
                      : setSingle(current.id, option, true)
                  }
                  data-selected={selected ? "true" : "false"}
                  className={`${ANSWER_BUTTON_BASE} ${selected ? ANSWER_BUTTON_ACTIVE : ANSWER_BUTTON_IDLE}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        ) : null}

        {current.fields ? (
          <div className="mt-5 grid min-w-0 gap-3">
            {contactsValidationBanner ? (
              <div className={FORM_ERROR_STRIP_CLASS} role="alert">
                <p className={FORM_ERROR_TEXT_CLASS}>{contactsValidationBanner}</p>
              </div>
            ) : null}
            {current.fields.map((field) => {
              const value = (answers[`${current.id}.${field.id}`] as string) ?? "";
              const optionalSuffix =
                current.id === "contacts" && ["email", "telegram", "comment"].includes(field.id)
                  ? ` (${optionalLabel})`
                  : "";
              const isContacts = current.id === "contacts";
              const nameInvalid =
                isContacts && field.id === "name" && contactsShowErrors && !contactsNameOk;
              const phoneInvalid =
                isContacts && field.id === "phone" && contactsShowErrors && !contactsPhoneOk;
              const emailInvalid =
                isContacts &&
                field.id === "email" &&
                contactsShowErrors &&
                !contactsEmailOk;

              if (field.id === "phone") {
                return (
                  <PhoneField
                    key={field.id}
                    id="quiz-contacts-phone"
                    value={value}
                    onChange={(v) => setField(current.id, "phone", v)}
                    label={field.label}
                    nationalPlaceholder={field.placeholder}
                    dialAriaLabel={formUi.phoneDialAria}
                    labelRequired={isContacts}
                    invalid={phoneInvalid}
                    disabled={submitting}
                  />
                );
              }

              const labelClass =
                isContacts && field.id === "name"
                  ? `${FORM_LABEL_CLASS} ${FORM_LABEL_REQUIRED_CLASS}`
                  : FORM_LABEL_CLASS;

              return (
                <label key={field.id} className="grid min-w-0 gap-1.5">
                  <span className={labelClass}>
                    {field.label}
                    {optionalSuffix}
                  </span>
                  {field.type === "textarea" ? (
                    <textarea
                      value={value}
                      onChange={(event) =>
                        setField(current.id, field.id, event.target.value)
                      }
                      placeholder={field.placeholder}
                      className={`${FORM_INPUT_CLASS} min-h-28 resize-y`}
                      aria-invalid={nameInvalid || emailInvalid || undefined}
                      aria-required={isContacts && field.id === "name" ? true : undefined}
                      data-filled={value.trim().length > 0 ? "true" : undefined}
                      disabled={submitting}
                    />
                  ) : (
                    <input
                      type={field.type ?? "text"}
                      value={value}
                      onChange={(event) =>
                        setField(current.id, field.id, event.target.value)
                      }
                      placeholder={field.placeholder}
                      className={FORM_INPUT_CLASS}
                      aria-invalid={nameInvalid || emailInvalid || undefined}
                      aria-required={isContacts && field.id === "name" ? true : undefined}
                      data-filled={value.trim().length > 0 ? "true" : undefined}
                      disabled={submitting}
                    />
                  )}
                </label>
              );
            })}
          </div>
        ) : null}

        {isContactsStep ? (
          <div className="mt-6 min-w-0 max-w-2xl">
            <div className="flex gap-3 sm:gap-3.5">
              <GlassToggle
                id="quiz-privacy-toggle"
                checked={privacyConsent}
                onCheckedChange={onPrivacyToggle}
                invalid={consentInvalid}
                disabled={submitting}
                aria-labelledby="quiz-consent-label"
              />
              <p
                id="quiz-consent-label"
                className="min-w-0 flex-1 text-sm leading-relaxed text-text-secondary"
              >
                <span className="text-text-secondary">{formUi.consentPrefix}</span>
                <Link
                  href={privacyHref}
                  className="interactive-line text-neon-line/90 underline decoration-neon-line/35 underline-offset-2 transition-colors hover:text-neon-line"
                >
                  {formUi.consentPrivacyLink}
                </Link>
                <span className="text-text-secondary">{formUi.consentSuffix}</span>
              </p>
            </div>
            {consentInvalid ? (
              <p
                id="quiz-consent-error"
                className={`${FORM_ERROR_TEXT_CLASS} mt-2`}
                role="alert"
              >
                {formUi.consentRequired}
              </p>
            ) : null}
          </div>
        ) : null}

        <p
          className={`body-hint max-w-2xl ${isContactsStep ? "mt-4" : "mt-6"}`}
        >
          {quiz.helper}
        </p>

        {submitError ? (
          <div className={`${FORM_ERROR_STRIP_CLASS} mt-4`} role="alert">
            <p className={FORM_ERROR_TEXT_CLASS}>{formUi.submitError}</p>
          </div>
        ) : null}

        <div className="mt-6 flex min-w-0 flex-wrap items-center gap-2.5 sm:mt-7 sm:gap-3">
          <Button
            onClick={onBack}
            disabled={step === 0 || submitting}
            variant="secondary"
            size="md"
          >
            {quiz.back}
          </Button>
          <Button
            onClick={() => void onNext()}
            disabled={submitting || (!isLast && !fieldsValid)}
            variant="primary"
            size="md"
            loading={submitting && isLast && isContactsStep}
          >
            {submitting && isLast && isContactsStep
              ? formUi.submitLoading
              : isLast
                ? quiz.submit
                : quiz.next}
          </Button>
        </div>
      </div>

      <FormSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={formUi.successTitle}
        body={formUi.successText}
        primaryLabel={formUi.successPrimary}
        secondaryLabel={formUi.successSecondary}
        ariaClose={ariaClose}
        titleId="quiz-brief-success-title"
      />
    </>
  );
}
