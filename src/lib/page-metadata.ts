import type { Metadata } from "next";
import { defaultLocale, type Locale, locales } from "@/i18n/locales";
import { getSiteUrl } from "@/lib/site-url";

/** Shared Open Graph + Twitter card fields (text); OG image comes from `opengraph-image` route. */
export function socialPreview(title: string, description: string): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "ZMA Resulting",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

function urlForLang(lang: Locale, pathAfterLang: string): string {
  const base = getSiteUrl();
  const tail = pathAfterLang.replace(/^\/+|\/+$/g, "");
  return tail ? `${base}/${lang}/${tail}` : `${base}/${lang}`;
}

/**
 * @param pathAfterLang — segment after `/{lang}`, e.g. `""` for home, `"services"`, `"contact"`.
 */
export function localizedPageMetadata(
  lang: string,
  pathAfterLang: string,
  title: string,
  description: string,
): Metadata {
  const l = isLocale(lang) ? lang : defaultLocale;
  const canonical = urlForLang(l, pathAfterLang);
  const ru = urlForLang("ru", pathAfterLang);
  const en = urlForLang("en", pathAfterLang);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ru,
        en,
        "x-default": ru,
      },
    },
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "ZMA Resulting",
      url: canonical,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
