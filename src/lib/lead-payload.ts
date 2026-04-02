/** Client → POST /api/lead — validated again on the server. */
export type LeadSource = "Contact" | "Quiz";

export type LeadSubmitBody = {
  source: LeadSource;
  locale: "ru" | "en";
  /** Selected service / need; "—" when not applicable */
  serviceLine: string;
  name: string;
  /** Full international number including country code (E.164-style) */
  phone: string;
  email: string;
  /** Telegram username/link or MAX — one line */
  telegramOrMax: string;
  /** Free text; may include serialized quiz answers for Quiz source */
  comment: string;
};
