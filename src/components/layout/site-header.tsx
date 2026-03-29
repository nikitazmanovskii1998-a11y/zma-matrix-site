import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import { toLocalizedPath, type RouteSlug } from "@/lib/locale-path";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

type NavItem = {
  slug: RouteSlug;
  label: string;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const navItems: NavItem[] = [
    { slug: "", label: dictionary.nav.home },
    { slug: "approach", label: dictionary.nav.approach },
    { slug: "projects", label: dictionary.nav.projects },
    { slug: "services", label: dictionary.nav.services },
    { slug: "about", label: dictionary.nav.about },
    { slug: "contact", label: dictionary.nav.contact },
  ];

  return (
    <header className="sticky top-4 z-30">
      <div className="surface-capsule flex flex-wrap items-center justify-between gap-3 px-3 py-2 md:px-4">
        <nav className="flex flex-wrap items-center gap-1.5">
          {navItems.map((item) => (
            <Link
              key={item.slug || "home"}
              href={toLocalizedPath(locale, item.slug)}
              className="interactive-line rounded-full px-3 py-1.5 text-sm text-text-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher currentLocale={locale} />
      </div>
    </header>
  );
}
