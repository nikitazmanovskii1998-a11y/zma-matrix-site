import type { Locale } from "@/i18n/locales";
import type { ScrollCtaSpec, SiteDictionary } from "@/i18n/types";

export type ScrollCtaRouteKey = keyof SiteDictionary["scrollCta"];

/** Map URL path to scroll-CTA copy key (after `/{locale}/`). */
export function scrollCtaRouteKey(pathname: string): ScrollCtaRouteKey {
  const parts = pathname.split("/").filter(Boolean);
  const rest = parts.slice(1);
  if (rest.length === 0) {
    return "home";
  }
  const [a, b] = rest;
  if (a === "services" && b) {
    return "serviceDetail";
  }
  if (a === "services") {
    return "servicesIndex";
  }
  if (a === "projects") {
    return "projects";
  }
  if (a === "about") {
    return "about";
  }
  if (a === "contact") {
    return "contact";
  }
  if (a === "approach") {
    return "approach";
  }
  if (a === "offer") {
    return "offer";
  }
  if (a === "privacy") {
    return "privacy";
  }
  return "home";
}

export function buildScrollCtaHref(locale: Locale, spec: ScrollCtaSpec): string {
  const base = spec.segment ? `/${locale}/${spec.segment}` : `/${locale}`;
  return `${base}${spec.hash ?? ""}`;
}

export function resolveScrollCta(
  locale: Locale,
  pathname: string,
  scroll: SiteDictionary["scrollCta"],
): { label: string; href: string } {
  const key = scrollCtaRouteKey(pathname);
  const spec = scroll[key];
  return {
    label: spec.label,
    href: buildScrollCtaHref(locale, spec),
  };
}
