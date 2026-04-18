import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import { toLocalizedPath } from "@/lib/locale-path";
import { ButtonAnchor } from "@/components/ui/button";

type HomeHeroProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

type HeroCtaProps = {
  href: string;
  text: string;
  primary?: boolean;
  className?: string;
};

function HeroCtaAnchor({ href, text, primary = false, className = "" }: HeroCtaProps) {
  return (
    <ButtonAnchor
      href={href}
      variant={primary ? "primary" : "secondary"}
      size="sm"
      className={`home-hero-cta-btn w-full min-w-0 max-w-full sm:w-auto sm:max-w-[18.5rem] ${className}`.trim()}
    >
      {text}
    </ButtonAnchor>
  );
}

/**
 * First screen only: headline (max 2 lines) → unified support text → CTAs → microtext.
 * Headline is one display tier; quote is `HomeHeroQuotePlate` below.
 */
export function HomeHero({ locale, dictionary }: HomeHeroProps) {
  const hero = dictionary.homeHero;
  if (!hero) {
    return null;
  }

  const supportLines = hero.supportBlock
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const supportLead = supportLines[0] ?? "";
  const supportDetail = supportLines.slice(1).join("\n");

  return (
    <section
      className="home-frame home-hero relative w-full min-w-0 self-stretch pt-2 sm:pt-3 md:pt-5"
      aria-labelledby="home-hero-heading"
    >
      <div className="home-hero__shell surface-block flex w-full min-w-0 flex-col px-5 py-3.5 sm:px-8 sm:py-6 md:px-10 md:py-7 lg:px-12 lg:py-9 xl:px-14 xl:py-10">
        <div className="home-hero-stack flex min-h-0 w-full min-w-0 flex-col items-center text-center">
          <div className="flex min-w-0 w-full flex-col items-center text-center gap-y-2 sm:gap-y-3 md:gap-y-3.5">
            <div className="home-hero-narrative min-w-0 shrink-0 max-md:pt-2">
              <div className="home-hero-headline-wrap">
                <h1 id="home-hero-heading" className="section-title m-0 whitespace-pre-line">
                  {hero.heading}
                </h1>
              </div>
              <div className="home-hero-support-block">
                {supportLead ? <p className="home-hero-support-line m-0">{supportLead}</p> : null}
                {supportDetail ? (
                  <p className="home-hero-support-detail home-hero-body-text m-0 whitespace-pre-line">{supportDetail}</p>
                ) : null}
              </div>
            </div>

            <div className="home-hero-cta-slab min-w-0 shrink-0 self-center">
              <div className="home-hero-cta-slab__actions">
                <HeroCtaAnchor href="#quiz" text={hero.primaryCta} primary />
                <HeroCtaAnchor href={toLocalizedPath(locale, "projects")} text={hero.secondaryCta} />
              </div>
              <p className="home-hero-cta-slab__helper m-0">{hero.helper}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
