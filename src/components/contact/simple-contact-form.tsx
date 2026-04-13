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
  FORM_TEXTAREA_CLASS,
} from "@/components/forms/form-field-classes";
import { PhoneField } from "@/components/forms/phone-field";
import { GlassToggle } from "@/components/ui/glass-toggle";
import { Button } from "@/components/ui/button";
import {
  resolveForm,
  resolveFormValidation,
  resolveModalCloseLabel,
  resolveQuiz,
  resolveQuizOptionalLabel,
} from "@/i18n/fallbacks";
import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import { isValidEmail } from "@/lib/form-validation";
import { isValidInternationalPhone } from "@/lib/phone-international";
import { toLocalizedPath } from "@/lib/locale-path";
import { trackLeadContact } from "@/lib/analytics";
import { leadSubmitFailureMessage } from "@/lib/lead-form-error-message";
import { submitLead } from "@/lib/submit-lead";

type SimpleContactFormProps = {
  dictionary: SiteDictionary;
  title: string;
};

export function SimpleContactForm({ dictionary, title }: SimpleContactFormProps) {
  const form = resolveForm(dictionary);
  const validation = resolveFormValidation(dictionary);
  const ariaClose = resolveModalCloseLabel(dictionary);
  const locale = (dictionary.localeLabel === "RU" ? "ru" : "en") as Locale;
  const privacyHref = toLocalizedPath(locale, "privacy");
  const optionalLabel = resolveQuizOptionalLabel(resolveQuiz(dictionary), locale);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [telegram, setTelegram] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitErrorMessage, setSubmitErrorMessage] = useState<string | null>(null);

  const loading = status === "loading";
  const consentInvalid = consentError && !privacyConsent;

  const nameInvalid = submitAttempted && !name.trim();
  const phoneEmptyInvalid = submitAttempted && !phone.trim();
  const phoneFormatInvalid =
    submitAttempted &&
    phone.trim().length > 0 &&
    !isValidInternationalPhone(phone);
  const phoneInvalid = phoneEmptyInvalid || phoneFormatInvalid;
  const emailInvalid =
    submitAttempted && email.trim().length > 0 && !isValidEmail(email);

  const validationBanner =
    submitAttempted && (nameInvalid || phoneInvalid || emailInvalid)
      ? nameInvalid
        ? validation.required
        : phoneEmptyInvalid
          ? validation.required
          : phoneFormatInvalid
            ? validation.phone
            : validation.email
      : null;

  const onPrivacyToggle = (next: boolean) => {
    setPrivacyConsent(next);
    if (next) setConsentError(false);
  };

  const clearFieldFeedback = () => {
    setSubmitAttempted(false);
    setSubmitErrorMessage(null);
  };

  return (
    <>
      <form
        className="grid min-w-0 gap-3"
        onSubmit={async (event) => {
          event.preventDefault();
          setSubmitAttempted(true);
          if (!name.trim() || !phone.trim()) {
            return;
          }
          if (!isValidInternationalPhone(phone)) {
            return;
          }
          if (email.trim() && !isValidEmail(email)) {
            return;
          }
          if (!privacyConsent) {
            setConsentError(true);
            return;
          }
          setSubmitErrorMessage(null);
          setStatus("loading");
          const result = await submitLead({
            source: "Contact",
            locale,
            serviceLine: "—",
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            telegramOrMax: telegram.trim(),
            comment: comment.trim(),
          });
          setStatus("idle");
          if (!result.ok) {
            setSubmitErrorMessage(leadSubmitFailureMessage(form, result));
            return;
          }
          trackLeadContact();
          setShowSuccess(true);
          setSubmitAttempted(false);
          setName("");
          setPhone("");
          setEmail("");
          setTelegram("");
          setComment("");
          setPrivacyConsent(false);
          setConsentError(false);
        }}
      >
        <h3 className="page-section-h3">{title}</h3>
        {validationBanner ? (
          <div className={FORM_ERROR_STRIP_CLASS} role="alert">
            <p className={FORM_ERROR_TEXT_CLASS}>{validationBanner}</p>
          </div>
        ) : null}
        {submitErrorMessage ? (
          <div className={FORM_ERROR_STRIP_CLASS} role="alert">
            <p className={FORM_ERROR_TEXT_CLASS}>{submitErrorMessage}</p>
          </div>
        ) : null}
        <label className="grid min-w-0 gap-1.5">
          <span className={`${FORM_LABEL_CLASS} ${FORM_LABEL_REQUIRED_CLASS}`}>
            {form.name.label}
          </span>
          <input
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              clearFieldFeedback();
            }}
            className={FORM_INPUT_CLASS}
            placeholder={form.name.placeholder}
            aria-invalid={nameInvalid || undefined}
            aria-required
            data-filled={name.trim().length > 0 ? "true" : undefined}
            disabled={loading}
          />
        </label>
        <PhoneField
          id="contact-phone"
          value={phone}
          onChange={(v) => {
            setPhone(v);
            clearFieldFeedback();
          }}
          label={form.phone.label}
          nationalPlaceholder={form.phone.placeholder}
          dialAriaLabel={form.phoneDialAria}
          labelRequired
          invalid={phoneInvalid}
          disabled={loading}
        />
        <label className="grid min-w-0 gap-1.5">
          <span className={FORM_LABEL_CLASS}>
            {form.email.label}
            <span className="text-text-secondary/75"> ({optionalLabel})</span>
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              clearFieldFeedback();
            }}
            className={FORM_INPUT_CLASS}
            placeholder={form.email.placeholder}
            aria-invalid={emailInvalid || undefined}
            data-filled={email.trim().length > 0 ? "true" : undefined}
            disabled={loading}
          />
        </label>
        <label className="grid min-w-0 gap-1.5">
          <span className={FORM_LABEL_CLASS}>
            {form.telegram.label}
            <span className="text-text-secondary/75"> ({optionalLabel})</span>
          </span>
          <input
            value={telegram}
            onChange={(event) => {
              setTelegram(event.target.value);
              clearFieldFeedback();
            }}
            className={FORM_INPUT_CLASS}
            placeholder={form.telegram.placeholder}
            data-filled={telegram.trim().length > 0 ? "true" : undefined}
            disabled={loading}
          />
        </label>
        <label className="grid min-w-0 gap-1.5">
          <span className={FORM_LABEL_CLASS}>
            {form.comment.label}
            <span className="text-text-secondary/75"> ({optionalLabel})</span>
          </span>
          <textarea
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
              clearFieldFeedback();
            }}
            className={FORM_TEXTAREA_CLASS}
            placeholder={form.comment.placeholder}
            data-filled={comment.trim().length > 0 ? "true" : undefined}
            disabled={loading}
          />
        </label>

        <div className="min-w-0 max-w-2xl">
          <div className="flex gap-3 sm:gap-3.5">
            <GlassToggle
              id="contact-privacy-toggle"
              checked={privacyConsent}
              onCheckedChange={onPrivacyToggle}
              invalid={consentInvalid}
              disabled={loading}
              aria-labelledby="contact-consent-label"
            />
            <p
              id="contact-consent-label"
              className="min-w-0 flex-1 text-sm leading-relaxed text-text-secondary"
            >
              <span>{form.consentPrefix}</span>
              <Link
                href={privacyHref}
                className="interactive-line text-neon-line/90 underline decoration-neon-line/35 underline-offset-2 transition-colors hover:text-neon-line"
              >
                {form.consentPrivacyLink}
              </Link>
              <span>{form.consentSuffix}</span>
            </p>
          </div>
          {consentInvalid ? (
            <p className={`${FORM_ERROR_TEXT_CLASS} mt-2`} role="alert">
              {form.consentRequired}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="mt-1"
          loading={loading}
        >
          {loading ? form.submitLoading : form.submitIdle}
        </Button>
      </form>

      <FormSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title={form.successTitle}
        body={form.successText}
        primaryLabel={form.successPrimary}
        secondaryLabel={form.successSecondary}
        ariaClose={ariaClose}
        titleId="contact-form-success-title"
      />
    </>
  );
}
