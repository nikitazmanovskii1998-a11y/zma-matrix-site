"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import { resolveScrollCta } from "@/lib/scroll-cta-resolve";

type ScrollPrimaryCtaDockProps = {
  locale: Locale;
  scroll: SiteDictionary["scrollCta"];
};

const SHOW_AFTER_Y = 96;

/**
 * One persistent, result-oriented CTA while scrolling (desktop / tablet / mobile).
 * Hidden near the top so the hero CTAs stay primary; z-index below cookie / modals.
 */
export function ScrollPrimaryCtaDock({ locale, scroll }: ScrollPrimaryCtaDockProps) {
  const pathname = usePathname() ?? "";
  const [visible, setVisible] = useState(false);
  const { label, href } = resolveScrollCta(locale, pathname, scroll);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SHOW_AFTER_Y);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`scroll-primary-cta-dock fixed inset-x-0 bottom-0 z-[40] flex justify-center px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-2 transition-[opacity,transform] duration-200 ease-out md:px-4 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-1 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <Link
        href={href}
        className="scroll-primary-cta-dock__link box-border inline-flex w-[min(100%,calc(100vw-1.5rem))] max-w-[min(36rem,calc(100vw-1.5rem))] min-w-0 items-center justify-center whitespace-normal break-words rounded-lg border border-neon-line/40 bg-[color-mix(in_srgb,var(--surface-1)_88%,transparent)] px-3 py-3 text-center text-sm font-semibold leading-snug text-text-primary text-pretty shadow-[0_-8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors hover:border-neon-line/55 hover:bg-[color-mix(in_srgb,var(--surface-1)_92%,transparent)] sm:px-6 sm:text-base"
      >
        {label}
      </Link>
    </div>
  );
}
