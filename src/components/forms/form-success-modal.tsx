"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

export type FormSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
  ariaClose: string;
  /** Unique id for aria-labelledby (avoid clashes if multiple instances in tree). */
  titleId?: string;
};

export function FormSuccessModal({
  open,
  onClose,
  title,
  body,
  primaryLabel,
  secondaryLabel,
  ariaClose,
  titleId = "form-success-modal-title",
}: FormSuccessModalProps) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="quiz-success-overlay fixed inset-0 z-[60]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="quiz-success-backdrop absolute inset-0"
        onClick={onClose}
        aria-label={ariaClose}
      />
      <div className="quiz-success-panel relative z-10">
        <h3 id={titleId} className="quiz-success-title">
          {title}
        </h3>
        <p className="quiz-success-body">{body}</p>
        <div className="quiz-success-actions">
          <Button type="button" variant="primary" size="sm" onClick={onClose}>
            {primaryLabel}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            {secondaryLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
