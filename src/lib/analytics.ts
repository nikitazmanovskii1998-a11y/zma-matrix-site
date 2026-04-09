/**
 * Yandex Metrica goals + GA4 events (loaded only after analytics cookie consent).
 * Goal names must match those configured in the Yandex Metrica UI.
 */

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

function ymId(): number | null {
  const raw = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim();
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : null;
}

/** Contact form submitted successfully (server accepted). */
export function trackLeadContact(): void {
  if (typeof window === "undefined") return;
  const id = ymId();
  if (id != null && typeof window.ym === "function") {
    window.ym(id, "reachGoal", "lead_contact");
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", { form_id: "contact" });
  }
}

/** Brief / quiz submitted successfully. */
export function trackLeadQuiz(): void {
  if (typeof window === "undefined") return;
  const id = ymId();
  if (id != null && typeof window.ym === "function") {
    window.ym(id, "reachGoal", "lead_quiz");
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", "generate_lead", { form_id: "quiz" });
  }
}
