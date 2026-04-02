"use client";

import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import type { ConsentRecord } from "@/lib/cookies/consent";

export type CookieDraft = {
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
};

export type CookieConsentContextValue = {
  consent: ConsentRecord | null;
  ready: boolean;
  bannerVisible: boolean;
  settingsOpen: boolean;
  draft: CookieDraft;
  setDraft: Dispatch<SetStateAction<CookieDraft>>;
  openSettings: () => void;
  closeSettings: () => void;
  acceptAll: () => void;
  acceptNecessary: () => void;
  saveCustom: () => void;
  customize: () => void;
  copy: SiteDictionary["cookieConsent"];
  locale: Locale;
  privacyHref: string;
  offerHref: string;
  privacyLabel: string;
  offerLabel: string;
};

export const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent(): CookieConsentContextValue {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}
