/** RU first: default entry + stable iteration order (sitemap, static params, switcher). */
export const locales = ["ru", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

export function hasLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
