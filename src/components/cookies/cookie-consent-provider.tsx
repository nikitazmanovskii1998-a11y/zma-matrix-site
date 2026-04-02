"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import {
  CookieConsentContext,
  type CookieDraft,
} from "@/components/cookies/cookie-consent-context";
import { CookieConsentBanner } from "@/components/cookies/cookie-consent";
import { CookieSettingsModal } from "@/components/cookies/cookie-settings-modal";
import {
  createConsentAll,
  createConsentCustom,
  createConsentNecessary,
  readConsentFromStorage,
  writeConsentToStorage,
  type ConsentRecord,
} from "@/lib/cookies/consent";

type CookieConsentProviderProps = {
  children: ReactNode;
  locale: Locale;
  copy: SiteDictionary["cookieConsent"];
  privacyHref: string;
  offerHref: string;
  privacyLabel: string;
  offerLabel: string;
};

export function CookieConsentProvider({
  children,
  locale,
  copy,
  privacyHref,
  offerHref,
  privacyLabel,
  offerLabel,
}: CookieConsentProviderProps) {
  const [ready, setReady] = useState(false);
  const [consent, setConsent] = useState<ConsentRecord | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draft, setDraft] = useState<CookieDraft>({
    analytics: false,
    preferences: false,
    marketing: false,
  });

  useEffect(() => {
    // Browser-only restore: server has no localStorage; must not read during SSR (hydration match).
    queueMicrotask(() => {
      setConsent(readConsentFromStorage());
      setReady(true);
    });
  }, []);

  useEffect(() => {
    const onExternal = () => {
      setConsent(readConsentFromStorage());
    };
    window.addEventListener("zma:cookie-consent-changed", onExternal);
    return () => window.removeEventListener("zma:cookie-consent-changed", onExternal);
  }, []);

  const syncDraftFromConsent = useCallback((c: ConsentRecord | null) => {
    setDraft({
      analytics: c?.analytics ?? false,
      preferences: c?.preferences ?? false,
      marketing: c?.marketing ?? false,
    });
  }, []);

  const openSettings = useCallback(() => {
    syncDraftFromConsent(consent);
    setSettingsOpen(true);
  }, [consent, syncDraftFromConsent]);

  const closeSettings = useCallback(() => {
    setSettingsOpen(false);
  }, []);

  const persist = useCallback((next: ConsentRecord) => {
    writeConsentToStorage(next);
    setConsent(next);
    setSettingsOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist(createConsentAll());
  }, [persist]);

  const acceptNecessary = useCallback(() => {
    persist(createConsentNecessary());
  }, [persist]);

  const saveCustom = useCallback(() => {
    persist(createConsentCustom(draft));
  }, [draft, persist]);

  const customize = useCallback(() => {
    syncDraftFromConsent(consent);
    setSettingsOpen(true);
  }, [consent, syncDraftFromConsent]);

  const bannerVisible = ready && consent === null && !settingsOpen;

  const value = useMemo(
    () => ({
      consent,
      ready,
      bannerVisible,
      settingsOpen,
      draft,
      setDraft,
      openSettings,
      closeSettings,
      acceptAll,
      acceptNecessary,
      saveCustom,
      customize,
      copy,
      locale,
      privacyHref,
      offerHref,
      privacyLabel,
      offerLabel,
    }),
    [
      consent,
      ready,
      bannerVisible,
      settingsOpen,
      draft,
      openSettings,
      closeSettings,
      acceptAll,
      acceptNecessary,
      saveCustom,
      customize,
      copy,
      locale,
      privacyHref,
      offerHref,
      privacyLabel,
      offerLabel,
    ],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      <CookieConsentBanner />
      <CookieSettingsModal />
    </CookieConsentContext.Provider>
  );
}
