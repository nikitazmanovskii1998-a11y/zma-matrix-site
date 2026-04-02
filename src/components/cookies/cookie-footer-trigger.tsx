"use client";

import { useCookieConsent } from "@/components/cookies/cookie-consent-context";

type CookieFooterTriggerProps = {
  className?: string;
};

export function CookieFooterTrigger({ className }: CookieFooterTriggerProps) {
  const { openSettings, copy } = useCookieConsent();
  return (
    <button
      type="button"
      onClick={openSettings}
      className={[
        "interactive-line footer-link block w-fit max-w-full rounded-md px-2.5 text-left text-text-secondary sm:inline-block",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {copy.footerTrigger}
    </button>
  );
}
