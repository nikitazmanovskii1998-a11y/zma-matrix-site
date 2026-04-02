import { ButtonLink } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale } from "@/i18n/locales";
import { toLocalizedPath } from "@/lib/locale-path";
import { localizedPageMetadata } from "@/lib/page-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) {
    return {};
  }
  const dictionary = await getDictionary(lang);
  const { seo } = dictionary.aboutPage;
  return localizedPageMetadata(lang, "about", seo.pageMetaTitle, seo.pageMetaDescription);
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  const page = dictionary.aboutPage;
  const caps = [
    page.capabilitiesSection.websites,
    page.capabilitiesSection.telegramBots,
    page.capabilitiesSection.telegramAssistants,
    page.capabilitiesSection.automation,
    page.capabilitiesSection.seoAndGrowthContour,
  ];

  return (
    <div className="min-w-0 space-y-6 md:space-y-8">
      <section className="surface-block surface-section">
        <p className="idea-detail text-neon-line">{page.hero.eyebrow}</p>
        <h1 className="page-hero-title mt-3 max-w-4xl">
          {page.hero.title}
        </h1>
        <p className="page-hero-lead mt-4 max-w-4xl">{page.hero.subtitle}</p>
        <p className="idea-support mt-4 max-w-4xl">{page.hero.lead}</p>
        <p className="idea-detail mt-4 max-w-3xl">{page.hero.optionalNote}</p>
      </section>

      <section className="surface-block surface-section">
        <h2 className="page-section-h2">{page.essenceSection.sectionTitle}</h2>
        <p className="idea-support mt-4 max-w-4xl">{page.essenceSection.sectionIntro}</p>
        <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
          {page.essenceSection.cards.map((card) => (
            <div key={card.title} className="surface-soft min-w-0 px-5 py-4">
              <p className="card-title">{card.title}</p>
              <p className="idea-support mt-2">{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-block surface-section">
        <h2 className="page-section-h2">{page.differenceSection.sectionTitle}</h2>
        <p className="idea-support mt-4 max-w-4xl">{page.differenceSection.sectionIntro}</p>
        <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
          {page.differenceSection.items.map((item) => (
            <div key={item.title} className="surface-soft min-w-0 px-5 py-4">
              <p className="card-title">{item.title}</p>
              <p className="idea-support mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-block surface-section">
        <h2 className="page-section-h2">{page.philosophySection.sectionTitle}</h2>
        <p className="idea-support mt-4 max-w-4xl">{page.philosophySection.sectionIntro}</p>
        <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2">
          {page.philosophySection.principles.map((p) => (
            <div key={p.title} className="surface-soft min-w-0 px-5 py-4">
              <p className="card-title">{p.title}</p>
              <p className="idea-support mt-2">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-block surface-section">
        <h2 className="page-section-h2">{page.audienceSection.sectionTitle}</h2>
        <p className="idea-support mt-4 max-w-4xl">{page.audienceSection.sectionIntro}</p>
        <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
          {page.audienceSection.audiences.map((a) => (
            <div key={a.title} className="surface-soft min-w-0 px-5 py-4">
              <p className="card-title">{a.title}</p>
              <p className="idea-support mt-2">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-block surface-section">
        <h2 className="page-section-h2">{page.capabilitiesSection.sectionTitle}</h2>
        <p className="idea-support mt-4 max-w-4xl">{page.capabilitiesSection.sectionIntro}</p>
        <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
          {caps.map((c) => (
            <div key={c.title} className="surface-soft min-w-0 px-5 py-4">
              <p className="card-title">{c.title}</p>
              <p className="idea-support mt-2">{c.shortText}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-block surface-section">
        <h2 className="page-section-h2">{page.beliefSection.sectionTitle}</h2>
        <p className="idea-main mt-4 max-w-4xl">{page.beliefSection.paragraph1}</p>
        <p className="idea-main mt-4 max-w-4xl">{page.beliefSection.paragraph2}</p>
      </section>

      <section className="surface-block surface-section">
        <p className="page-close-emphasis max-w-3xl">{page.closingCtaSection.sectionTitle}</p>
        <p className="idea-support mt-4 max-w-3xl">{page.closingCtaSection.sectionText}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <ButtonLink href={toLocalizedPath(lang, "contact")} variant="primary" size="lg">
            {page.closingCtaSection.primaryCta}
          </ButtonLink>
          <ButtonLink href={`${toLocalizedPath(lang, "")}#quiz`} variant="secondary" size="lg">
            {page.closingCtaSection.secondaryCta}
          </ButtonLink>
        </div>
        <p className="idea-support mt-4 max-w-2xl">{page.closingCtaSection.helperText}</p>
        <p className="idea-detail mt-6 max-w-2xl text-neon-line">{page.microcopy.closingLine}</p>
      </section>
    </div>
  );
}
