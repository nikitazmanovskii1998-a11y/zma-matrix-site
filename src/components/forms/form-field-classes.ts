/** Shared field chrome — keep contact form and quiz contacts step identical. */

export const FORM_LABEL_CLASS =
  "text-xs tracking-[0.08em] text-text-secondary";

/** Marks a required field (pairs with optional suffix on non-required fields). */
export const FORM_LABEL_REQUIRED_CLASS =
  "after:ml-0.5 after:inline after:text-[0.7em] after:align-super after:text-neon-line/50 after:content-['*']";

export const FORM_INPUT_CLASS =
  "form-field-control min-w-0 w-full rounded border border-neon-line/18 bg-[var(--surface-2)] px-3 py-2 text-sm text-text-primary outline-none transition-[border-color,box-shadow,background-color] duration-200";

export const FORM_TEXTAREA_CLASS = `${FORM_INPUT_CLASS} min-h-28 resize-y`;

export const FORM_ERROR_TEXT_CLASS =
  "text-xs leading-snug text-[rgba(236,188,188,0.92)]";

/** Inline hint under a specific field (validation). */
export const FORM_FIELD_INLINE_ERROR_CLASS = `${FORM_ERROR_TEXT_CLASS} mt-1`;

/** Subtle strip for submit / cross-field errors (dark UI, no “alert” chrome). */
export const FORM_ERROR_STRIP_CLASS =
  "rounded-md border border-[rgba(210,160,160,0.14)] bg-[rgba(22,18,24,0.55)] px-3 py-2.5";
