"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/i18n/locales";
import { toLocalizedPath } from "@/lib/locale-path";

const CONSENT_KEY = "zma_cookie_consent_v1";

type CookieBannerProps = {
  locale: Locale;
  labels: {
    message: string;
    accept: string;
    decline: string;
    privacy: string;
    offer: string;
  };
};

export function CookieBanner({ locale, labels }: CookieBannerProps) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return !window.localStorage.getItem(CONSENT_KEY);
  });

  const saveConsent = (value: "accepted" | "declined") => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <aside className="surface-block fixed inset-x-3 bottom-3 z-40 mx-auto w-auto max-w-3xl p-3 md:inset-x-6 md:p-4">
      <p className="text-sm text-text-secondary">{labels.message}</p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <button
          type="button"
          className="interactive-line rounded border border-neon-line/35 px-3 py-1.5 text-neon-line"
          onClick={() => saveConsent("accepted")}
        >
          {labels.accept}
        </button>
        <button
          type="button"
          className="interactive-line rounded border border-neon-line/20 px-3 py-1.5 text-text-secondary"
          onClick={() => saveConsent("declined")}
        >
          {labels.decline}
        </button>
        <Link
          href={toLocalizedPath(locale, "privacy")}
          className="interactive-line rounded px-2 py-1 text-text-secondary"
        >
          {labels.privacy}
        </Link>
        <Link
          href={toLocalizedPath(locale, "offer")}
          className="interactive-line rounded px-2 py-1 text-text-secondary"
        >
          {labels.offer}
        </Link>
      </div>
    </aside>
  );
}
