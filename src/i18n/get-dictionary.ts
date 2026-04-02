import "server-only";
import type { Locale } from "@/i18n/locales";
import { tightenSiteDictionary } from "@/i18n/fallbacks";
import type { SiteDictionary } from "@/i18n/types";
import {
  logEmptyStringLeavesInRawLocale,
  mergeSiteDictionary,
} from "@/i18n/merge-site-dictionary";

const dictionaries = {
  en: () => import("@/i18n/dictionaries/en").then((module) => module.enDictionary),
  ru: () => import("@/i18n/dictionaries/ru").then((module) => module.ruDictionary),
};

/**
 * Loads RU + EN, cross-merges so missing RU leaves are filled from EN (and vice versa),
 * then overlays the active locale and runs `tightenSiteDictionary` for interactive subtrees.
 */
export async function getDictionary(locale: Locale): Promise<SiteDictionary> {
  const ru = await dictionaries.ru();
  const en = await dictionaries.en();
  if (locale === "en") {
    logEmptyStringLeavesInRawLocale(en as Record<string, unknown>, locale);
  }
  const crossFilled = mergeSiteDictionary(
    en as Record<string, unknown>,
    ru as Record<string, unknown>,
  ) as SiteDictionary;
  const picked =
    locale === "ru"
      ? crossFilled
      : (mergeSiteDictionary(
          crossFilled as Record<string, unknown>,
          en as Record<string, unknown>,
        ) as SiteDictionary);
  return tightenSiteDictionary(picked);
}
