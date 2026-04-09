import type { MetadataRoute } from "next";
import { locales } from "@/i18n/locales";
import { getSiteUrl } from "@/lib/site-url";
import { serviceSlugs } from "@/lib/service-slugs";

const STATIC_PATHS = [
  "",
  "about",
  "approach",
  "contact",
  "offer",
  "privacy",
  "projects",
  "services",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    for (const path of STATIC_PATHS) {
      const url = path ? `${base}/${lang}/${path}` : `${base}/${lang}`;
      const priority = path === "" ? 1 : path === "services" || path === "contact" ? 0.9 : 0.75;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority,
      });
    }
    for (const slug of serviceSlugs) {
      entries.push({
        url: `${base}/${lang}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.85,
      });
    }
  }

  return entries;
}
