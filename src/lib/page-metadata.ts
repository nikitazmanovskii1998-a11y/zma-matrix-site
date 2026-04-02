import type { Metadata } from "next";
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

/**
 * @param pathAfterLang — segment after `/{lang}`, e.g. `""` for home, `"services"`, `"contact"`.
 */
export function localizedPageMetadata(
  lang: string,
  pathAfterLang: string,
  title: string,
  description: string,
): Metadata {
  const base = getSiteUrl();
  const tail = pathAfterLang.replace(/^\/+|\/+$/g, "");
  const canonical = tail ? `${base}/${lang}/${tail}` : `${base}/${lang}`;

  return {
    title,
    description,
    alternates: { canonical },
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
