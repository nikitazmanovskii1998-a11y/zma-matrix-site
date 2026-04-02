"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { resolveMobileMenu, resolveSiteHeaderCopy } from "@/i18n/fallbacks";
import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import { toLocalizedPath, type RouteSlug } from "@/lib/locale-path";
import { resolveServiceNavLinks } from "@/lib/service-nav-links";
import { ServicesNavPanelBody } from "@/components/nav/services-nav-panel-body";
import { HeaderLogo } from "@/components/layout/header-logo";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

/** Stable ids — single header per page; avoids useId SSR/client drift. */
const SERVICES_PANEL_MD_ID = "zma-header-services-md";
const SERVICES_PANEL_LG_ID = "zma-header-services-lg";
const MOBILE_MENU_ID = "zma-header-mobile-menu";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

type NavItem = {
  slug: RouteSlug;
  label: string;
};

/** Desktop/tablet header nav: links and services trigger share one visual system. */
function headerNavItemClass(isActive: boolean) {
  return ["header-nav-item", isActive ? "is-active" : ""].filter(Boolean).join(" ");
}

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  /** Single source for active states + language links; matches Next App Router SSR + hydrate when not using rewrites. */
  const pathname = usePathname() ?? "";
  const headerRef = useRef<HTMLElement | null>(null);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const mm = resolveMobileMenu(dictionary, locale);
  const mobileMenuClose = mm.close;
  const mobileMenuOpenLabel = mm.open;
  const mobileNavigationTitle = mm.navigationTitle;
  const mobileContactsTitle = mm.contactsTitle;
  const { nav, header, lang } = resolveSiteHeaderCopy(dictionary);
  const brandLabel = header.brandLabel;
  const contactsLabel = nav.contacts;
  const langRu = lang.ru;
  const langEn = lang.en;

  const leadingNavItems: NavItem[] = [
    { slug: "", label: nav.home },
    { slug: "approach", label: nav.approach },
    { slug: "projects", label: nav.projects },
  ];

  const trailingNavItems: NavItem[] = [
    { slug: "about", label: nav.about },
    { slug: "contact", label: contactsLabel },
  ];

  const serviceLinks = useMemo(() => resolveServiceNavLinks(locale, dictionary), [locale, dictionary]);

  const closeMenus = () => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (headerRef.current?.contains(target)) return;
      setServicesOpen(false);
    };

    const onEsc = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setServicesOpen(false);
      setMobileMenuOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    window.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("keydown", onEsc);
    };
  }, []);

  const isServicesActive =
    pathname === `/${locale}/services` || pathname.startsWith(`/${locale}/services/`);

  const homeHref = toLocalizedPath(locale, "");

  const servicesNavHighlighted = isServicesActive || servicesOpen;

  const renderServicesFlyout = (panelId: string, align: "left" | "right") => (
    <div
      id={panelId}
      className={[
        "services-panel absolute top-[calc(100%+0.75rem)] z-[50] w-[min(24rem,calc(100dvw-2rem-env(safe-area-inset-left)-env(safe-area-inset-right)))]",
        align === "right" ? "right-0" : "left-0",
      ].join(" ")}
      data-open={servicesOpen ? "true" : "false"}
      aria-hidden={!servicesOpen}
    >
      <ServicesNavPanelBody
        servicesPanelLabel={nav.servicesPanelLabel}
        links={serviceLinks}
        servicesHubHref={`/${locale}/services`}
        allServicesLabel={nav.allServices}
        onLinkClick={closeMenus}
        pathname={pathname}
      />
    </div>
  );

  return (
    <header ref={headerRef} className="sticky top-4 z-30">
      <div className="surface-capsule relative flex min-w-0 flex-col gap-0 px-3 py-2 md:px-4 md:py-2.5 lg:px-4 lg:py-1">
        <div className="flex items-center justify-between gap-3 md:hidden">
          <Link
            href={homeHref}
            className="inline-flex min-w-0 shrink-0 items-center"
            aria-label={brandLabel}
          >
            <HeaderLogo className="h-[26px] w-auto max-w-[min(46vw,200px)] object-contain object-left" />
          </Link>
          <div className="flex items-center gap-1.5">
            <LanguageSwitcher
              currentLocale={locale}
              compact
              labelRu={langRu}
              labelEn={langEn}
              pathname={pathname}
            />
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[16px] border border-[rgba(114,229,255,0.28)] bg-[rgba(18,30,46,0.88)] text-text-primary"
              aria-expanded={mobileMenuOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={mobileMenuOpen ? mobileMenuClose : mobileMenuOpenLabel}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <span
                className="mobile-burger-lines"
                aria-hidden="true"
                data-open={mobileMenuOpen ? "true" : "false"}
              >
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>

        {/* Tablet / small desktop: single row, no centered brand */}
        <div className="hidden md:flex lg:hidden items-center justify-between gap-3">
          <nav className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5" aria-label="Main">
            {leadingNavItems.map((item) => {
              const href = toLocalizedPath(locale, item.slug);
              const isActive = pathname === href;
              return (
                <Link
                  key={item.slug || "home-md"}
                  href={href}
                  onClick={closeMenus}
                  className={headerNavItemClass(isActive)}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="relative">
              <button
                type="button"
                className={headerNavItemClass(servicesNavHighlighted)}
                aria-expanded={servicesOpen}
                aria-controls={SERVICES_PANEL_MD_ID}
                onClick={() => setServicesOpen((prev) => !prev)}
              >
                {nav.services}
              </button>
              {renderServicesFlyout(SERVICES_PANEL_MD_ID, "left")}
            </div>
            {trailingNavItems.map((item) => {
              const href = toLocalizedPath(locale, item.slug);
              const isActive = pathname === href;
              return (
                <Link key={item.slug} href={href} onClick={closeMenus} className={headerNavItemClass(isActive)}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="shrink-0">
            <LanguageSwitcher currentLocale={locale} labelRu={langRu} labelEn={langEn} pathname={pathname} />
          </div>
        </div>

        {/* Large desktop: 3-zone grid — logo | centered nav | language */}
        <div className="header-desktop-shell relative z-[1] hidden min-h-0 w-full min-w-0 lg:block">
          <div className="header-desktop-grid">
            <div className="header-desktop-zone header-desktop-zone--left">
              <Link
                href={homeHref}
                onClick={closeMenus}
                className="inline-flex min-w-0 shrink-0 items-center underline-offset-4 transition-opacity hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(114,229,255,0.35)]"
                aria-label={brandLabel}
              >
                <HeaderLogo className="h-[clamp(1.45rem,0.95vw+0.75rem,1.75rem)] w-auto max-w-[min(100%,13rem)] object-contain object-left" />
              </Link>
            </div>

            <nav className="header-desktop-zone header-desktop-zone--center" aria-label="Main">
              <div className="header-desktop-nav-group flex min-w-0 flex-wrap items-center justify-center gap-x-1.5 gap-y-1.5">
                {leadingNavItems.map((item) => {
                  const href = toLocalizedPath(locale, item.slug);
                  const isActive = pathname === href;
                  return (
                    <Link
                      key={item.slug || "home-lg"}
                      href={href}
                      onClick={closeMenus}
                      className={headerNavItemClass(isActive)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <div className="relative shrink-0">
                  <button
                    type="button"
                    className={headerNavItemClass(servicesNavHighlighted)}
                    aria-expanded={servicesOpen}
                    aria-controls={SERVICES_PANEL_LG_ID}
                    onClick={() => setServicesOpen((prev) => !prev)}
                  >
                    {nav.services}
                  </button>
                  {renderServicesFlyout(SERVICES_PANEL_LG_ID, "left")}
                </div>
                {trailingNavItems.map((item) => {
                  const href = toLocalizedPath(locale, item.slug);
                  const isActive = pathname === href;
                  return (
                    <Link key={`${item.slug}-lg`} href={href} onClick={closeMenus} className={headerNavItemClass(isActive)}>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="header-desktop-zone header-desktop-zone--lang">
              <LanguageSwitcher currentLocale={locale} labelRu={langRu} labelEn={langEn} pathname={pathname} />
            </div>
          </div>
        </div>
      </div>

      <div
        className="mobile-menu-overlay md:hidden"
        data-open={mobileMenuOpen ? "true" : "false"}
        onClick={() => setMobileMenuOpen(false)}
      />
      <aside
        id={MOBILE_MENU_ID}
        className="mobile-menu-panel md:hidden"
        data-open={mobileMenuOpen ? "true" : "false"}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex items-center justify-between">
          <Link
            href={homeHref}
            onClick={closeMenus}
            className="inline-flex min-w-0 shrink items-center"
            aria-label={brandLabel}
          >
            <HeaderLogo className="h-6 w-auto max-w-[200px] object-contain object-left" />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            className="rounded-full px-2 py-1 text-xs text-text-secondary"
            aria-label={mobileMenuClose}
          >
            {mobileMenuClose}
          </button>
        </div>

        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-text-muted-soft">
          {mobileNavigationTitle}
        </p>
        <nav className="mt-3 grid gap-2">
          {[...leadingNavItems, ...trailingNavItems].map((item) => (
            <Link
              key={item.slug || "home-mobile"}
              href={toLocalizedPath(locale, item.slug)}
              onClick={closeMenus}
              className="mobile-menu-link"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            className="mobile-menu-link flex items-center justify-between"
            onClick={() => setMobileServicesOpen((prev) => !prev)}
            aria-expanded={mobileServicesOpen}
            aria-controls={`${MOBILE_MENU_ID}-services`}
          >
            <span>{nav.services}</span>
            <span className="text-text-muted-soft">{mobileServicesOpen ? "−" : "+"}</span>
          </button>
          <div
            id={`${MOBILE_MENU_ID}-services`}
            className="mobile-services-list"
            data-open={mobileServicesOpen ? "true" : "false"}
          >
            {serviceLinks.map((item) => (
              <Link
                key={`${item.slug}-mobile`}
                href={item.href}
                onClick={closeMenus}
                className="mobile-menu-sub-link"
              >
                {item.title}
              </Link>
            ))}
            <Link href={`/${locale}/services`} onClick={closeMenus} className="mobile-menu-sub-link">
              {nav.allServices}
            </Link>
          </div>
        </nav>
        <p className="mt-4 text-[0.65rem] uppercase tracking-[0.14em] text-text-muted-soft">
          {mobileContactsTitle}
        </p>
        <Link
          href={toLocalizedPath(locale, "contact")}
          onClick={closeMenus}
          className="mobile-menu-link mt-2"
        >
          {contactsLabel}
        </Link>
      </aside>
    </header>
  );
}
