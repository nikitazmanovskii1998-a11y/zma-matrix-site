/**
 * Production Yandex.Metrica counter for zmaresulting.ru.
 * Override with NEXT_PUBLIC_YANDEX_METRIKA_ID if you ever split environments.
 */
export const YANDEX_METRIKA_DEFAULT_COUNTER_ID = "108471420";

export function getYandexMetrikaCounterIdString(): string {
  const fromEnv = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim();
  return fromEnv || YANDEX_METRIKA_DEFAULT_COUNTER_ID;
}

export function getYandexMetrikaCounterIdNumber(): number {
  const raw = getYandexMetrikaCounterIdString();
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : Number.parseInt(YANDEX_METRIKA_DEFAULT_COUNTER_ID, 10);
}
