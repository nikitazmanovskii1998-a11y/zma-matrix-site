/**
 * Deep-merge locale dictionaries: `base` (typically RU) fills gaps in `preferred`
 * when values are missing, null, empty strings, short arrays, or sparse objects.
 * Keeps runtime resilient if a locale file drifts before check-i18n catches it.
 */

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function mergeDeep(base: unknown, preferred: unknown): unknown {
  if (preferred === undefined || preferred === null) {
    return base;
  }

  if (typeof preferred === "string") {
    if (preferred.trim() === "" && typeof base === "string" && base.trim() !== "") {
      return base;
    }
    return preferred;
  }

  if (typeof preferred === "number" || typeof preferred === "boolean") {
    return preferred;
  }

  if (Array.isArray(preferred)) {
    if (!Array.isArray(base)) {
      return preferred;
    }
    const len = Math.max(base.length, preferred.length);
    const out: unknown[] = [];
    for (let i = 0; i < len; i++) {
      const b = base[i];
      const p = preferred[i];
      if (p === undefined) {
        out[i] = b;
      } else if (b === undefined) {
        out[i] = p;
      } else {
        out[i] = mergeDeep(b, p);
      }
    }
    return out;
  }

  if (isPlainObject(preferred)) {
    if (!isPlainObject(base)) {
      return preferred;
    }
    const keys = new Set([...Object.keys(base), ...Object.keys(preferred)]);
    const out: Record<string, unknown> = {};
    for (const k of keys) {
      const pb = base[k];
      const pp = preferred[k];
      if (!(k in preferred) || pp === undefined || pp === null) {
        if (k in base) out[k] = pb;
        continue;
      }
      if (!(k in base)) {
        out[k] = pp;
        continue;
      }
      out[k] = mergeDeep(pb, pp);
    }
    return out;
  }

  return preferred;
}

export function mergeSiteDictionary(
  base: Record<string, unknown>,
  preferred: Record<string, unknown>,
): Record<string, unknown> {
  return mergeDeep(base, preferred) as Record<string, unknown>;
}

const DEV_FLAG = process.env.NODE_ENV === "development";

function walkEmptyStrings(
  obj: unknown,
  path: string,
  out: { path: string }[],
): void {
  if (typeof obj === "string") {
    if (obj.trim() === "") out.push({ path });
    return;
  }
  if (!obj || typeof obj !== "object") return;
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => walkEmptyStrings(item, `${path}[${i}]`, out));
    return;
  }
  for (const k of Object.keys(obj)) {
    walkEmptyStrings((obj as Record<string, unknown>)[k], path ? `${path}.${k}` : k, out);
  }
}

/** Dev-only: empty string leaves in the raw locale file (merge will backfill from base). */
export function logEmptyStringLeavesInRawLocale(
  raw: Record<string, unknown>,
  localeId: string,
): void {
  if (!DEV_FLAG) return;
  const hits: { path: string }[] = [];
  walkEmptyStrings(raw, "", hits);
  if (hits.length === 0) return;
  console.warn(
    `[i18n] Locale "${localeId}" has ${hits.length} empty string leaf(es). Merged from RU base. Examples:`,
    hits.slice(0, 12).map((h) => h.path),
  );
}
