import {
  PHONE_COUNTRY_ROWS,
  type PhoneCountryRow,
} from "@/lib/phone-countries-data";

export type { PhoneCountryRow };

export function flagEmoji(iso2: string): string {
  const u = iso2.toUpperCase();
  if (u.length !== 2) return "🏳️";
  return String.fromCodePoint(
    ...[...u].map((c) => 127397 + c.charCodeAt(0)),
  );
}

/** Default row when the field is empty (stable UX for RU-focused audience). */
export function getDefaultCountryRow(): PhoneCountryRow {
  return (
    PHONE_COUNTRY_ROWS.find((r) => r.iso2 === "RU") ?? PHONE_COUNTRY_ROWS[0]
  );
}

export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function buildFullPhone(
  row: PhoneCountryRow,
  nationalDigits: string,
): string {
  return `+${row.dial}${nationalDigits}`;
}

/**
 * Match +E.164 digits to a country row. When several countries share the same
 * calling code (e.g. +1), use `preferredRowId` if it is still a valid tie-breaker.
 */
export function matchCountryFromE164(
  full: string,
  preferredRowId?: string | null,
): { row: PhoneCountryRow; nationalDigits: string } | null {
  const t = full.trim().replace(/\s/g, "");
  if (!t.startsWith("+")) return null;
  const all = digitsOnly(t.slice(1));
  if (all.length === 0) return null;

  const candidates = PHONE_COUNTRY_ROWS.filter((row) => all.startsWith(row.dial));
  if (candidates.length === 0) return null;

  const maxLen = Math.max(...candidates.map((c) => c.dial.length));
  const best = candidates.filter((c) => c.dial.length === maxLen);
  let row: PhoneCountryRow;
  if (best.length === 1) {
    row = best[0];
  } else {
    const pref = best.find((b) => b.id === preferredRowId);
    row = pref ?? [...best].sort((a, b) => a.name.localeCompare(b.name, "en"))[0];
  }
  return { row, nationalDigits: all.slice(row.dial.length) };
}

/** Reasonable subscriber length for lead forms (not full libphonenumber). */
export function isValidInternationalPhone(full: string): boolean {
  const m = matchCountryFromE164(full);
  if (!m) return false;
  const n = m.nationalDigits.length;
  return n >= 4 && n <= 14;
}

export function listCountryRows(): readonly PhoneCountryRow[] {
  return PHONE_COUNTRY_ROWS;
}
