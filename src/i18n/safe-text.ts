/**
 * Client-safe string helpers (defense in depth on top of merged dictionaries).
 */

/** Never throws; returns a dialable `tel:` href. */
export function telHrefFromDisplay(phone: string | undefined | null): string {
  if (typeof phone !== "string" || !phone.trim()) {
    return "";
  }
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.startsWith("8") && digits.length === 11) {
    return `tel:+7${digits.slice(1)}`;
  }
  if (digits.startsWith("7") && digits.length === 11) {
    return `tel:+${digits}`;
  }
  if (phone.trim().startsWith("+")) {
    return `tel:${phone.trim().replace(/\s/g, "")}`;
  }
  return `tel:+${digits}`;
}

export function nonEmptyStr(value: string | undefined | null, fallback: string): string {
  if (typeof value !== "string") return fallback;
  const t = value.trim();
  return t.length > 0 ? value : fallback;
}
