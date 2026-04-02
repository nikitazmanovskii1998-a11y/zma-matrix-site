/**
 * Canonical cookie consent storage + gating helpers.
 * All localStorage access must run in the browser only.
 */

export const CONSENT_STORAGE_KEY = "zma_cookie_consent";

const LEGACY_CONSENT_KEY = "zma_cookie_consent_v1";

export type ConsentMode = "all" | "necessary" | "custom";

export type ConsentRecord = {
  version: "1";
  necessary: true;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
  mode: ConsentMode;
  updatedAt: string;
};

function isoNow(): string {
  return new Date().toISOString();
}

export function createConsentAll(): ConsentRecord {
  return {
    version: "1",
    necessary: true,
    analytics: true,
    preferences: true,
    marketing: true,
    mode: "all",
    updatedAt: isoNow(),
  };
}

export function createConsentNecessary(): ConsentRecord {
  return {
    version: "1",
    necessary: true,
    analytics: false,
    preferences: false,
    marketing: false,
    mode: "necessary",
    updatedAt: isoNow(),
  };
}

export function createConsentCustom(flags: {
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
}): ConsentRecord {
  return {
    version: "1",
    necessary: true,
    analytics: flags.analytics,
    preferences: flags.preferences,
    marketing: flags.marketing,
    mode: "custom",
    updatedAt: isoNow(),
  };
}

export function isConsentRecord(value: unknown): value is ConsentRecord {
  if (!value || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    o.version === "1" &&
    o.necessary === true &&
    typeof o.analytics === "boolean" &&
    typeof o.preferences === "boolean" &&
    typeof o.marketing === "boolean" &&
    (o.mode === "all" || o.mode === "necessary" || o.mode === "custom") &&
    typeof o.updatedAt === "string"
  );
}

export function parseConsentJson(raw: string | null): ConsentRecord | null {
  if (raw == null || raw === "") return null;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (isConsentRecord(parsed)) return parsed;
  } catch {
    /* malformed */
  }
  return null;
}

/**
 * Read consent from `zma_cookie_consent`, migrating legacy `zma_cookie_consent_v1` if present.
 */
export function readConsentFromStorage(): ConsentRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = parseConsentJson(window.localStorage.getItem(CONSENT_STORAGE_KEY));
    if (stored) return stored;

    const legacy = window.localStorage.getItem(LEGACY_CONSENT_KEY);
    if (legacy === "accepted") {
      const all = createConsentAll();
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(all));
      window.localStorage.removeItem(LEGACY_CONSENT_KEY);
      return all;
    }
    if (legacy === "declined") {
      const nec = createConsentNecessary();
      window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(nec));
      window.localStorage.removeItem(LEGACY_CONSENT_KEY);
      return nec;
    }
  } catch {
    /* private mode / quota */
  }
  return null;
}

export function writeConsentToStorage(record: ConsentRecord): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    window.dispatchEvent(new CustomEvent("zma:cookie-consent-changed", { detail: record }));
  } catch {
    /* ignore */
  }
}

/** Subscribe to consent updates (e.g. to mount / unmount analytics `<Script />`). */
export function subscribeConsentChanges(listener: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("zma:cookie-consent-changed", listener);
  return () => window.removeEventListener("zma:cookie-consent-changed", listener);
}

/** Gate third-party analytics scripts (e.g. Yandex.Metrica, GA). */
export function canLoadAnalytics(consent: ConsentRecord | null | undefined): boolean {
  return consent?.analytics === true;
}

/** Gate marketing / ads pixels. */
export function canLoadMarketing(consent: ConsentRecord | null | undefined): boolean {
  return consent?.marketing === true;
}

/** Gate non-essential UI preference storage beyond strict necessity. */
export function canLoadPreferences(consent: ConsentRecord | null | undefined): boolean {
  return consent?.preferences === true;
}
