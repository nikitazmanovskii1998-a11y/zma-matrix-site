"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/locales";
import { locales } from "@/i18n/locales";

type LanguageSwitcherProps = {
  currentLocale: Locale;
};

function replaceLocale(pathname: string, locale: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) {
    return `/${locale}`;
  }

  const [, ...rest] = segments;
  return rest.length > 0 ? `/${locale}/${rest.join("/")}` : `/${locale}`;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const pathname = usePathname();

  return (
    <div className="surface-capsule flex items-center gap-1 p-1">
      {locales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <Link
            key={locale}
            href={replaceLocale(pathname, locale)}
            className={[
              "rounded-full px-3 py-1 text-xs tracking-[0.16em] transition-colors",
              isActive
                ? "bg-hover-green text-neon-line"
                : "interactive-line text-text-secondary",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {locale.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
