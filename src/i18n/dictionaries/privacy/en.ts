import type { SiteDictionary } from "@/i18n/types";

export const privacyPageEn: SiteDictionary["privacyPage"] = {
  hero: {
    eyebrow: "Legal",
    title: "Privacy policy",
    subtitle:
      "How ZMA Resulting handles data on this site: forms, the brief quiz, direct outreach, and basic technical operation of the pages.",
    updatedLabel: "Current version",
    updatedValue: "March 30, 2026",
    intro:
      "This policy describes the processing of personal and technical data in connection with using the ZMA Resulting website, contact forms, the on-site quiz, and brand contact channels. The language stays readable: we document what actually happens when you reach out or browse the site — not a fictional compliance program.",
  },
  sectionOrder: [
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
  ],
  sections: {
    general: {
      title: "1. General",
      body:
        "This policy applies to data you voluntarily submit through the site (including form and quiz fields) and to technical information your browser and device send when pages load. By using the site and submitting data, you confirm you have read this policy. If you disagree, do not submit forms or use features that require personal input.",
    },
    operatorData: {
      title: "2. Data controller",
      body:
        "The controller for personal data collected through the site and related inquiries is an individual entrepreneur operating under the ZMA Resulting brand. Official registration is in the Russian Federation; identifiers below are provided as the legal source of truth.",
      bullets: [
        "Full legal name (Russian): ИНДИВИДУАЛЬНЫЙ ПРЕДПРИНИМАТЕЛЬ ЗМАНОВСКИЙ НИКИТА АНАТОЛЬЕВИЧ",
        "Short form: ИП Змановский Никита Анатольевич",
        "INN (tax ID): 262608434224",
        "OGRNIP (sole proprietor reg. no.): 324265100035273",
        "Email for privacy-related requests: zmanovsckynikita@yandex.ru",
        "Phone: +7 928 308-66-86",
      ],
    },
    whatDataWeCollect: {
      title: "3. Data we may process",
      body:
        "The set depends on how you interact with the site. We do not collect “just in case” beyond what is needed to respond, discuss a project, and keep pages running.",
      bullets: [
        "Information you enter in contact forms, the quiz, or similar fields — e.g. name, phone, email, Telegram handle, free-text notes — only what you choose to provide.",
        "Content of messages you send through channels linked from the site.",
        "Technical data when you visit pages: IP address, request time, browser and device basics as typically logged for delivery and troubleshooting.",
        "Data from cookies or local storage where used for language, consent memory, or similar — as described in the cookies section.",
      ],
    },
    whyWeProcessData: {
      title: "4. Purposes",
      body:
        "Data is used in line with site functions and project communication: replying to you, clarifying scope, preparing a proposal where agreed, and maintaining correspondence you initiated.",
      bullets: [
        "Contact you using the details you provided.",
        "Review your request against possible work formats (custom website / digital environment, Telegram bot or assistant, automation, SEO foundation and structured growth setup).",
        "Improve site usability and fix technical issues using aggregated or de-identified information where applicable.",
        "Meet legal obligations if disclosure or retention is required by applicable law.",
      ],
    },
    legalBasis: {
      title: "5. Legal bases",
      body:
        "For typical form submissions, processing rests on your consent for communication and request handling, and — if a contract or pre-contract dialogue follows — on steps necessary for that relationship. Technical logs and cookies needed for stable operation or to remember your choices (e.g. cookie consent) may rely on consent and/or legitimate interest in security and reliability, limited to what is proportionate.",
    },
    howWeUseData: {
      title: "6. How data is used in practice",
      body:
        "Form and quiz data are not published or sold. Access is limited to people involved in handling inquiries and delivering work. Follow-up may happen by email, phone, or Telegram if you start or continue contact that way.",
    },
    storageAndProtection: {
      title: "7. Retention and safeguards",
      body:
        "We apply sensible measures for a small studio: restricted access to mail and work channels, no casual sharing with unrelated third parties. Retention follows the purpose: inquiry data is kept as long as needed to respond, negotiate, or perform a contract, and may be deleted or anonymized on request unless law requires otherwise. Exact timelines depend on the thread and any agreements in place.",
    },
    thirdParties: {
      title: "8. Third parties",
      body:
        "Sharing occurs only where needed to run the site or communicate: hosting, email, Telegram when you use it, or payment/accounting tools if you move to paid work. Those providers process data under their own terms within their service. We do not hand your contacts to third parties for bulk marketing.",
    },
    cookiesAndTechnicalData: {
      title: "9. Cookies and technical data",
      body:
        "The site may use cookies or local storage for technical preferences, language, or remembering cookie consent — within what the banner and settings describe. You can restrict cookies in your browser; some behavior may change. If analytics is added, it aims at aggregate load and UX signals, not building sold user profiles.",
    },
    userRights: {
      title: "10. Your rights",
      body:
        "You may request access, correction, deletion, or restriction — within what applicable law allows and without breaking legal retention duties. Contact us using the details below.",
      bullets: [
        "Request access to data we hold about you in context of your inquiry.",
        "Ask for correction of inaccurate data.",
        "Withdraw consent where processing was consent-based — noting impact on open discussions or contracts.",
        "Lodge a complaint with a supervisory authority where applicable (e.g. in the EU/EEA or Russia, depending on your jurisdiction).",
      ],
    },
    withdrawalOfConsent: {
      title: "11. Withdrawing consent",
      body:
        "You can withdraw consent for optional processing by writing to zmanovsckynikita@yandex.ru. Withdrawal does not affect lawfulness of processing before receipt. If a contract exists, some data may remain as needed for accounting and performance.",
    },
    contactForPrivacyRequests: {
      title: "12. Privacy contact",
      body:
        "For questions about this policy, your data, or exercising rights, reach the controller at:",
      bullets: [
        "Email: zmanovsckynikita@yandex.ru",
        "Phone: +7 928 308-66-86",
        "Telegram: @zma_resulting (if you initiate contact there)",
      ],
    },
    finalProvisions: {
      title: "13. Changes",
      body:
        "We may update this policy when the site or legal context changes. The current version stays on this page with an updated date. Check back when you submit a new inquiry.",
    },
  },
  microcopy: {
    consentLine:
      "By submitting the form, you acknowledge this privacy policy and agree that the data you provide may be processed to respond to your request.",
    shortVersionForModalOrCheckbox:
      "We use your details only to reply and discuss your request. Full terms are in the privacy policy.",
    openingPageAcceptsTerms: {
      strict:
        "By continuing to use this page, you confirm that you have read the privacy policy and accept the data practices described there.",
      neutral:
        "Using this page means you agree to the data handling rules in our privacy policy.",
      brand:
        "ZMA Resulting treats data like infrastructure: collected for dialogue and delivery, not for noise. See the privacy policy for specifics.",
    },
    siteUseConsent: {
      strict:
        "Use of the website constitutes acceptance of the personal and technical data practices described in the privacy policy.",
      neutral:
        "By using the site, you accept the privacy policy’s rules on data.",
      brand:
        "Browsing and forms here follow a tight scope: what we collect supports the site and your request — see the privacy policy.",
    },
    formSubmitConsent: {
      strict:
        "By clicking submit, you consent to processing of the personal data entered for the purpose of handling your inquiry and contacting you.",
      neutral:
        "Submitting the form means you agree we may process your data to respond.",
      brand:
        "Send — and we’ll pick up the thread using only what you shared, for your project conversation. Details: privacy policy.",
    },
    lastUpdatedPhrase: {
      strict: "Document last updated:",
      neutral: "Last updated:",
      brand: "Version dated:",
    },
    contactDataProcessing: {
      strict: "For data processing inquiries:",
      neutral: "Privacy and data questions:",
      brand: "Reach out on data & privacy:",
    },
    contactServiceTerms: {
      strict: "For service terms and the public offer:",
      neutral: "Questions about services and the offer:",
      brand: "Discuss engagement terms and the public offer:",
    },
  },
  seo: {
    pageMetaTitle: "Privacy policy — ZMA Resulting",
    pageMetaDescription:
      "How ZMA Resulting handles site data: forms, quiz, contacts, cookies, and your rights. Controller: sole proprietor registered in Russia (INN/OGRNIP on page).",
  },
};
