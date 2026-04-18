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
  const { seo } = dictionary.approachPage;
  return localizedPageMetadata(lang, "approach", seo.pageMetaTitle, seo.pageMetaDescription);
}

export default async function ApproachPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  const page = dictionary.approachPage;

  return (
    <div className="page-section-stack min-w-0">
      <section className="surface-block surface-section min-w-0 overflow-x-clip">
        <p className="idea-detail text-neon-line">{page.hero.eyebrow}</p>
        <h1 className="page-hero-title mt-3 max-w-4xl">
          {page.hero.title}
        </h1>
        <p className="page-hero-lead mt-4 max-w-4xl">{page.hero.subtitle}</p>
        <p className="idea-support mt-4 max-w-4xl">{page.hero.lead}</p>
        <p className="idea-detail mt-4 max-w-3xl">{page.hero.optionalNote}</p>
        <div className="mt-6 flex w-full min-w-0 max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch">
          <ButtonLink
            href={`${toLocalizedPath(lang, "")}#quiz`}
            variant="primary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {page.hero.primaryCta}
          </ButtonLink>
          <ButtonLink
            href={toLocalizedPath(lang, "services")}
            variant="secondary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {page.hero.secondaryCta}
          </ButtonLink>
        </div>
        <p className="idea-detail mt-4 max-w-3xl text-neon-line">{page.hero.firstStepHint}</p>
      </section>

      <section className="surface-block surface-section">
        <h2 className="page-section-h2">{page.methodIntroSection.sectionTitle}</h2>
        <p className="idea-main mt-4 max-w-4xl">{page.methodIntroSection.paragraph1}</p>
        <p className="idea-main mt-4 max-w-4xl">{page.methodIntroSection.paragraph2}</p>
      </section>

      <section className="surface-block surface-section">
        <h2 className="page-section-h2">{page.principlesSection.sectionTitle}</h2>
        <p className="idea-support mt-4 max-w-4xl">{page.principlesSection.sectionIntro}</p>
        <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2">
          {page.principlesSection.principles.map((item) => (
            <div key={item.title} className="surface-soft min-w-0 px-5 py-4">
              <p className="card-title">{item.title}</p>
              <p className="idea-support mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-block surface-section">
        <h2 className="page-section-h2">{page.workflowSection.sectionTitle}</h2>
        <p className="idea-support mt-4 max-w-4xl">{page.workflowSection.sectionIntro}</p>
        <div className="mt-5 grid min-w-0 gap-3">
          {page.workflowSection.steps.map((step) => (
            <div key={step.title} className="surface-soft min-w-0 px-5 py-4">
              <p className="card-title">{step.title}</p>
              <p className="idea-support mt-2">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-block surface-section">
        <h2 className="page-section-h2">{page.whatWeAnalyzeSection.sectionTitle}</h2>
        <p className="idea-support mt-4 max-w-4xl">{page.whatWeAnalyzeSection.sectionIntro}</p>
        <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
          {page.whatWeAnalyzeSection.items.map((item) => (
            <div key={item.title} className="surface-soft min-w-0 px-5 py-4">
              <p className="card-title">{item.title}</p>
              <p className="idea-support mt-2">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-block surface-section">
        <h2 className="page-section-h2">{page.whyItWorksSection.sectionTitle}</h2>
        <p className="idea-support mt-4 max-w-4xl">{page.whyItWorksSection.sectionIntro}</p>
        <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
          {page.whyItWorksSection.points.map((point) => (
            <div key={point.title} className="surface-soft min-w-0 px-5 py-4">
              <p className="card-title">{point.title}</p>
              <p className="idea-support mt-2">{point.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-block surface-section">
        <h2 className="page-section-h2">{page.afterLaunchSection.sectionTitle}</h2>
        <p className="idea-support mt-4 max-w-4xl">{page.afterLaunchSection.sectionIntro}</p>
        <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
          {page.afterLaunchSection.directions.map((d) => (
            <div key={d.title} className="surface-soft min-w-0 px-5 py-4">
              <p className="card-title">{d.title}</p>
              <p className="idea-support mt-2">{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-block surface-section">
        <h2 className="page-section-h2">{page.fitSection.sectionTitle}</h2>
        <div className="mt-5 grid min-w-0 gap-5 sm:grid-cols-2 sm:gap-6">
          <div className="min-w-0">
            <h3 className="page-section-h3">{page.fitSection.fitsTitle}</h3>
            <ul className="idea-support mt-4 space-y-3 sm:space-y-4">
              {page.fitSection.fits.map((item) => (
                <li key={item.title} className="surface-soft min-w-0 px-5 py-4">
                  <p className="card-title">{item.title}</p>
                  <p className="idea-support mt-2">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className="page-section-h3">{page.fitSection.notFitsTitle}</h3>
            <ul className="idea-support mt-4 space-y-3 sm:space-y-4">
              {page.fitSection.notFits.map((item) => (
                <li key={item.title} className="surface-soft min-w-0 px-5 py-4">
                  <p className="card-title">{item.title}</p>
                  <p className="idea-support mt-2">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="surface-block surface-section">
        <p className="page-close-emphasis max-w-3xl">{page.closingCtaSection.sectionTitle}</p>
        <p className="idea-support mt-4 max-w-3xl">{page.closingCtaSection.sectionText}</p>
        <div className="mt-5 flex w-full min-w-0 max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink
            href={toLocalizedPath(lang, "contact")}
            variant="primary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {page.closingCtaSection.primaryCta}
          </ButtonLink>
          <ButtonLink
            href={toLocalizedPath(lang, "services")}
            variant="secondary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {page.closingCtaSection.secondaryCta}
          </ButtonLink>
        </div>
        <p className="idea-support mt-4 max-w-2xl">{page.closingCtaSection.helperText}</p>
        <p className="idea-detail mt-6 max-w-2xl text-neon-line">{page.microcopy.closingLine}</p>
      </section>
    </div>
  );
}
