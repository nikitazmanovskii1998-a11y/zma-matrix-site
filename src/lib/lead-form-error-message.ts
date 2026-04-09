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
  if (
    result.status === 400 &&
    (result.error === "Captcha verification failed" ||
      (result.error?.toLowerCase().includes("captcha") ?? false))
  ) {
    return form.captchaFailed;
  }
  return form.submitError;
}
