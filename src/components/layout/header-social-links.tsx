import { SOCIAL_CONTACT_URLS } from "@/lib/social-contact-urls";

type HeaderSocialLinksProps = {
  /** Drawer: mobile menu. Bar: legacy full-width row. Inline: compact icons beside nav/lang on desktop. */
  variant: "drawer" | "bar" | "inline";
};

/**
 * Telegram / WhatsApp / Instagram — `SOCIAL_CONTACT_URLS`.
 * Crisp vector glyphs (geometricPrecision), slightly larger hit targets.
 */
export function HeaderSocialLinks({ variant }: HeaderSocialLinksProps) {
  const items = [
    { key: "tg", href: SOCIAL_CONTACT_URLS.telegram, label: "Telegram", Icon: IconTelegram },
    { key: "wa", href: SOCIAL_CONTACT_URLS.whatsapp, label: "WhatsApp", Icon: IconWhatsApp },
    { key: "ig", href: SOCIAL_CONTACT_URLS.instagram, label: "Instagram", Icon: IconInstagram },
  ] as const;

  const hitBar =
    "header-social-hit flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(165deg,rgba(34,52,76,0.78)_0%,rgba(16,26,42,0.92)_100%)] text-[rgba(228,240,252,0.96)] shadow-[inset_0_1px_0_rgba(230,248,255,0.1),0_2px_10px_rgba(0,0,0,0.38)] transition-[transform,box-shadow,background-color] duration-150 ease-out hover:bg-[linear-gradient(165deg,rgba(40,60,88,0.82)_0%,rgba(20,32,50,0.95)_100%)] hover:shadow-[inset_0_1px_0_rgba(240,252,255,0.12),0_3px_12px_rgba(0,0,0,0.42)] active:scale-[0.97]";

  const hitInline =
    "header-social-hit header-social-hit--inline flex h-7 w-7 shrink-0 items-center justify-center rounded-[10px] border border-[rgba(114,229,255,0.12)] bg-[linear-gradient(165deg,rgba(26,40,58,0.65)_0%,rgba(14,22,36,0.82)_100%)] text-[rgba(218,232,246,0.9)] shadow-[inset_0_1px_0_rgba(230,248,255,0.06)] transition-[transform,background-color,border-color] duration-150 ease-out hover:border-[rgba(114,229,255,0.22)] hover:bg-[linear-gradient(165deg,rgba(32,48,68,0.72)_0%,rgba(18,28,44,0.88)_100%)] active:scale-[0.96]";

  const row = (
    <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
      {items.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={hitBar}
          aria-label={label}
        >
          <Icon />
        </a>
      ))}
    </div>
  );

  const rowInline = (
    <div className="flex items-center gap-1" role="presentation">
      {items.map(({ key, href, label, Icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={hitInline}
          aria-label={label}
        >
          <Icon className="h-[17px] w-[17px] shrink-0" />
        </a>
      ))}
    </div>
  );

  if (variant === "drawer") {
    return <div className="mt-5 flex w-full min-w-0 justify-center">{row}</div>;
  }

  if (variant === "inline") {
    return <div className="flex shrink-0 items-center">{rowInline}</div>;
  }

  return <div className="flex w-full min-w-0 justify-end">{row}</div>;
}

/** Simple Icons–style Telegram mark: single clean fill path @ 24px. */
function IconTelegram({ className = "h-[23px] w-[23px] shrink-0" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
      shapeRendering="geometricPrecision"
    >
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.47-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

/**
 * WhatsApp — simple-icons path with explicit cubic segments (Iconify source).
 * Fixes a broken minified path where missing `c` commands caused soft/blurry rendering.
 */
function IconWhatsApp({ className = "h-[23px] w-[23px] shrink-0" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      fill="currentColor"
      shapeRendering="geometricPrecision"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
    </svg>
  );
}

/** Instagram camera: crisp strokes, no fuzzy fills. */
function IconInstagram({ className = "h-[23px] w-[23px] shrink-0" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden
      fill="none"
      shapeRendering="geometricPrecision"
    >
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        rx="4.75"
        stroke="currentColor"
        strokeWidth="1.85"
      />
      <circle cx="12" cy="12" r="3.65" stroke="currentColor" strokeWidth="1.85" />
      <circle cx="17.35" cy="6.65" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
