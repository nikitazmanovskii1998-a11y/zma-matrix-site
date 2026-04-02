"use client";

import Link from "next/link";
import { useCookieConsent } from "@/components/cookies/cookie-consent-context";
import { Button } from "@/components/ui/button";

export function CookieConsentBanner() {
  const {
    bannerVisible,
    copy,
    acceptAll,
    acceptNecessary,
    customize,
    privacyHref,
    offerHref,
    privacyLabel,
    offerLabel,
  } = useCookieConsent();

  if (!bannerVisible) {
    return null;
  }

  return (
    <aside
      className="cookie-consent-layer pointer-events-none fixed inset-x-0 bottom-0 z-[44] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 md:inset-x-auto md:bottom-6 md:left-6 md:justify-start md:px-0 md:pb-0 md:pt-0"
      aria-label={copy.title}
      aria-live="polite"
    >
      <div
        className="cookie-consent-panel pointer-events-auto w-full max-w-[min(680px,calc(100dvw-1.5rem-env(safe-area-inset-left)-env(safe-area-inset-right)))] origin-bottom animate-[cookie-consent-in_280ms_ease-out_both] border border-[rgba(114,229,255,0.22)] bg-[linear-gradient(165deg,rgba(16,28,44,0.97),rgba(10,18,30,0.98))] p-5 shadow-[0_12px_48px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(114,229,255,0.06)] backdrop-blur-md md:max-w-[640px] md:p-6"
      >
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex rounded-full border border-neon-line/25 bg-[rgba(114,229,255,0.06)] px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-neon-line">
            {copy.badge}
          </span>
        </div>
        <h2 className="page-section-h3 !font-medium leading-snug tracking-[0.02em]">
          {copy.title}
        </h2>
        <p className="idea-support mt-3 leading-relaxed">
          {copy.text}
        </p>
        <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
          <Button
            type="button"
            variant="primary"
            size="md"
            className="w-full min-h-[48px] sm:w-auto"
            onClick={acceptAll}
          >
            {copy.acceptAll}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            className="w-full min-h-[48px] sm:w-auto"
            onClick={acceptNecessary}
          >
            {copy.acceptNecessary}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="md"
            className="w-full min-h-[48px] sm:w-auto"
            onClick={customize}
          >
            {copy.customize}
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-neon-line/10 pt-4 text-xs">
          <Link
            href={privacyHref}
            className="interactive-line text-text-secondary underline-offset-2 hover:text-text-primary"
          >
            {privacyLabel}
          </Link>
          <Link
            href={offerHref}
            className="interactive-line text-text-secondary underline-offset-2 hover:text-text-primary"
          >
            {offerLabel}
          </Link>
        </div>
      </div>
    </aside>
  );
}
