"use client";

import { AnalyticsScripts } from "@/components/seo/analytics-scripts";
import { LangAttributeSync } from "@/components/seo/lang-attribute-sync";

/** Client-only: `<html lang>` sync + Yandex.Metrica (after analytics cookie consent). */
export function SiteFrameChrome() {
  return (
    <>
      <LangAttributeSync />
      <AnalyticsScripts />
    </>
  );
}
