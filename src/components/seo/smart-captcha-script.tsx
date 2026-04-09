"use client";

import Script from "next/script";

const CAPTCHA_SRC = "https://smartcaptcha.yandexcloud.net/captcha.js";

/** Loads Yandex SmartCaptcha once when a site key is configured (anti-spam; not gated on analytics cookies). */
export function SmartCaptchaScript() {
  if (!process.env.NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_SITE_KEY?.trim()) {
    return null;
  }
  return (
    <Script
      id="yandex-smartcaptcha-lib"
      src={CAPTCHA_SRC}
      strategy="afterInteractive"
    />
  );
}
