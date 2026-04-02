import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import { serviceSlugByIndex } from "@/lib/service-slugs";

export type ServiceNavLinkResolved = {
  slug: string;
  href: string;
  title: string;
  summary: string;
};

/** Same href/slug resolution as `SiteHeader` services flyout — single source for panel + hero. */
export function resolveServiceNavLinks(locale: Locale, dictionary: SiteDictionary): ServiceNavLinkResolved[] {
  const raw = dictionary.servicesPage?.serviceLinks;
  if (!Array.isArray(raw) || raw.length === 0) return [];
  return raw.map((item, index) => {
    const slug = serviceSlugByIndex[Math.min(index, serviceSlugByIndex.length - 1)] ?? "websites";
    return {
      slug,
      href: `/${locale}/services/${slug}`,
      title: item.title,
      summary: item.summary,
    };
  });
}
