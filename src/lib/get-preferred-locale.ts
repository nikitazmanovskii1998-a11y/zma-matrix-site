import { defaultLocale, type Locale } from "@/i18n/locales";

export function getPreferredLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) {
    return defaultLocale;
  }

  const normalized = acceptLanguage.toLowerCase();

  if (normalized.includes("ru")) {
    return "ru";
  }

  if (normalized.includes("en")) {
    return "en";
  }

  return defaultLocale;
}
