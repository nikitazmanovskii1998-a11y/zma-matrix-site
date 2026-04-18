import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { toLocalizedPath } from "@/lib/locale-path";

type FixedBottomActionsProps = {
  locale: Locale;
  contactsLabel: string;
  briefLabel: string;
};

/**
 * Two compact fixed controls, bottom-centered: Contacts (page) + brief / quiz (home #quiz).
 * z-index 42 — below cookie (44) and modals (50).
 */
export function FixedBottomActions({ locale, contactsLabel, briefLabel }: FixedBottomActionsProps) {
  const contactHref = toLocalizedPath(locale, "contact");
  const briefHref = `${toLocalizedPath(locale, "")}#quiz`;

  const btnClass =
    "zma-fixed-actions__btn inline-flex min-h-[2.4rem] min-w-[6.5rem] max-w-[42vw] flex-1 items-center justify-center rounded-xl border border-[rgba(114,229,255,0.32)] bg-[linear-gradient(168deg,rgba(44,68,102,0.96)_0%,rgba(22,36,56,0.98)_52%,rgba(14,26,44,0.99)_100%)] px-3 py-2 text-center text-[0.8125rem] font-semibold leading-tight tracking-wide text-text-primary shadow-[inset_0_1px_0_rgba(218,244,255,0.18),0_6px_22px_rgba(0,0,0,0.45)] transition-[transform,box-shadow,border-color] duration-150 ease-out hover:border-[rgba(138,228,255,0.42)] hover:shadow-[inset_0_1px_0_rgba(230,252,255,0.22),0_8px_26px_rgba(0,0,0,0.5)] active:scale-[0.98] sm:min-w-[7.25rem] sm:px-4 sm:text-sm";

  return (
    <div className="zma-fixed-actions pointer-events-none fixed inset-x-0 bottom-0 z-[42] flex justify-center px-4 pb-[max(0.85rem,env(safe-area-inset-bottom)+0.5rem)] pt-2 md:px-6 md:pb-[max(1rem,env(safe-area-inset-bottom)+0.65rem)]">
      <div className="pointer-events-auto flex w-full max-w-[min(22rem,calc(100vw-2rem))] gap-3 sm:max-w-md sm:gap-3.5">
        <Link href={contactHref} className={btnClass}>
          <span className="zma-fixed-actions__shine" aria-hidden />
          <span className="relative z-[1] truncate">{contactsLabel}</span>
        </Link>
        <Link href={briefHref} className={btnClass}>
          <span className="zma-fixed-actions__shine" aria-hidden />
          <span className="relative z-[1] truncate">{briefLabel}</span>
        </Link>
      </div>
    </div>
  );
}
