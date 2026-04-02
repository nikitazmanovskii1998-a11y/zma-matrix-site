"use client";

type GlassToggleProps = {
  checked: boolean;
  onCheckedChange: (next: boolean) => void;
  /** Visual error ring when user tried to submit without consent. */
  invalid?: boolean;
  disabled?: boolean;
  id?: string;
  "aria-labelledby"?: string;
};

export function GlassToggle({
  checked,
  onCheckedChange,
  invalid = false,
  disabled = false,
  id,
  "aria-labelledby": ariaLabelledBy,
}: GlassToggleProps) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={ariaLabelledBy}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
      className={`glass-toggle-track shrink-0 ${checked ? "glass-toggle-track--on" : ""} ${invalid ? "glass-toggle-track--invalid" : ""}`}
    >
      <span className="glass-toggle-thumb" aria-hidden />
    </button>
  );
}
