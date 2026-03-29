import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import { toLocalizedPath } from "@/lib/locale-path";

type SiteFooterProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  return (
    <footer className="surface-block mt-8 flex flex-wrap items-center justify-between gap-3 px-4 py-3 text-sm text-text-secondary">
      <div className="tracking-[0.06em]">ZMA STRUCTURE</div>
      <div className="flex items-center gap-2">
        <Link
          href={toLocalizedPath(locale, "privacy")}
          className="interactive-line rounded px-2 py-1"
        >
          {dictionary.ui.privacy}
        </Link>
        <Link
          href={toLocalizedPath(locale, "offer")}
          className="interactive-line rounded px-2 py-1"
        >
          {dictionary.ui.offer}
        </Link>
      </div>
    </footer>
  );
}
