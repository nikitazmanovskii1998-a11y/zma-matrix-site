import { getYandexMetrikaCounterIdNumber } from "@/lib/yandex-metrika-id";

/**
 * Yandex.Metrica goals — names must match goals configured in the Metrica UI.
 * Counter ID matches `getYandexMetrikaCounterIdNumber()` (default 108471420).
 */

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

/** Contact form submitted successfully (server accepted). */
export function trackLeadContact(): void {
  if (typeof window === "undefined") return;
  const id = getYandexMetrikaCounterIdNumber();
  if (typeof window.ym === "function") {
    window.ym(id, "reachGoal", "lead_contact");
  }
}

/** Brief / quiz submitted successfully. */
export function trackLeadQuiz(): void {
  if (typeof window === "undefined") return;
  const id = getYandexMetrikaCounterIdNumber();
  if (typeof window.ym === "function") {
    window.ym(id, "reachGoal", "lead_quiz");
  }
}
