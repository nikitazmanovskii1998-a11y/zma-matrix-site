"use client";

import { AnalyticsScripts } from "@/components/seo/analytics-scripts";
import { LangAttributeSync } from "@/components/seo/lang-attribute-sync";
import { SmartCaptchaScript } from "@/components/seo/smart-captcha-script";

/** Client-only: `<html lang>`, SmartCaptcha loader, analytics (cookie-gated). */
export function SiteFrameChrome() {
  return (
    <>
      <LangAttributeSync />
      <SmartCaptchaScript />
      <AnalyticsScripts />
    </>
  );
}
