import "server-only";
import type { Locale } from "@/i18n/locales";

const dictionaries = {
  en: () => import("@/i18n/dictionaries/en").then((module) => module.enDictionary),
  ru: () => import("@/i18n/dictionaries/ru").then((module) => module.ruDictionary),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
