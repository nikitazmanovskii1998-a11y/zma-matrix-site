"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { defaultLocale, locales, type Locale } from "@/i18n/locales";

function pathLocale(pathname: string): Locale {
  const seg = pathname.split("/").filter(Boolean)[0];
  return locales.includes(seg as Locale) ? (seg as Locale) : defaultLocale;
}

/** Keeps `<html lang>` aligned with the active `[lang]` route segment (root layout initial matches `defaultLocale`). */
export function LangAttributeSync() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = pathLocale(pathname);
  }, [pathname]);
  return null;
}
