"use client";

import { Button } from "@/components/ui/button";

type DialogModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  closeLabel: string;
};

export function DialogModal({
  open,
  onClose,
  title,
  children,
  closeLabel,
}: DialogModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/72 pl-[max(0.75rem,env(safe-area-inset-left))] pr-[max(0.75rem,env(safe-area-inset-right))] pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.5rem,env(safe-area-inset-top))] md:items-center md:p-6">
      {/*
        Single scroll surface: panel is flex column with max-height; body gets flex-1 min-h-0 overflow-y-auto.
        Avoids nested max-h + overflow (e.g. project detail) clipping the bottom / blocking scroll to CTAs.
      */}
      <div className="surface-block surface-section flex max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-bottom)-1.5rem))] w-full min-h-0 min-w-0 max-w-2xl flex-col overflow-hidden">
        <div className="flex shrink-0 items-center justify-between gap-3">
          <h3 className="page-section-h3 min-w-0 pr-2">{title}</h3>
          <Button onClick={onClose} variant="ghost" size="sm">
            {closeLabel}
          </Button>
        </div>
        <div className="idea-support mt-5 min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain pb-[max(0.5rem,env(safe-area-inset-bottom))]">
          {children}
        </div>
      </div>
    </div>
  );
}
