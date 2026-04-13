import type { SiteDictionary } from "@/i18n/types";
import type { SubmitLeadResult } from "@/lib/submit-lead";

/** Maps `/api/lead` failure to localized copy (safe strings only). */
export function leadSubmitFailureMessage(
  form: SiteDictionary["form"],
  result: Extract<SubmitLeadResult, { ok: false }>,
): string {
  if (result.status === 503 || result.error === "Service unavailable") {
    return form.serviceUnavailable;
  }
  return form.submitError;
}
