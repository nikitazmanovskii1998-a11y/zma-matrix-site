"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/locales";
import { locales } from "@/i18n/locales";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  compact?: boolean;
  labelRu?: string;
  labelEn?: string;
  /** Request path for locale-prefixed links; avoids SSR/client drift when passed from server. */
  pathname?: string;
};

function replaceLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${locale}`;
  }

  const [, ...rest] = segments;
  return rest.length > 0 ? `/${locale}/${rest.join("/")}` : `/${locale}`;
}

export function LanguageSwitcher({
  currentLocale,
  compact = false,
  labelRu = "RU",
  labelEn = "EN",
  pathname: pathnameProp,
}: LanguageSwitcherProps) {
  const pathnameFromHook = usePathname();
  const pathname = pathnameProp ?? pathnameFromHook ?? "";
  const labelFor = (locale: Locale) => (locale === "ru" ? labelRu : labelEn);

  return (
    <div className={compact ? "surface-capsule flex items-center gap-0.5 p-0.5" : "surface-capsule flex items-center gap-1 p-1"}>
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={replaceLocale(pathname, locale)}
            className={[
              compact
                ? "rounded-full px-2 py-1 text-[10px] tracking-[0.12em] transition-colors"
                : "rounded-full px-3 py-1 text-xs tracking-[0.16em] transition-colors",
              isActive
                ? "bg-hover-green text-neon-line"
                : "interactive-line text-text-secondary",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {labelFor(locale)}
          </Link>
        );
      })}
    </div>
  );
}
