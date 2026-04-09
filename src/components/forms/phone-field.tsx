"use client";

import {
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import {
  buildFullPhone,
  digitsOnly,
  flagEmoji,
  getDefaultCountryRow,
  listCountryRows,
  matchCountryFromE164,
  type PhoneCountryRow,
} from "@/lib/phone-international";
import {
  FORM_INPUT_CLASS,
  FORM_LABEL_CLASS,
  FORM_LABEL_REQUIRED_CLASS,
} from "@/components/forms/form-field-classes";

type PhoneFieldProps = {
  id?: string;
  value: string;
  onChange: (full: string) => void;
  label: string;
  nationalPlaceholder: string;
  dialAriaLabel: string;
  disabled?: boolean;
  invalid?: boolean;
  /** Matches required name/email fields in contact + brief. */
  labelRequired?: boolean;
};

export function PhoneField({
  id,
  value,
  onChange,
  label,
  nationalPlaceholder,
  dialAriaLabel,
  disabled = false,
  invalid = false,
  labelRequired = false,
}: PhoneFieldProps) {
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedRowId, setSelectedRowId] = useState(getDefaultCountryRow().id);
  const [portalPos, setPortalPos] = useState({ top: 0, left: 0, width: 280 });

  const rows = useMemo(() => listCountryRows(), []);

  useEffect(() => {
    const run = () => {
      if (!value.trim()) {
        setSelectedRowId(getDefaultCountryRow().id);
        return;
      }
      setSelectedRowId((prev) => {
        const m = matchCountryFromE164(value, prev);
        return m ? m.row.id : prev;
      });
    };
    queueMicrotask(run);
  }, [value]);

  const parsed = value.trim()
    ? matchCountryFromE164(value, selectedRowId)
    : null;
  const activeRow: PhoneCountryRow =
    parsed?.row ??
    rows.find((r) => r.id === selectedRowId) ??
    getDefaultCountryRow();
  const nationalDigits = parsed?.nationalDigits ?? "";

  const filteredRows = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return [...rows];
    return rows.filter((r) => {
      const hay = `${r.name} +${r.dial} ${r.iso2}`.toLowerCase();
      return hay.includes(q);
    });
  }, [filter, rows]);

  const updatePortalPosition = () => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const width = Math.min(Math.max(r.width, 260), 360);
    setPortalPos({
      top: r.bottom + 6,
      left: r.left,
      width,
    });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePortalPosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onScrollResize = () => updatePortalPosition();
    window.addEventListener("resize", onScrollResize);
    window.addEventListener("scroll", onScrollResize, true);
    return () => {
      window.removeEventListener("resize", onScrollResize);
      window.removeEventListener("scroll", onScrollResize, true);
    };
  }, [open]);

  /* Outside-close: defer attaching so the same gesture that opened the list
   * cannot immediately hit the document listener (fixes tap/click not opening). */
  useEffect(() => {
    if (!open) return;
    let removeDoc: (() => void) | undefined;
    const openTimer = window.setTimeout(() => {
      const onDoc = (e: MouseEvent) => {
        const t = e.target as Node;
        if (wrapRef.current?.contains(t) || portalRef.current?.contains(t)) return;
        setOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      removeDoc = () => document.removeEventListener("mousedown", onDoc);
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(openTimer);
      removeDoc?.();
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const setDial = (row: PhoneCountryRow) => {
    setSelectedRowId(row.id);
    onChange(buildFullPhone(row, nationalDigits));
    setOpen(false);
    setFilter("");
  };

  const setNational = (raw: string) => {
    const next = digitsOnly(raw).slice(0, 15);
    onChange(buildFullPhone(activeRow, next));
  };

  const dialList =
    open && typeof document !== "undefined"
      ? createPortal(
          <div
            ref={portalRef}
            id={listId}
            role="listbox"
            className="phone-dial-portal pointer-events-auto fixed z-[10000] flex max-h-[min(50vh,22rem)] min-w-[260px] flex-col overflow-hidden rounded-md border border-neon-line/16 bg-[rgba(10,18,30,0.98)] shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-md"
            style={{
              top: portalPos.top,
              left: portalPos.left,
              width: portalPos.width,
            }}
          >
            <div className="shrink-0 border-b border-neon-line/10 px-2 py-1.5">
              <input
                type="search"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search country or code"
                className="w-full rounded border border-neon-line/15 bg-[var(--surface-2)] px-2 py-1.5 text-xs text-text-primary outline-none placeholder:text-text-secondary/70 focus:border-neon-line/40"
                autoComplete="off"
                aria-label="Filter countries"
                onMouseDown={(e) => e.stopPropagation()}
              />
            </div>
            <ul className="min-h-0 flex-1 overflow-y-auto overscroll-contain py-0.5">
              {filteredRows.length === 0 ? (
                <li className="px-3 py-2 text-xs text-text-secondary">No matches</li>
              ) : (
                filteredRows.map((row) => {
                  const selected = row.id === activeRow.id;
                  return (
                    <li key={row.id} role="presentation">
                      <button
                        type="button"
                        role="option"
                        aria-selected={selected}
                        className={`phone-dial-option flex w-full items-center gap-2 px-2.5 py-2 text-left text-sm text-text-primary transition-colors hover:bg-[color-mix(in_srgb,var(--line-neon)_10%,transparent)] focus-visible:bg-[color-mix(in_srgb,var(--line-neon)_10%,transparent)] focus-visible:outline-none sm:gap-2.5 sm:px-3 ${selected ? "phone-dial-option--selected" : ""}`}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => setDial(row)}
                      >
                        <span className="text-lg leading-none" aria-hidden>
                          {flagEmoji(row.iso2)}
                        </span>
                        <span className="shrink-0 tabular-nums text-neon-line/95">
                          +{row.dial}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-xs leading-snug text-text-secondary">
                          {row.name}
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>,
          document.body,
        )
      : null;

  return (
    <div className="grid min-w-0 gap-1.5">
      <span
        id={id ? `${id}-label` : undefined}
        className={`${FORM_LABEL_CLASS}${labelRequired ? ` ${FORM_LABEL_REQUIRED_CLASS}` : ""}`}
      >
        {label}
      </span>
      <div
        ref={wrapRef}
        data-invalid={invalid ? "true" : undefined}
        data-filled={nationalDigits.length > 0 ? "true" : undefined}
        className="phone-field-shell relative z-20 flex w-full min-w-0 gap-0 rounded border border-neon-line/18 bg-[var(--surface-2)] transition-[border-color,box-shadow] duration-200"
      >
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          aria-label={dialAriaLabel}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={listId}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!disabled) setOpen((o) => !o);
          }}
          className="phone-dial-trigger relative z-10 flex shrink-0 cursor-pointer items-center gap-1 border-r border-neon-line/14 px-2 py-1.5 text-left text-sm text-text-primary outline-none transition-colors hover:bg-[color-mix(in_srgb,var(--line-neon)_6%,transparent)] focus-visible:ring-2 focus-visible:ring-neon-line/35 disabled:opacity-50 sm:gap-1.5 sm:px-2.5 sm:py-2"
        >
          <span className="text-base leading-none" aria-hidden>
            {flagEmoji(activeRow.iso2)}
          </span>
          <span className="whitespace-nowrap tabular-nums text-text-primary">
            +{activeRow.dial}
          </span>
          <span className="phone-dial-chevron text-[0.65rem] text-text-secondary" aria-hidden>
            ▾
          </span>
        </button>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          aria-labelledby={id ? `${id}-label` : undefined}
          aria-invalid={invalid || undefined}
          disabled={disabled}
          value={nationalDigits}
          onChange={(e) => setNational(e.target.value)}
          placeholder={nationalPlaceholder}
          className={`${FORM_INPUT_CLASS} min-w-0 flex-1 rounded-none border-0 bg-transparent px-3 py-2 shadow-none focus:border-0 focus:ring-0`}
        />
      </div>
      {dialList}
    </div>
  );
}
