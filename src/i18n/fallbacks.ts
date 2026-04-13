/**
 * Centralized runtime fallbacks for i18n leaves that must never crash the UI.
 * Canonical copy lives in RU/EN dictionaries; these strings only apply when a
 * value is missing, empty, or a future edit drops a nested key (check-i18n + TS
 * `satisfies` are the primary guarantees).
 */

import type { Locale } from "@/i18n/locales";
import { mergeSiteDictionary } from "@/i18n/merge-site-dictionary";
import type { SiteDictionary } from "@/i18n/types";
import { footerEn } from "@/i18n/dictionaries/footer/en";
import { footerRu } from "@/i18n/dictionaries/footer/ru";

function pickNonEmptyString(value: string | undefined, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function pickNonEmptyArray<T>(value: T[] | undefined, fallback: T[]): T[] {
  return Array.isArray(value) && value.length > 0 ? value : fallback;
}

const MOBILE_MENU: Record<Locale, SiteDictionary["mobileMenu"]> = {
  ru: {
    label: "Меню",
    open: "Открыть меню",
    close: "Закрыть меню",
    navigationTitle: "Навигация",
    contactsTitle: "Связь",
  },
  en: {
    label: "Menu",
    open: "Open menu",
    close: "Close menu",
    navigationTitle: "Navigation",
    contactsTitle: "Contact",
  },
};

const FORM_VALIDATION: Record<Locale, SiteDictionary["form"]["validation"]> = {
  ru: {
    required: "Заполните поле",
    phone: "Проверьте номер телефона",
    email: "Проверьте адрес почты",
  },
  en: {
    required: "Please fill in this field",
    phone: "Please check the phone number",
    email: "Please check the email address",
  },
};

const FORM_FALLBACK: Record<Locale, SiteDictionary["form"]> = {
  ru: {
    name: { label: "Имя", placeholder: "Как к вам обращаться" },
    phone: { label: "Телефон", placeholder: "Номер без кода страны" },
    email: { label: "Email", placeholder: "Почта для ответа" },
    telegram: { label: "Telegram", placeholder: "Ник или ссылка, если удобно" },
    comment: {
      label: "Комментарий",
      placeholder: "Кратко опишите задачу, контекст или пожелания",
    },
    phoneCountries: {
      ru: { label: "Россия" },
      us: { label: "United States" },
    },
    phoneDialAria: "Код страны",
    successTitle: "Бриф отправлен",
    successText:
      "Спасибо. Если заявка отправлена в рабочие часы, мы свяжемся с вами в течение 10–15 минут.\nЕсли запрос пришёл вне рабочего времени, вернёмся к вам в течение ближайшего рабочего дня.",
    successPrimary: "Понятно",
    successSecondary: "Закрыть",
    consentPrefix: "Я согласен с обработкой персональных данных и принимаю ",
    consentPrivacyLink: "политику конфиденциальности",
    consentSuffix: ".",
    consentRequired:
      "Подтвердите согласие с политикой конфиденциальности, чтобы отправить бриф.",
    submitIdle: "Отправить",
    submitLoading: "Отправляем...",
    submitSuccess: "Бриф отправлен. Свяжемся с вами после просмотра вводных.",
    submitError:
      "Не удалось отправить форму. Попробуйте ещё раз или напишите нам напрямую.",
    serviceUnavailable:
      "Сервер временно не принимает заявки. Напишите нам напрямую или попробуйте позже.",
    validation: FORM_VALIDATION.ru,
  },
  en: {
    name: { label: "Name", placeholder: "How should we address you?" },
    phone: { label: "Phone", placeholder: "Number without country code" },
    email: { label: "Email", placeholder: "Reply email" },
    telegram: { label: "Telegram", placeholder: "Username or link if easier" },
    comment: {
      label: "Comment",
      placeholder: "Briefly describe the task, context, or expectations",
    },
    phoneCountries: {
      ru: { label: "Russia" },
      us: { label: "United States" },
    },
    phoneDialAria: "Country code",
    successTitle: "Brief sent",
    successText:
      "Thank you. If your request was sent during working hours, we will get back to you within 10–15 minutes.\nIf it was sent outside working hours, we will respond during the next working day.",
    successPrimary: "Got it",
    successSecondary: "Close",
    consentPrefix: "I agree to the processing of personal data and accept the ",
    consentPrivacyLink: "privacy policy",
    consentSuffix: ".",
    consentRequired: "Please accept the privacy policy to send your brief.",
    submitIdle: "Submit",
    submitLoading: "Sending...",
    submitSuccess: "Brief sent. We’ll get back to you after reviewing the details.",
    submitError: "Could not send the form. Please try again or contact us directly.",
    serviceUnavailable:
      "We can’t accept submissions right now. Please contact us directly or try again later.",
    validation: FORM_VALIDATION.en,
  },
};

/** Full contact form copy merged with fallbacks (client-safe). */
export function resolveForm(dictionary: SiteDictionary): SiteDictionary["form"] {
  const locale: Locale = dictionary.localeLabel === "RU" ? "ru" : "en";
  const base = FORM_FALLBACK[locale];
  const cur = dictionary.form;
  if (!cur) return base;
  return mergeSiteDictionary(
    base as Record<string, unknown>,
    cur as Record<string, unknown>,
  ) as SiteDictionary["form"];
}

export function resolveMobileMenu(
  dictionary: SiteDictionary,
  locale: Locale,
): SiteDictionary["mobileMenu"] {
  const d = MOBILE_MENU[locale];
  const mm = dictionary.mobileMenu;
  if (!mm) return d;
  return {
    label: mm.label?.trim() ? mm.label : d.label,
    open: mm.open?.trim() ? mm.open : d.open,
    close: mm.close?.trim() ? mm.close : d.close,
    navigationTitle: mm.navigationTitle?.trim() ? mm.navigationTitle : d.navigationTitle,
    contactsTitle: mm.contactsTitle?.trim() ? mm.contactsTitle : d.contactsTitle,
  };
}

/** Footer copy merged with module defaults so missing nested keys never crash layout. */
export function resolveFooter(dictionary: SiteDictionary): SiteDictionary["footer"] {
  const locale: Locale = dictionary.localeLabel === "RU" ? "ru" : "en";
  const base = locale === "ru" ? footerRu : footerEn;
  return mergeSiteDictionary(
    base as Record<string, unknown>,
    (dictionary.footer ?? {}) as Record<string, unknown>,
  ) as SiteDictionary["footer"];
}

export function resolveFormValidation(
  dictionary: SiteDictionary,
): SiteDictionary["form"]["validation"] {
  return resolveForm(dictionary).validation;
}

export function resolveQuizProgressTemplate(
  quiz: SiteDictionary["quiz"] | undefined,
  locale: Locale,
): string {
  const fallback =
    locale === "ru" ? "Шаг {current} из {total}" : "Step {current} of {total}";
  if (!quiz) return fallback;
  const t = quiz.progress?.trim();
  return t ? t : fallback;
}

export function formatQuizProgress(
  template: string | undefined | null,
  stepZeroBased: number,
  totalSteps: number,
  locale?: Locale,
): string {
  let t = typeof template === "string" ? template.trim() : "";
  if (!t && locale) {
    t = locale === "ru" ? "Шаг {current} из {total}" : "Step {current} of {total}";
  }
  if (!t) t = "Step {current} of {total}";
  return t
    .replace("{current}", String(stepZeroBased + 1))
    .replace("{total}", String(totalSteps));
}

export function resolveQuizOptionalLabel(
  quiz: SiteDictionary["quiz"] | undefined,
  locale: Locale,
): string {
  const fallback = locale === "ru" ? "Необязательно" : "Optional";
  if (!quiz) return fallback;
  const t = quiz.optional?.trim();
  return t ? t : fallback;
}

const NAV_FALLBACK: Record<Locale, SiteDictionary["nav"]> = {
  ru: {
    home: "Главная",
    approach: "Подход",
    projects: "Проекты",
    services: "Услуги",
    about: "О нас",
    contacts: "Контакты",
    servicesPanelLabel: "Навигация по услугам",
    allServices: "Все услуги",
  },
  en: {
    home: "Home",
    approach: "Approach",
    projects: "Projects",
    services: "Services",
    about: "About",
    contacts: "Contacts",
    servicesPanelLabel: "Services navigation panel",
    allServices: "All services",
  },
};

const HEADER_FALLBACK: Record<Locale, SiteDictionary["header"]> = {
  ru: {
    brandLabel: "ZMA",
    brandDescriptor: "авторские сайты и цифровые среды",
  },
  en: {
    brandLabel: "ZMA",
    brandDescriptor: "custom websites and digital environments",
  },
};

const LANG_FALLBACK: SiteDictionary["lang"] = {
  ru: "RU",
  en: "EN",
};

const PRELOADER_FALLBACK: Record<Locale, SiteDictionary["preloader"]> = {
  ru: {
    entering: "Вход в структуру",
    stabilizing: "Стабилизация каналов",
  },
  en: {
    entering: "Entering structure",
    stabilizing: "Stabilizing channels",
  },
};

const COOKIE_CONSENT_SHELL: Record<Locale, SiteDictionary["cookieConsent"]> = {
  ru: {
    badge: "Cookie",
    title: "Настройки cookie",
    text: "Мы используем необходимые cookie для стабильной работы сайта, а дополнительные — для аналитики, предпочтений и улучшения цифрового опыта. Вы можете принять всё, оставить только необходимые или настроить выбор вручную.",
    acceptAll: "Принять всё",
    acceptNecessary: "Только необходимые",
    customize: "Настроить",
    save: "Сохранить выбор",
    close: "Закрыть",
    footerTrigger: "Настройки cookie",
    categories: {
      necessary: {
        title: "Необходимые",
        text: "Обеспечивают базовую работу сайта, навигацию, язык и техническую стабильность.",
      },
      analytics: {
        title: "Аналитика",
        text: "Помогают понимать, как используется сайт, какие разделы полезны и где нужно улучшить подачу.",
      },
      preferences: {
        title: "Предпочтения",
        text: "Запоминают выбранные параметры интерфейса и делают повторный визит удобнее.",
      },
      marketing: {
        title: "Маркетинг",
        text: "Используются для более точной коммуникации и оценки эффективности внешних каналов.",
      },
    },
  },
  en: {
    badge: "Cookie",
    title: "Cookie settings",
    text: "We use essential cookies to keep the site stable and usable, and optional cookies for analytics, preferences, and improving the digital experience. You can accept all, keep only essential cookies, or configure your choice manually.",
    acceptAll: "Accept all",
    acceptNecessary: "Essential only",
    customize: "Customize",
    save: "Save selection",
    close: "Close",
    footerTrigger: "Cookie settings",
    categories: {
      necessary: {
        title: "Essential",
        text: "Required for core site functionality, navigation, language handling, and technical stability.",
      },
      analytics: {
        title: "Analytics",
        text: "Help us understand how the site is used, which sections perform well, and where the experience should be improved.",
      },
      preferences: {
        title: "Preferences",
        text: "Remember selected interface options and make return visits more convenient.",
      },
      marketing: {
        title: "Marketing",
        text: "Used for more precise communication and evaluating the effectiveness of external channels.",
      },
    },
  },
};

export function resolveCookieConsent(dictionary: SiteDictionary): SiteDictionary["cookieConsent"] {
  const locale: Locale = dictionary.localeLabel === "RU" ? "ru" : "en";
  return mergeSiteDictionary(
    COOKIE_CONSENT_SHELL[locale] as Record<string, unknown>,
    (dictionary.cookieConsent ?? {}) as Record<string, unknown>,
  ) as SiteDictionary["cookieConsent"];
}

type QuizUiShell = Pick<
  SiteDictionary["quiz"],
  | "title"
  | "subtitle"
  | "next"
  | "back"
  | "submit"
  | "restart"
  | "progress"
  | "optional"
  | "helper"
  | "doneTitle"
  | "doneText"
  | "donePrimary"
  | "doneSecondary"
  | "consentPrefix"
  | "consentPrivacyLink"
  | "consentSuffix"
  | "consentRequired"
>;

const QUIZ_UI_BASE: Record<Locale, QuizUiShell> = {
  ru: {
    title: "Короткий бриф проекта",
    subtitle:
      "Ответьте на несколько вопросов — и мы быстрее поймём масштаб, структуру и подходящий формат работы.",
    next: "Дальше",
    back: "Назад",
    submit: "Отправить бриф",
    restart: "Пройти заново",
    progress: "Шаг {current} из {total}",
    optional: "Необязательно",
    helper: "Чем точнее вводные, тем быстрее можно выйти на рабочую структуру проекта.",
    doneTitle: "Бриф отправлен",
    doneText:
      "Спасибо. Если заявка отправлена в рабочие часы, мы свяжемся с вами в течение 10–15 минут.\nЕсли запрос пришёл вне рабочего времени, вернёмся к вам в течение ближайшего рабочего дня.",
    donePrimary: "Понятно",
    doneSecondary: "Закрыть",
    consentPrefix: "Я согласен с обработкой персональных данных и принимаю ",
    consentPrivacyLink: "политику конфиденциальности",
    consentSuffix: ".",
    consentRequired: "Подтвердите согласие с политикой конфиденциальности, чтобы отправить бриф.",
  },
  en: {
    title: "Project brief",
    subtitle:
      "Answer a few questions and we’ll understand the scope, structure, and best format much faster.",
    next: "Next",
    back: "Back",
    submit: "Send brief",
    restart: "Start over",
    progress: "Step {current} of {total}",
    optional: "Optional",
    helper: "The clearer the input, the faster we can shape a working project structure.",
    doneTitle: "Brief sent",
    doneText:
      "Thank you. If your request was sent during working hours, we will get back to you within 10–15 minutes.\nIf it was sent outside working hours, we will respond during the next working day.",
    donePrimary: "Got it",
    doneSecondary: "Close",
    consentPrefix: "I agree to the processing of personal data and accept the ",
    consentPrivacyLink: "privacy policy",
    consentSuffix: ".",
    consentRequired:
      "Please accept the privacy policy to send your brief.",
  },
};

const COMMON_SHELL: Record<Locale, SiteDictionary["common"]> = {
  ru: {
    calculateProject: "Рассчитать проект",
    writeTelegram: "Написать в Telegram",
  },
  en: {
    calculateProject: "Estimate the project",
    writeTelegram: "Discuss the task",
  },
};

const UI_SHELL: Record<Locale, SiteDictionary["ui"]> = {
  ru: {
    privacy: "Политика конфиденциальности",
    offer: "Публичная оферта",
    placeholderNote: "TODO: заменить на утвержденный контент.",
    loading: "Загрузка...",
    more: "Подробнее",
    open: "Открыть",
    close: "Закрыть",
    expand: "Развернуть",
    collapse: "Свернуть",
    copy: "Скопировать",
    copied: "Скопировано",
    soon: "Скоро",
    available: "Доступно",
    unavailable: "Недоступно",
    backHome: "На главную",
    backServices: "К услугам",
    backProjects: "К проектам",
  },
  en: {
    privacy: "Privacy policy",
    offer: "Public offer",
    placeholderNote: "TODO: replace with approved content.",
    loading: "Loading...",
    more: "More",
    open: "Open",
    close: "Close",
    expand: "Expand",
    collapse: "Collapse",
    copy: "Copy",
    copied: "Copied",
    soon: "Soon",
    available: "Available",
    unavailable: "Unavailable",
    backHome: "Back to home",
    backServices: "Back to services",
    backProjects: "Back to projects",
  },
};

const CONTACT_PAGE_BASE: Record<Locale, SiteDictionary["contactPage"]> = {
  ru: {
    seo: {
      pageMetaTitle: "Контакты — ZMA Resulting",
      pageMetaDescription:
        "Связь в Telegram, по телефону, email или короткая форма — брифы и запросы по сайтам, ботам и автоматизации.",
    },
    hero: "Контакты",
    heroLead:
      "Здесь вы получите ответ по задаче, варианты формата работ и понятный следующий шаг.",
    intro:
      "Если у вас уже есть задача — можно сразу выйти на разговор без лишних кругов.",
    contactsTitle: "Каналы связи",
    formTitle: "Короткая форма",
    formSubmit: "Отправить",
    contacts: [
      { label: "Telegram", value: "@zma_resulting", href: "https://t.me/zma_resulting" },
      { label: "Телефон", value: "8 928 308 66 86", href: "tel:+79283086686" },
      { label: "Email", value: "zmanovsckynikita@yandex.ru", href: "mailto:zmanovsckynikita@yandex.ru" },
      { label: "Форма", value: "Проектный бриф — на этой странице." },
    ],
    sendNowTitle: "Что отправить сразу",
    sendNow: [
      "Текущий сайт (если есть).",
      "Чем занимается бизнес.",
      "Что сейчас не работает.",
      "Что требуется собрать.",
      "Ориентир по срокам.",
    ],
    quizCta: "Отправить бриф — получить ответ по объёму и шагам",
    requisitesTitle: "Реквизиты",
    requisites: {
      name: "ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ ЗМАНОВСКИЙ НИКИТА АНАТОЛЬЕВИЧ",
      inn: "262608434224",
      ogrnip: "324265100035273",
    },
    helper: "Можно оставить короткий запрос, а можно сразу написать напрямую.",
    directWrite: "Написать напрямую",
  },
  en: {
    seo: {
      pageMetaTitle: "Contacts — ZMA Resulting",
      pageMetaDescription:
        "Reach out via Telegram, phone, email, or the short form — briefs and inquiries for websites, bots, and automation.",
    },
    hero: "Contacts",
    heroLead:
      "Here you get a response to your task, how we can work together, and a clear next step.",
    intro:
      "If you already have a task in mind, you can move straight to the conversation.",
    contactsTitle: "Contact options",
    formTitle: "Quick form",
    formSubmit: "Submit",
    contacts: [
      { label: "Telegram", value: "@zma_resulting", href: "https://t.me/zma_resulting" },
      { label: "Phone", value: "8 928 308 66 86", href: "tel:+79283086686" },
      { label: "Email", value: "zmanovsckynikita@yandex.ru", href: "mailto:zmanovsckynikita@yandex.ru" },
      { label: "Form", value: "The project brief is available on this page." },
    ],
    sendNowTitle: "Send this information immediately",
    sendNow: [
      "Current website (if exists).",
      "What the business does now.",
      "What is not working in current presentation.",
      "What should be built.",
      "Preferred timing.",
    ],
    quizCta: "Send the brief — get a scoped reply and next step",
    requisitesTitle: "Requisites",
    requisites: {
      name: "INDIVIDUAL ENTREPRENEUR ZMANOVSKIY NIKITA ANATOLYEVICH",
      inn: "262608434224",
      ogrnip: "324265100035273",
    },
    helper: "You can either leave a short request or reach out directly.",
    directWrite: "Contact directly",
  },
};

/** Quiz UI strings with safe `questions` array (never undefined). */
export function resolveQuiz(dictionary: SiteDictionary): SiteDictionary["quiz"] {
  const locale: Locale = dictionary.localeLabel === "RU" ? "ru" : "en";
  const shell = QUIZ_UI_BASE[locale];
  const q = dictionary.quiz;
  const questions = Array.isArray(q?.questions) ? q!.questions : [];
  return {
    title: pickNonEmptyString(q?.title, shell.title),
    subtitle: pickNonEmptyString(q?.subtitle, shell.subtitle),
    next: pickNonEmptyString(q?.next, shell.next),
    back: pickNonEmptyString(q?.back, shell.back),
    submit: pickNonEmptyString(q?.submit, shell.submit),
    restart: pickNonEmptyString(q?.restart, shell.restart),
    progress: pickNonEmptyString(q?.progress, shell.progress),
    optional: pickNonEmptyString(q?.optional, shell.optional),
    helper: pickNonEmptyString(q?.helper, shell.helper),
    doneTitle: pickNonEmptyString(q?.doneTitle, shell.doneTitle),
    doneText: pickNonEmptyString(q?.doneText, shell.doneText),
    donePrimary: pickNonEmptyString(q?.donePrimary, shell.donePrimary),
    doneSecondary: pickNonEmptyString(q?.doneSecondary, shell.doneSecondary),
    consentPrefix: pickNonEmptyString(q?.consentPrefix, shell.consentPrefix),
    consentPrivacyLink: pickNonEmptyString(
      q?.consentPrivacyLink,
      shell.consentPrivacyLink,
    ),
    consentSuffix: pickNonEmptyString(q?.consentSuffix, shell.consentSuffix),
    consentRequired: pickNonEmptyString(q?.consentRequired, shell.consentRequired),
    questions,
  };
}

export function resolveContactPage(dictionary: SiteDictionary): SiteDictionary["contactPage"] {
  const locale: Locale = dictionary.localeLabel === "RU" ? "ru" : "en";
  const b = CONTACT_PAGE_BASE[locale];
  const c = dictionary.contactPage;
  return {
    seo: {
      pageMetaTitle: pickNonEmptyString(c?.seo?.pageMetaTitle, b.seo.pageMetaTitle),
      pageMetaDescription: pickNonEmptyString(
        c?.seo?.pageMetaDescription,
        b.seo.pageMetaDescription,
      ),
    },
    hero: pickNonEmptyString(c?.hero, b.hero),
    heroLead: pickNonEmptyString(c?.heroLead, b.heroLead),
    intro: pickNonEmptyString(c?.intro, b.intro),
    contactsTitle: pickNonEmptyString(c?.contactsTitle, b.contactsTitle),
    formTitle: pickNonEmptyString(c?.formTitle, b.formTitle),
    formSubmit: pickNonEmptyString(c?.formSubmit, b.formSubmit),
    contacts: pickNonEmptyArray(c?.contacts, b.contacts),
    sendNowTitle: pickNonEmptyString(c?.sendNowTitle, b.sendNowTitle),
    sendNow: pickNonEmptyArray(c?.sendNow, b.sendNow),
    quizCta: pickNonEmptyString(c?.quizCta, b.quizCta),
    requisitesTitle: pickNonEmptyString(c?.requisitesTitle, b.requisitesTitle),
    requisites: mergeSiteDictionary(
      b.requisites as Record<string, unknown>,
      (c?.requisites ?? {}) as Record<string, unknown>,
    ) as SiteDictionary["contactPage"]["requisites"],
    helper: pickNonEmptyString(c?.helper, b.helper),
    directWrite: pickNonEmptyString(c?.directWrite, b.directWrite),
  };
}

/**
 * Single pass applied after locale load: fills known fragile subtrees so client and
 * server components can read `dictionary.*` without deep optional chaining.
 */
export function tightenSiteDictionary(dictionary: SiteDictionary): SiteDictionary {
  const locale: Locale = dictionary.localeLabel === "RU" ? "ru" : "en";
  const { nav, header, lang } = resolveSiteHeaderCopy(dictionary);
  return {
    ...dictionary,
    nav,
    header,
    lang,
    mobileMenu: resolveMobileMenu(dictionary, locale),
    form: resolveForm(dictionary),
    preloader: resolvePreloaderLines(dictionary),
    footer: resolveFooter(dictionary),
    quiz: resolveQuiz(dictionary),
    common: mergeSiteDictionary(
      COMMON_SHELL[locale] as Record<string, unknown>,
      (dictionary.common ?? {}) as Record<string, unknown>,
    ) as SiteDictionary["common"],
    ui: mergeSiteDictionary(
      UI_SHELL[locale] as Record<string, unknown>,
      (dictionary.ui ?? {}) as Record<string, unknown>,
    ) as SiteDictionary["ui"],
    contactPage: resolveContactPage(dictionary),
    cookieConsent: resolveCookieConsent(dictionary),
  };
}

export function resolveSiteHeaderCopy(dictionary: SiteDictionary): {
  nav: SiteDictionary["nav"];
  header: SiteDictionary["header"];
  lang: SiteDictionary["lang"];
} {
  const locale: Locale = dictionary.localeLabel === "RU" ? "ru" : "en";
  return {
    nav: mergeSiteDictionary(
      NAV_FALLBACK[locale] as Record<string, unknown>,
      (dictionary.nav ?? {}) as Record<string, unknown>,
    ) as SiteDictionary["nav"],
    header: mergeSiteDictionary(
      HEADER_FALLBACK[locale] as Record<string, unknown>,
      (dictionary.header ?? {}) as Record<string, unknown>,
    ) as SiteDictionary["header"],
    lang: mergeSiteDictionary(
      LANG_FALLBACK as unknown as Record<string, unknown>,
      (dictionary.lang ?? {}) as Record<string, unknown>,
    ) as SiteDictionary["lang"],
  };
}

export function resolvePreloaderLines(
  dictionary: SiteDictionary,
): SiteDictionary["preloader"] {
  const locale: Locale = dictionary.localeLabel === "RU" ? "ru" : "en";
  const base = PRELOADER_FALLBACK[locale];
  const cur = dictionary.preloader;
  if (!cur) return base;
  return mergeSiteDictionary(
    base as Record<string, unknown>,
    cur as Record<string, unknown>,
  ) as SiteDictionary["preloader"];
}

export function resolveModalCloseLabel(dictionary: SiteDictionary): string {
  const locale: Locale = dictionary.localeLabel === "RU" ? "ru" : "en";
  return pickNonEmptyString(dictionary.ui?.close, UI_SHELL[locale].close);
}
