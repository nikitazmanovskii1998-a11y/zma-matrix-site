"use client";

import { useEffect, useId } from "react";
import { useCookieConsent } from "@/components/cookies/cookie-consent-context";
import { Button } from "@/components/ui/button";

function ToggleRow(props: {
  title: string;
  text: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (next: boolean) => void;
  switchId: string;
}) {
  const { title, text, checked, disabled, onChange, switchId } = props;
  return (
    <div className="flex gap-3 border-b border-neon-line/10 py-4 last:border-b-0">
      <div className="min-w-0 flex-1">
        <p className="card-title">{title}</p>
        <p className="idea-support mt-1 text-xs leading-relaxed md:text-sm">{text}</p>
      </div>
      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={[
          "cookie-consent-toggle relative mt-0.5 h-7 w-[46px] shrink-0 rounded-full border transition-[background-color,box-shadow] duration-200",
          disabled
            ? "cursor-not-allowed border-neon-line/15 bg-[rgba(114,229,255,0.08)] opacity-70"
            : checked
              ? "border-[rgba(114,229,255,0.45)] bg-[rgba(114,229,255,0.18)] shadow-[0_0_12px_rgba(114,229,255,0.12)]"
              : "border-neon-line/20 bg-[rgba(12,22,36,0.9)] hover:border-neon-line/35",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-0.5 block h-5 w-5 rounded-full bg-[rgba(232,244,255,0.92)] shadow-sm transition-transform duration-200",
            checked ? "translate-x-[22px]" : "translate-x-0.5",
          ].join(" ")}
          aria-hidden
        />
      </button>
    </div>
  );
}

export function CookieSettingsModal() {
  const {
    settingsOpen,
    closeSettings,
    draft,
    setDraft,
    copy,
    acceptAll,
    acceptNecessary,
    saveCustom,
  } = useCookieConsent();
  const titleId = useId();

  useEffect(() => {
    if (!settingsOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [settingsOpen]);

  useEffect(() => {
    if (!settingsOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSettings();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [settingsOpen, closeSettings]);

  if (!settingsOpen) {
    return null;
  }

  const cat = copy.categories;

  return (
    <div
      className="cookie-settings-backdrop fixed inset-0 z-[51] flex items-end justify-center bg-black/65 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-0 pt-0 backdrop-blur-[2px] md:items-center md:p-6 md:animate-[cookie-backdrop-in_260ms_ease-out_both]"
      role="presentation"
      onClick={closeSettings}
    >
      <div
        className="cookie-settings-sheet flex max-h-[min(88vh,calc(100dvh-env(safe-area-inset-bottom)))] w-full max-w-full flex-col rounded-t-[20px] border border-[rgba(114,229,255,0.2)] border-b-0 bg-[linear-gradient(180deg,rgba(18,30,46,0.98),rgba(10,18,30,0.99))] shadow-[0_-8px_40px_rgba(0,0,0,0.5)] md:max-h-[min(90vh,720px)] md:max-w-[520px] md:rounded-2xl md:border-b md:animate-[cookie-sheet-in_280ms_ease-out_both]"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-neon-line/12 px-5 py-4 md:px-6">
          <h2 id={titleId} className="page-section-h3 !font-medium">
            {copy.title}
          </h2>
          <button
            type="button"
            onClick={closeSettings}
            className="rounded-full px-2 py-1 text-xs uppercase tracking-[0.14em] text-text-secondary transition-colors hover:text-text-primary"
          >
            {copy.close}
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-2 md:px-6">
          <ToggleRow
            switchId={`${titleId}-nec`}
            title={cat.necessary.title}
            text={cat.necessary.text}
            checked
            disabled
            onChange={() => {}}
          />
          <ToggleRow
            switchId={`${titleId}-an`}
            title={cat.analytics.title}
            text={cat.analytics.text}
            checked={draft.analytics}
            onChange={(next) => setDraft((d) => ({ ...d, analytics: next }))}
          />
          <ToggleRow
            switchId={`${titleId}-pr`}
            title={cat.preferences.title}
            text={cat.preferences.text}
            checked={draft.preferences}
            onChange={(next) => setDraft((d) => ({ ...d, preferences: next }))}
          />
          <ToggleRow
            switchId={`${titleId}-mk`}
            title={cat.marketing.title}
            text={cat.marketing.text}
            checked={draft.marketing}
            onChange={(next) => setDraft((d) => ({ ...d, marketing: next }))}
          />
        </div>

        <div className="shrink-0 space-y-2.5 border-t border-neon-line/12 px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 md:px-6 md:pb-5 md:pt-5">
          <Button
            type="button"
            variant="primary"
            size="md"
            className="w-full min-h-[48px]"
            onClick={saveCustom}
          >
            {copy.save}
          </Button>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="min-h-[48px] w-full"
              onClick={acceptAll}
            >
              {copy.acceptAll}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="min-h-[48px] w-full"
              onClick={acceptNecessary}
            >
              {copy.acceptNecessary}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
