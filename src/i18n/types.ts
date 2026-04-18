/**
 * Canonical site copy shape. RU/EN locale files must `satisfies SiteDictionary`.
 * Run `npm run check-i18n` to verify structural parity between locales.
 */
export type LabeledText = {
  title: string;
  text: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  allowMultiple?: boolean;
  options?: string[];
  fields?: Array<{
    id: string;
    label: string;
    placeholder: string;
    type?: "text" | "email" | "tel" | "textarea";
  }>;
};

/** Legal / policy page section block */
export type PolicySection = {
  title: string;
  body: string;
  bullets?: string[];
};

/** Full service popup copy (canonical). */
export type ServicePopupCopy = {
  title: string;
  eyebrow: string;
  hook: string;
  shortIntro: string;
  whatWeDoTitle: string;
  whatWeDoItems: [string, string, string];
  howWeWorkTitle: string;
  howWeWorkItems: [string, string, string];
  resultTitle: string;
  resultItems: [string, string, string];
  fitTitle: string;
  fitText: string;
  notFitTitle: string;
  notFitText: string;
  ctaPrimary: string;
  ctaSecondary: string;
  microNote: string;
};

/** Project preview archetype (no fake metrics). */
export type SiteDictionary = {
  localeLabel: string;
  nav: {
    home: string;
    approach: string;
    projects: string;
    services: string;
    about: string;
    contacts: string;
    servicesPanelLabel: string;
    allServices: string;
  };
  header: {
    brandLabel: string;
    brandDescriptor: string;
  };
  lang: {
    ru: string;
    en: string;
  };
  mobileMenu: {
    label: string;
    open: string;
    close: string;
    navigationTitle: string;
    contactsTitle: string;
  };
  ui: {
    privacy: string;
    offer: string;
    placeholderNote: string;
    loading: string;
    more: string;
    open: string;
    close: string;
    expand: string;
    collapse: string;
    copy: string;
    copied: string;
    soon: string;
    available: string;
    unavailable: string;
    backHome: string;
    backServices: string;
    backProjects: string;
    /** Bottom fixed dock: contact page */
    fixedDockContacts: string;
    /** Bottom fixed dock: homepage brief / quiz (compact CTA label, e.g. Request / Заявка) */
    fixedDockBrief: string;
  };
  preloader: {
    entering: string;
    stabilizing: string;
  };
  cookies: {
    message: string;
    accept: string;
    decline: string;
  };
  cookieConsent: {
    badge: string;
    title: string;
    text: string;
    acceptAll: string;
    acceptNecessary: string;
    customize: string;
    save: string;
    close: string;
    footerTrigger: string;
    categories: {
      necessary: { title: string; text: string };
      analytics: { title: string; text: string };
      preferences: { title: string; text: string };
      marketing: { title: string; text: string };
    };
  };
  common: {
    calculateProject: string;
    writeTelegram: string;
  };
  homeHero: {
    /** Main headline — display font only; max two lines (`\n` optional). */
    heading: string;
    /** Long paragraph (e.g. SEO / reuse); not shown in the hero. */
    support: string;
    /**
     * Support under H1: 4–5 short lines (`\n`), Commissioner — clearly secondary to the headline.
     */
    supportBlock: string;
    primaryCta: string;
    secondaryCta: string;
    helper: string;
    /** Below-the-fold strip on the home page only (`HeroSupportStrip`). */
    supportBlocks: LabeledText[];
    /** Short supporting line at the bottom of the home hero (no attribution). */
    footerQuote: string;
  };
  home: {
    servicesPreview: {
      title: string;
      intro: string;
      cards: Array<{
        title: string;
        outcome: string;
      }>;
    };
    difference: {
      title: string;
      statements: string[];
    };
    tasks: {
      title: string;
      cards: LabeledText[];
    };
    process: {
      title: string;
      steps: LabeledText[];
    };
    projectsPreview: {
      title: string;
      cards: Array<{
        type: string;
        challenge: string;
        built: string;
        result: string;
      }>;
      cta: string;
    };
    calculator: {
      title: string;
      intro: string;
    };
    faq: {
      title: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };
    finalCta: {
      title: string;
      text: string;
      primary: string;
      secondary: string;
      helper: string;
    };
  };
  homeSeo: {
    pageMetaTitle: string;
    pageMetaDescription: string;
  };
  approachPage: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
      lead: string;
      optionalNote: string;
      primaryCta: string;
      secondaryCta: string;
      firstStepHint: string;
    };
    methodIntroSection: {
      sectionTitle: string;
      paragraph1: string;
      paragraph2: string;
    };
    principlesSection: {
      sectionTitle: string;
      sectionIntro: string;
      principles: Array<{ title: string; text: string }>;
    };
    workflowSection: {
      sectionTitle: string;
      sectionIntro: string;
      steps: Array<{ title: string; text: string }>;
    };
    whatWeAnalyzeSection: {
      sectionTitle: string;
      sectionIntro: string;
      items: Array<{ title: string; text: string }>;
    };
    whyItWorksSection: {
      sectionTitle: string;
      sectionIntro: string;
      points: Array<{ title: string; text: string }>;
    };
    afterLaunchSection: {
      sectionTitle: string;
      sectionIntro: string;
      directions: Array<{ title: string; text: string }>;
    };
    fitSection: {
      sectionTitle: string;
      fitsTitle: string;
      notFitsTitle: string;
      fits: Array<{ title: string; text: string }>;
      notFits: Array<{ title: string; text: string }>;
    };
    closingCtaSection: {
      sectionTitle: string;
      sectionText: string;
      primaryCta: string;
      secondaryCta: string;
      helperText: string;
    };
    microcopy: {
      smallBadge: string;
      sectionDividerLabel: string;
      ctaHelper: string;
      closingLine: string;
    };
    seo: {
      pageMetaTitle: string;
      pageMetaDescription: string;
    };
  };
  servicesPopups: {
    websites: ServicePopupCopy;
    telegramBots: ServicePopupCopy;
    telegramAssistants: ServicePopupCopy;
    automation: ServicePopupCopy;
    promotionSeo: ServicePopupCopy;
  };
  servicesPage: {
    seo: {
      pageMetaTitle: string;
      pageMetaDescription: string;
    };
    hero: string;
    /** First-screen lead: задача / для кого / отличие (под заголовком). */
    heroLead: string;
    intro: string;
    hubTitle: string;
    hubIntro: string;
    items: Array<{
      title: string;
      solves: string;
      included: string;
      forWhom: string;
      changes: string;
    }>;
    serviceLinks: Array<{
      slug: "websites" | "telegram-bots" | "telegram-assistants" | "automation" | "seo";
      title: string;
      summary: string;
    }>;
    detailLabels: {
      whatWeDo: string;
      howWeDoIt: string;
      whatClientGets: string;
      whenNeeded: string;
      calculateCta: string;
      discussCta: string;
      backToServices: string;
      contactPrompt: string;
    };
    detailPages: Array<{
      slug: "websites" | "telegram-bots" | "telegram-assistants" | "automation" | "seo";
      metaTitle: string;
      metaDescription: string;
      eyebrow: string;
      title: string;
      lead: string;
      intro: string;
      whenTitle: string;
      scopeTitle: string;
      resultTitle: string;
      processTitle: string;
      ctaTitle: string;
      ctaText: string;
      ctaHelper: string;
      primaryCta: string;
      secondaryCta: string;
      subtitle: string;
      whatWeDo: string;
      howWeDoIt: string;
      whatClientGets: string;
      whenNeeded: string[];
      scopeItems: string[];
      resultItems: string[];
      processItems: string[];
    }>;
    pricingNote: string;
    cta: string;
    serviceCard: {
      more: string;
      popupPrimary: string;
      popupSecondary: string;
      popupClose: string;
    };
  };
  projectsPage: {
    seo: {
      pageMetaTitle: string;
      pageMetaDescription: string;
    };
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
      body: string;
      primaryCta: string;
      secondaryCta: string;
      microLine: string;
    };
    filters: {
      all: { label: string; shortHint: string };
      websites: { label: string; shortHint: string };
      brandEnvironments: { label: string; shortHint: string };
      telegram: { label: string; shortHint: string };
      automation: { label: string; shortHint: string };
      seoGrowth: { label: string; shortHint: string };
      inDevelopment: { label: string; shortHint: string };
    };
    filterOrder: [
      "all",
      "websites",
      "brandEnvironments",
      "telegram",
      "automation",
      "seoGrowth",
      "inDevelopment",
    ];
    cards: Array<{
      card: {
        slug: string;
        filterKey:
          | "websites"
          | "brandEnvironments"
          | "telegram"
          | "automation"
          | "seoGrowth"
          | "inDevelopment";
        category: string;
        title: string;
        subtitle: string;
        shortDescription: string;
        hoverLine: string;
        badge1: string;
        badge2: string;
        badge3: string;
        status: string;
        openLabel: string;
      };
      modal: {
        eyebrow: string;
        title: string;
        intro: string;
        problemTitle: string;
        problemText: string;
        solutionTitle: string;
        solutionItems: [string, string, string];
        architectureTitle: string;
        architectureItems: [string, string, string];
        effectTitle: string;
        effectText: string;
        fitTitle: string;
        fitText: string;
        deliverablesTitle: string;
        deliverablesItems: [string, string, string, string];
        note: string;
        ctaPrimary: string;
        ctaSecondary: string;
      };
    }>;
    disclosureBlock: {
      title: string;
      body: string;
      bullet1: string;
      bullet2: string;
      bullet3: string;
      cta: string;
    };
    finalCta: {
      title: string;
      subtitle: string;
      body: string;
      primaryCta: string;
      secondaryCta: string;
      microNote: string;
    };
  };
  aboutPage: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
      lead: string;
      optionalNote: string;
      primaryCta: string;
      secondaryCta: string;
      firstStepHint: string;
    };
    essenceSection: {
      sectionTitle: string;
      sectionIntro: string;
      cards: Array<{ title: string; text: string }>;
    };
    differenceSection: {
      sectionTitle: string;
      sectionIntro: string;
      items: Array<{ title: string; text: string }>;
    };
    philosophySection: {
      sectionTitle: string;
      sectionIntro: string;
      principles: Array<{ title: string; text: string }>;
    };
    audienceSection: {
      sectionTitle: string;
      sectionIntro: string;
      audiences: Array<{ title: string; text: string }>;
    };
    capabilitiesSection: {
      sectionTitle: string;
      sectionIntro: string;
      websites: { title: string; shortText: string };
      telegramBots: { title: string; shortText: string };
      telegramAssistants: { title: string; shortText: string };
      automation: { title: string; shortText: string };
      seoAndGrowthContour: { title: string; shortText: string };
    };
    beliefSection: {
      sectionTitle: string;
      paragraph1: string;
      paragraph2: string;
    };
    closingCtaSection: {
      sectionTitle: string;
      sectionText: string;
      primaryCta: string;
      secondaryCta: string;
      helperText: string;
    };
    microcopy: {
      smallBadge: string;
      sectionDividerLabel: string;
      ctaHelper: string;
      closingLine: string;
    };
    seo: {
      pageMetaTitle: string;
      pageMetaDescription: string;
    };
  };
  contactPage: {
    seo: {
      pageMetaTitle: string;
      pageMetaDescription: string;
    };
    hero: string;
    /** Под заголовком: что получит пользователь и зачем писать. */
    heroLead: string;
    intro: string;
    contactsTitle: string;
    formTitle: string;
    formSubmit: string;
    contacts: Array<{
      label: string;
      value: string;
      href?: string;
    }>;
    sendNowTitle: string;
    sendNow: string[];
    quizCta: string;
    requisitesTitle: string;
    requisites: {
      name: string;
      inn: string;
      ogrnip: string;
    };
    helper: string;
    directWrite: string;
  };
  form: {
    name: { label: string; placeholder: string };
    phone: { label: string; placeholder: string };
    email: { label: string; placeholder: string };
    telegram: { label: string; placeholder: string };
    comment: { label: string; placeholder: string };
    /** Labels for +7 / +1 rows in the phone dial selector (locale-specific). */
    phoneCountries: {
      ru: { label: string };
      us: { label: string };
    };
    /** Accessible name for the country-code control. */
    phoneDialAria: string;
    /** Success modal — same UX as quiz brief (compact popup). */
    successTitle: string;
    successText: string;
    successPrimary: string;
    successSecondary: string;
    consentPrefix: string;
    consentPrivacyLink: string;
    consentSuffix: string;
    consentRequired: string;
    submitIdle: string;
    submitLoading: string;
    submitSuccess: string;
    submitError: string;
    /** Telegram bot or server misconfiguration. */
    serviceUnavailable: string;
    validation: {
      required: string;
      phone: string;
      email: string;
    };
  };
  quiz: {
    title: string;
    subtitle: string;
    next: string;
    back: string;
    submit: string;
    restart: string;
    progress: string;
    optional: string;
    helper: string;
    doneTitle: string;
    doneText: string;
    donePrimary: string;
    doneSecondary: string;
    /** Text before the privacy policy link. */
    consentPrefix: string;
    /** Linked phrase (privacy policy). */
    consentPrivacyLink: string;
    /** Text after the link (e.g. period). */
    consentSuffix: string;
    /** Shown when user tries to submit without consent. */
    consentRequired: string;
    questions: QuizQuestion[];
  };
  privacyPage: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
      updatedLabel: string;
      updatedValue: string;
      intro: string;
      contactCtaLabel: string;
    };
    sectionOrder: readonly [
      "general",
      "operatorData",
      "whatDataWeCollect",
      "whyWeProcessData",
      "legalBasis",
      "howWeUseData",
      "storageAndProtection",
      "thirdParties",
      "cookiesAndTechnicalData",
      "userRights",
      "withdrawalOfConsent",
      "contactForPrivacyRequests",
      "finalProvisions",
    ];
    sections: {
      general: PolicySection;
      operatorData: PolicySection;
      whatDataWeCollect: PolicySection;
      whyWeProcessData: PolicySection;
      legalBasis: PolicySection;
      howWeUseData: PolicySection;
      storageAndProtection: PolicySection;
      thirdParties: PolicySection;
      cookiesAndTechnicalData: PolicySection;
      userRights: PolicySection;
      withdrawalOfConsent: PolicySection;
      contactForPrivacyRequests: PolicySection;
      finalProvisions: PolicySection;
    };
    microcopy: {
      consentLine: string;
      shortVersionForModalOrCheckbox: string;
      openingPageAcceptsTerms: { strict: string; neutral: string; brand: string };
      siteUseConsent: { strict: string; neutral: string; brand: string };
      formSubmitConsent: { strict: string; neutral: string; brand: string };
      lastUpdatedPhrase: { strict: string; neutral: string; brand: string };
      contactDataProcessing: { strict: string; neutral: string; brand: string };
      contactServiceTerms: { strict: string; neutral: string; brand: string };
    };
    seo: {
      pageMetaTitle: string;
      pageMetaDescription: string;
    };
  };
  offerPage: {
    hero: {
      eyebrow: string;
      title: string;
      subtitle: string;
      updatedLabel: string;
      updatedValue: string;
      intro: string;
      contactCtaLabel: string;
    };
    sectionOrder: readonly [
      "generalTerms",
      "subjectOfOffer",
      "servicesScope",
      "howRequestWorks",
      "pricingAndPayment",
      "termsAndDeliveryLogic",
      "clientResponsibilities",
      "contractorResponsibilities",
      "intellectualProperty",
      "limitationOfLiability",
      "modificationOfTerms",
      "disputeResolution",
      "contactDetails",
      "finalProvisions",
    ];
    sections: {
      generalTerms: PolicySection;
      subjectOfOffer: PolicySection;
      servicesScope: PolicySection;
      howRequestWorks: PolicySection;
      pricingAndPayment: PolicySection;
      termsAndDeliveryLogic: PolicySection;
      clientResponsibilities: PolicySection;
      contractorResponsibilities: PolicySection;
      intellectualProperty: PolicySection;
      limitationOfLiability: PolicySection;
      modificationOfTerms: PolicySection;
      disputeResolution: PolicySection;
      contactDetails: PolicySection;
      finalProvisions: PolicySection;
    };
    microcopy: {
      shortOfferNote: string;
      disclaimerLine: string;
      openingPageAcceptsTerms: { strict: string; neutral: string; brand: string };
      siteUseConsent: { strict: string; neutral: string; brand: string };
      formSubmitConsent: { strict: string; neutral: string; brand: string };
      lastUpdatedPhrase: { strict: string; neutral: string; brand: string };
      contactDataProcessing: { strict: string; neutral: string; brand: string };
      contactServiceTerms: { strict: string; neutral: string; brand: string };
    };
    seo: {
      pageMetaTitle: string;
      pageMetaDescription: string;
    };
  };
  footer: {
    desktop: {
      brandTitle: string;
      brandDescription: string;
      microNote: string;
    };
    mobile: {
      brandTitle: string;
      compactBrandDescription: string;
      compactMicroNote: string;
    };
    common: {
      navigationTitle: string;
      navigationItems: [string, string, string, string, string];
      contactTitle: string;
      contactTelegramLabel: string;
      contactTelegramValue: string;
      contactPhoneLabel: string;
      contactPhoneValue: string;
      contactEmailLabel: string;
      contactEmailValue: string;
      legalTitle: string;
      privacyLinkLabel: string;
      offerLinkLabel: string;
      requisitesTitle: string;
      legalInnLabel: string;
      legalInnValue: string;
      legalOgrnipLabel: string;
      legalOgrnipValue: string;
      legalOwnerLabel: string;
      legalOwnerValue: string;
      /** RU: empty; EN: gloss for international readers */
      legalOwnerNoteEn: string;
      copyright: string;
      ctaTelegram: string;
      ctaBrief: string;
    };
  };
  pages: {
    home: { title: string; body: string };
    approach: { title: string; body: string };
    projects: { title: string; body: string };
    services: { title: string; body: string };
    about: { title: string; body: string };
    contact: { title: string; body: string };
    privacy: { title: string; body: string };
    offer: { title: string; body: string };
  };
};

/** Alias for tooling / mental model (“dictionary” = site copy tree). */
export type Dictionary = SiteDictionary;
