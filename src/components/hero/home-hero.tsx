import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import { BRAND_LOGO } from "@/lib/brand-logo";
import { toLocalizedPath } from "@/lib/locale-path";
import { resolveServiceNavLinks } from "@/lib/service-nav-links";
import { ServicesNavPanelBody } from "@/components/nav/services-nav-panel-body";
import { HeaderLogo } from "@/components/layout/header-logo";
import { ButtonLink } from "@/components/ui/button";

type HomeHeroProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

type HeroCtaProps = {
  href: string;
  text: string;
  primary?: boolean;
};

function HeroCta({ href, text, primary = false }: HeroCtaProps) {
  return (
    <ButtonLink href={href} variant={primary ? "primary" : "secondary"} size="lg">
      {text}
    </ButtonLink>
  );
}

/** Desktop: brand mark — same asset as header/footer; aspect from SVG. Sits inside `.home-hero-right-rail`. */
function HeroPhotoDesktop() {
  return (
    <div
      className="home-hero-photo-shell home-hero-photo-shell--desktop relative hidden w-full min-w-0 shrink-0 md:block md:min-h-0"
      style={{
        aspectRatio: `${BRAND_LOGO.width} / ${BRAND_LOGO.height}`,
      }}
    >
      <HeaderLogo className="absolute inset-0 h-full w-full object-contain object-center" />
    </div>
  );
}

function HeroPhotoMobile() {
  return (
    <div
      className="home-hero-photo-shell home-hero-photo-shell--mobile-landscape relative w-full min-h-0 shrink-0"
      style={{
        aspectRatio: `${BRAND_LOGO.width} / ${BRAND_LOGO.height}`,
      }}
    >
      <HeaderLogo className="absolute inset-0 h-full w-full object-contain object-center" />
    </div>
  );
}

/**
 * Hero: left column — headline, lead, CTAs, quote; right column — `home-hero-right-rail` (logo + `ServicesNavPanelBody`; desktop `flex-col-reverse`: services above logo).
 * Mobile: headline → lead → CTAs → services nav → logo → quote (`max-md:contents` on the rail; `order-4`/`order-5`).
 */
export function HomeHero({ locale, dictionary }: HomeHeroProps) {
  const hero = dictionary.homeHero;
  if (!hero) {
    return null;
  }

  const nav = dictionary.nav;
  const serviceNavLinks = resolveServiceNavLinks(locale, dictionary);

  return (
    <section
      className="home-frame home-hero relative w-full min-w-0 self-stretch pt-3 md:pt-5"
      aria-labelledby="home-hero-heading"
    >
      <div className="surface-block flex w-full min-w-0 flex-col py-5 pl-5 pr-8 sm:py-6 sm:pl-6 sm:pr-11 md:py-7 md:pl-8 md:pr-16 lg:py-8 lg:pl-10 lg:pr-20 xl:py-9 xl:pl-12 xl:pr-28">
        <div className="home-hero-stack flex min-h-0 w-full min-w-0 flex-col">
          <div className="home-hero-top grid min-w-0 grid-cols-1 gap-y-3 md:grid-cols-[minmax(0,1fr)_minmax(11.5rem,22rem)] md:items-start md:gap-x-8 md:gap-y-3.5 lg:gap-x-10 xl:gap-x-12">
            <div className="home-hero-narrative order-1 min-w-0 shrink-0 max-md:pt-4 md:order-none md:col-start-1 md:row-start-1">
              <h1
                id="home-hero-heading"
                className="home-hero-headline m-0 whitespace-pre-line"
              >
                {hero.heading}
              </h1>
            </div>

            <p className="home-hero-lead home-hero-lead--wide order-2 m-0 md:order-none md:col-start-1 md:row-start-2">
              {hero.support}
            </p>

            <div className="home-hero-actions order-3 mt-1.5 flex w-full min-w-0 shrink-0 flex-col items-start gap-3 text-left md:order-none md:col-start-1 md:row-start-3 md:mt-0">
              <div className="flex flex-wrap items-start gap-x-3 gap-y-2.5">
                <HeroCta
                  href={`${toLocalizedPath(locale, "")}#quiz`}
                  text={hero.primaryCta}
                  primary
                />
                <HeroCta href={toLocalizedPath(locale, "projects")} text={hero.secondaryCta} />
              </div>
              <p className="m-0 max-w-lg text-sm leading-relaxed text-muted-soft">
                {hero.helper}
              </p>
            </div>

            <div className="home-hero-right-rail max-md:contents md:col-start-2 md:row-span-4 md:row-start-1 md:flex md:min-h-0 md:min-w-0 md:flex-col-reverse md:self-start">
              <HeroPhotoDesktop />
              <div className="order-5 md:hidden">
                <HeroPhotoMobile />
              </div>
              {serviceNavLinks.length > 0 && (
                <nav
                  className="home-hero-services-layer order-4 min-w-0 w-full md:order-none"
                  aria-label={nav.servicesPanelLabel}
                >
                  <ServicesNavPanelBody
                    servicesPanelLabel={nav.servicesPanelLabel}
                    links={serviceNavLinks}
                    servicesHubHref={`/${locale}/services`}
                    allServicesLabel={nav.allServices}
                    innerExtraClassName="services-panel__inner--hero"
                  />
                </nav>
              )}
            </div>

            <div className="home-hero-quote-region order-6 w-full min-w-0 md:order-none md:col-start-1 md:row-start-4">
              <blockquote className="home-hero-quote">
                <p className="home-hero-quote__body whitespace-pre-line">{hero.footerQuote}</p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
