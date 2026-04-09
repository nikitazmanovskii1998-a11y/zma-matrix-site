/**
 * Server-side Yandex SmartCaptcha validation.
 * @see https://yandex.cloud/en/docs/smartcaptcha/concepts/validation
 */

const VALIDATE_URL = "https://smartcaptcha.yandexcloud.net/validate";

/**
 * @returns `true` when Yandex confirms the token; `false` for missing token, bad response, or network error.
 */
export async function verifyYandexSmartCaptchaToken(
  secret: string,
  token: string | undefined,
  clientIp: string | undefined,
): Promise<boolean> {
  const t = token?.trim();
  if (!t) {
    return false;
  }

  const body = new URLSearchParams({ secret: secret.trim(), token: t });
  if (clientIp) {
    body.set("ip", clientIp);
  }

  try {
    const res = await fetch(VALIDATE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(10_000),
    });
    const raw = await res.text();
    try {
      const j = JSON.parse(raw) as { status?: string };
      return j.status === "ok";
    } catch {
      return false;
    }
  } catch {
    return false;
  }
}

export function getYandexSmartCaptchaSecret(): string | undefined {
  const s = process.env.YANDEX_SMARTCAPTCHA_SECRET?.trim();
  return s || undefined;
}
