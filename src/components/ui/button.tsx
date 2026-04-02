import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "lg" | "md" | "sm";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Shows a compact spinner and sets `aria-busy`; implies disabled while true. */
  loading?: boolean;
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary: "ui-btn--primary",
  secondary: "ui-btn--secondary",
  ghost: "ui-btn--ghost",
};

const sizeClassMap: Record<ButtonSize, string> = {
  lg: "ui-btn--size-lg",
  md: "ui-btn--size-md",
  sm: "ui-btn--size-sm",
};

function joinButtonClass({
  variant = "secondary",
  size = "md",
  className = "",
  loading = false,
}: BaseProps) {
  return [
    "ui-btn",
    variantClassMap[variant],
    sizeClassMap[size],
    loading ? "ui-btn--loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

type ButtonProps = BaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "secondary",
  size = "md",
  className = "",
  type = "button",
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={joinButtonClass({ variant, size, className, loading })}
      {...props}
    />
  );
}

type ButtonLinkProps = BaseProps &
  Omit<React.ComponentProps<typeof Link>, "className">;

export function ButtonLink({
  variant = "secondary",
  size = "md",
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={joinButtonClass({ variant, size, className })}
      {...props}
    />
  );
}

type ButtonAnchorProps = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function ButtonAnchor({
  variant = "secondary",
  size = "md",
  className = "",
  ...props
}: ButtonAnchorProps) {
  return (
    <a
      className={joinButtonClass({ variant, size, className })}
      {...props}
    />
  );
}
