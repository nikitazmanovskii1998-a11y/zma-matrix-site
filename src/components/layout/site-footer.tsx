import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import { HeaderLogo } from "@/components/layout/header-logo";
import { CookieFooterTrigger } from "@/components/cookies/cookie-footer-trigger";
import { resolveFooter } from "@/i18n/fallbacks";
import { telHrefFromDisplay } from "@/i18n/safe-text";
import type { SiteDictionary } from "@/i18n/types";
import { toLocalizedPath, type RouteSlug } from "@/lib/locale-path";

const FOOTER_NAV_SLUGS: readonly RouteSlug[] = ["", "approach", "services", "projects", "contact"] as const;

type SiteFooterProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

export function SiteFooter({ locale, dictionary }: SiteFooterProps) {
  const { desktop, mobile, common } = resolveFooter(dictionary);
  const telHref = telHrefFromDisplay(common.contactPhoneValue);

  return (
    <footer className="footer-site surface-block mt-8 grid min-w-0 grid-cols-1 gap-y-7 break-words text-text-secondary md:mt-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-x-6 md:gap-y-0 lg:gap-x-8 xl:gap-x-10">
      {/* Brand + CTAs */}
      <section className="min-w-0 md:pr-2">
        <Link
          href={toLocalizedPath(locale, "")}
          className="mb-2 inline-flex max-w-full shrink-0 items-center focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(114,229,255,0.35)]"
          aria-label={desktop.brandTitle}
        >
          <HeaderLogo className="h-7 w-auto max-w-[min(100%,11rem)] object-contain object-left sm:h-8" />
        </Link>
        <div className="hidden md:block">
          <p className="footer-brand-lead">{desktop.brandDescription}</p>
        </div>
        <div className="md:hidden">
          <p className="footer-brand-lead">{mobile.compactBrandDescription}</p>
        </div>
        <div className="mt-3 flex flex-col gap-2.5 sm:mt-3.5 sm:flex-row sm:flex-wrap sm:gap-2">
          <a
            href="https://t.me/zma_resulting"
            className="interactive-line footer-chip text-text-secondary hover:text-text-primary"
          >
            {common.ctaTelegram}
          </a>
          <Link
            href={`/${locale}#quiz`}
            className="interactive-line footer-chip text-text-secondary hover:text-text-primary"
          >
            {common.ctaBrief}
          </Link>
        </div>
      </section>

      {/* Navigation + documents */}
      <section className="footer-zone flex min-w-0 flex-col gap-5 md:border-l md:border-neon-line/10 md:pl-7 lg:pl-9">
        <div className="footer-zone-block">
          <p className="footer-section-label">{common.navigationTitle}</p>
          <nav
            className="mt-2.5 flex flex-col gap-2 md:mt-2.5 md:flex-row md:flex-wrap md:gap-x-2 md:gap-y-2"
            aria-label={common.navigationTitle}
          >
            {FOOTER_NAV_SLUGS.map((slug, i) => (
              <Link
                key={slug || "home"}
                href={toLocalizedPath(locale, slug)}
                className="interactive-line footer-link w-fit max-w-full rounded-md px-2.5 text-text-secondary"
              >
                {common.navigationItems[i]}
              </Link>
            ))}
          </nav>
        </div>

        <div className="footer-zone-block border-t border-neon-line/10 pt-5 md:pt-5">
          <p className="footer-section-label">{common.legalTitle}</p>
          <div className="mt-2.5 flex flex-col gap-3 md:mt-2.5 md:flex-row md:flex-wrap md:items-center md:gap-x-2 md:gap-y-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-2 sm:gap-y-2">
              <Link
                href={toLocalizedPath(locale, "privacy")}
                className="interactive-line footer-link w-fit rounded-md px-2.5 text-text-secondary"
              >
                {common.privacyLinkLabel}
              </Link>
              <Link
                href={toLocalizedPath(locale, "offer")}
                className="interactive-line footer-link w-fit rounded-md px-2.5 text-text-secondary"
              >
                {common.offerLinkLabel}
              </Link>
            </div>
            <CookieFooterTrigger />
          </div>
        </div>
      </section>

      {/* Contacts + requisites */}
      <section className="footer-zone flex min-w-0 flex-col gap-5 md:border-l md:border-neon-line/10 md:pl-7 lg:pl-9">
        <div className="footer-zone-block">
          <p className="footer-section-label">{common.contactTitle}</p>
          <div className="footer-contact-stack mt-2.5 md:mt-2.5">
            <a
              href="https://t.me/zma_resulting"
              className="interactive-line footer-contact-line block max-w-full rounded-md px-0.5 py-1 text-left sm:px-1 sm:py-0.5"
            >
              {common.contactTelegramLabel}: {common.contactTelegramValue}
            </a>
            {telHref ? (
              <a href={telHref} className="interactive-line footer-contact-line block max-w-full rounded-md px-0.5 py-1 sm:px-1 sm:py-0.5">
                {common.contactPhoneLabel}: {common.contactPhoneValue}
              </a>
            ) : (
              <span className="footer-contact-line block max-w-full px-0.5 py-1 sm:px-1 sm:py-0.5">
                {common.contactPhoneLabel}: {common.contactPhoneValue}
              </span>
            )}
            <a
              href={`mailto:${common.contactEmailValue}`}
              className="interactive-line footer-contact-line block max-w-full break-words rounded-md px-0.5 py-1 sm:px-1 sm:py-0.5"
            >
              {common.contactEmailLabel}: {common.contactEmailValue}
            </a>
          </div>
        </div>

        <div className="footer-zone-block border-t border-neon-line/10 pt-5 md:pt-5">
          <p className="footer-section-label">{common.requisitesTitle}</p>
          <div className="footer-req-stack mt-2.5 md:mt-2.5">
            <p className="footer-req-label">{common.legalOwnerLabel}</p>
            <p className="footer-req-line max-w-prose">{common.legalOwnerValue}</p>
            <p className="footer-req-line--tight max-w-prose">
              {common.legalInnLabel} {common.legalInnValue}
              <br />
              {common.legalOgrnipLabel} {common.legalOgrnipValue}
            </p>
            {common.legalOwnerNoteEn ? (
              <p className="footer-micro max-w-prose text-text-secondary/90">{common.legalOwnerNoteEn}</p>
            ) : null}
          </div>
        </div>
      </section>

      <div className="footer-bottom col-span-full space-y-3 md:space-y-2.5">
        <p className="footer-micro hidden max-w-[90ch] md:block">{desktop.microNote}</p>
        <p className="footer-micro md:hidden">{mobile.compactMicroNote}</p>
        <p className="footer-copyright">{common.copyright}</p>
      </div>
    </footer>
  );
}
