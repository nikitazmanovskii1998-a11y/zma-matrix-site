"use client";

import { useEffect, useId, useRef } from "react";
import type { Locale } from "@/i18n/locales";

declare global {
  interface Window {
    smartCaptcha?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          hl?: string;
          callback?: (token: string) => void;
        },
      ) => void;
    };
  }
}

type YandexSmartCaptchaFieldProps = {
  locale: Locale;
  /** Bump to reset widget after failed submit or token expiry. */
  resetKey: number;
  onTokenChange: (token: string | null) => void;
  disabled?: boolean;
};

export function YandexSmartCaptchaField({
  locale,
  resetKey,
  onTokenChange,
  disabled,
}: YandexSmartCaptchaFieldProps) {
  const siteKey = process.env.NEXT_PUBLIC_YANDEX_SMARTCAPTCHA_SITE_KEY?.trim();
  const containerRef = useRef<HTMLDivElement>(null);
  const renderedRef = useRef(false);
  const onTokenChangeRef = useRef(onTokenChange);
  const baseId = useId();

  useEffect(() => {
    onTokenChangeRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    renderedRef.current = false;
    onTokenChangeRef.current(null);
    const el = containerRef.current;
    if (el) {
      el.replaceChildren();
    }

    if (!siteKey || !el || disabled) {
      return;
    }

    const hl = locale === "ru" ? "ru" : "en";

    const tryRender = (): boolean => {
      const sc = window.smartCaptcha;
      if (!sc || !el || renderedRef.current) {
        return false;
      }
      renderedRef.current = true;
      sc.render(el, {
        sitekey: siteKey,
        hl,
        callback: (token: string) => {
          onTokenChangeRef.current(token);
        },
      });
      return true;
    };

    if (tryRender()) {
      return;
    }

    const started = Date.now();
    const interval = window.setInterval(() => {
      if (tryRender()) {
        window.clearInterval(interval);
        return;
      }
      if (Date.now() - started > 45_000) {
        window.clearInterval(interval);
      }
    }, 80);

    return () => {
      window.clearInterval(interval);
    };
  }, [siteKey, locale, resetKey, disabled]);

  if (!siteKey) {
    return null;
  }

  return (
    <div
      className="smart-captcha-field min-h-[68px] w-full max-w-xl"
      data-disabled={disabled ? "true" : undefined}
    >
      <div
        id={`smartcaptcha-${baseId}`}
        ref={containerRef}
        className="min-h-[68px] w-full"
        aria-live="polite"
      />
    </div>
  );
}
