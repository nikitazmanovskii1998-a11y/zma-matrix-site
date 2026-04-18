import type { SiteDictionary } from "@/i18n/types";

type HomeHeroQuotePlateProps = {
  dictionary: SiteDictionary;
};

/**
 * Standalone quote surface below `HomeHero` — not part of the hero block.
 */
export function HomeHeroQuotePlate({ dictionary }: HomeHeroQuotePlateProps) {
  const quote = dictionary.homeHero?.footerQuote;
  if (!quote) {
    return null;
  }

  return (
    <section className="home-frame home-hero-quote-plate w-full min-w-0 scroll-mt-24">
      <div className="surface-block w-full min-w-0 py-4 pl-5 pr-8 sm:py-5 sm:pl-6 sm:pr-11 md:py-6 md:pl-8 md:pr-14 lg:pl-10 lg:pr-16">
        <blockquote className="home-hero-quote m-0">
          <p className="home-hero-quote__body m-0 whitespace-pre-line">{quote}</p>
        </blockquote>
      </div>
    </section>
  );
}
