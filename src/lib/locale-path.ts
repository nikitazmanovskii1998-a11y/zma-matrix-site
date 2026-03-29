import type { Locale } from "@/i18n/locales";

export const routeSlugs = [
  "",
  "approach",
  "projects",
  "services",
  "about",
  "contact",
  "privacy",
  "offer",
] as const;

export type RouteSlug = (typeof routeSlugs)[number];

export function toLocalizedPath(locale: Locale, slug: RouteSlug): string {
  return slug === "" ? `/${locale}` : `/${locale}/${slug}`;
}
