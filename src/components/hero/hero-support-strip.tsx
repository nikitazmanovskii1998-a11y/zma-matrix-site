import type { SiteDictionary } from "@/i18n/types";

type HeroSupportStripProps = {
  dictionary: SiteDictionary;
};

export function HeroSupportStrip({ dictionary }: HeroSupportStripProps) {
  const blocks = dictionary.homeHero.supportBlocks ?? [];

  return (
    <section className="relative mx-auto mt-5 w-full max-w-[1560px] min-w-0 md:mt-7">
      <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {blocks.map((block) => (
          <article
            key={block.title}
            className="surface-block min-w-0 px-5 py-5 sm:px-6 sm:py-6"
          >
            <h2 className="idea-detail">
              {block.title}
            </h2>
            <p className="idea-main mt-3">
              {block.text}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
