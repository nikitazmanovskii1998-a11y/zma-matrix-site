import Link from "next/link";
import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import { toLocalizedPath } from "@/lib/locale-path";
import { serviceSlugByIndex } from "@/lib/service-slugs";
import { HomeQuizLazy } from "@/components/home/home-quiz-lazy";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { FaqAccordion } from "@/components/ui/faq-accordion";

type HomeSectionsProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

export function HomeSections({ locale, dictionary }: HomeSectionsProps) {
  const home = dictionary.home;
  const common = dictionary.common;
  if (!home) {
    return null;
  }

  return (
    <div className="home-flow relative mx-auto mt-10 w-full max-w-[1560px] min-w-0">
      <section className="home-frame surface-block surface-section">
        <h2 className="section-title">{home.tasks.title}</h2>
        <div className="mt-4 grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {(home.tasks.cards ?? []).map((card) => (
            <article key={card.title} className="surface-soft min-w-0 p-5">
              <h3 className="card-title">{card.title}</h3>
              <p className="idea-support mt-2">{card.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="home-frame surface-block surface-section">
        <h2 className="section-title">
          {home.difference.title}
        </h2>
        <div className="mt-4 grid min-w-0 gap-3">
          {(home.difference.statements ?? []).map((statement) => (
            <p
              key={statement}
              className="surface-soft idea-main min-w-0 px-5 py-4"
            >
              {statement}
            </p>
          ))}
        </div>
      </section>
      <section className="home-frame surface-block surface-section">
        <h2 className="section-title">
          {home.servicesPreview.title}
        </h2>
        <p className="section-lead mt-4 max-w-4xl">
          {home.servicesPreview.intro}
        </p>
        <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {(home.servicesPreview.cards ?? []).map((card, index) => {
            const slug = serviceSlugByIndex[index];
            return (
              <Link
                key={card.title}
                href={`/${locale}/services/${slug}`}
                className="surface-soft block h-full min-w-0 p-5 transition-transform duration-200 hover:-translate-y-[1px]"
              >
                <h3 className="card-title">{card.title}</h3>
                <p className="section-lead mt-2">{card.outcome}</p>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="home-frame surface-block surface-section">
        <h2 className="section-title">{home.process.title}</h2>
        <div className="mt-4 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {(home.process.steps ?? []).map((step) => (
            <article key={step.title} className="surface-soft min-w-0 p-5">
              <h3 className="section-label-cyan">{step.title}</h3>
              <p className="idea-support mt-2">{step.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="home-frame surface-block surface-section">
        <div className="flex min-w-0 max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <h2 className="section-title min-w-0 max-w-full break-words">
            {home.projectsPreview.title}
          </h2>
          <ButtonLink
            href={toLocalizedPath(locale, "projects")}
            variant="secondary"
            size="md"
            className="w-full max-w-full shrink-0 sm:w-auto"
          >
            {home.projectsPreview.cta}
          </ButtonLink>
        </div>
        <div className="mt-4 grid min-w-0 gap-4 sm:grid-cols-2">
          {(home.projectsPreview.cards ?? []).map((card) => (
            <article key={`${card.type}-${card.challenge}`} className="surface-soft min-w-0 p-5">
              <p className="idea-detail text-neon-line">{card.type}</p>
              <p className="idea-main mt-2">{card.challenge}</p>
              <p className="idea-support mt-2">{card.built}</p>
              <p className="idea-main mt-2">{card.result}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="quiz" className="home-frame space-y-4">
        <div className="surface-block surface-section">
          <h2 className="section-title">{home.calculator.title}</h2>
          <p className="section-lead mt-4 max-w-3xl">{home.calculator.intro}</p>
        </div>
        <HomeQuizLazy dictionary={dictionary} locale={locale} />
      </section>
      <section className="home-frame surface-block surface-section">
        <h2 className="section-title">{home.faq.title}</h2>
        <FaqAccordion items={home.faq.items ?? []} />
      </section>
      <section className="home-frame surface-block surface-section">
        <h2 className="section-title max-w-4xl">
          {home.finalCta.title}
        </h2>
        <p className="section-lead mt-4 max-w-4xl">{home.finalCta.text}</p>
        <div className="mt-5 flex w-full min-w-0 max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonAnchor
            href="#quiz"
            variant="primary"
            size="lg"
            className="w-full min-w-0 max-w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {home.finalCta.primary || common.calculateProject}
          </ButtonAnchor>
          <ButtonAnchor
            href={toLocalizedPath(locale, "contact")}
            variant="secondary"
            size="lg"
            className="w-full min-w-0 max-w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {home.finalCta.secondary || common.writeTelegram}
          </ButtonAnchor>
        </div>
        <p className="body-hint mt-4">{home.finalCta.helper ?? ""}</p>
      </section>
    </div>
  );
}
