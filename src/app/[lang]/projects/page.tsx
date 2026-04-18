import { ButtonLink } from "@/components/ui/button";
import { ProjectsModalGrid } from "@/components/projects/projects-modal-grid";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, type Locale } from "@/i18n/locales";
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
  const { seo } = dictionary.projectsPage;
  return localizedPageMetadata(lang, "projects", seo.pageMetaTitle, seo.pageMetaDescription);
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const locale = lang as Locale;
  const dictionary = await getDictionary(lang);
  const page = dictionary.projectsPage;
  const contactHref = toLocalizedPath(locale, "contact");
  const briefHref = `${toLocalizedPath(locale, "")}#quiz`;

  return (
    <div className="page-section-stack min-w-0">
      <section className="surface-block surface-section min-w-0 overflow-x-clip">
        <p className="idea-detail text-neon-line">{page.hero.eyebrow}</p>
        <h1 className="page-hero-title mt-3 max-w-4xl break-words">
          {page.hero.title}
        </h1>
        <p className="page-hero-lead mt-4 max-w-3xl break-words">{page.hero.subtitle}</p>
        <p className="idea-support mt-4 max-w-4xl whitespace-pre-line break-words">{page.hero.body}</p>
        <div className="mt-6 flex w-full min-w-0 max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch">
          <ButtonLink
            href={contactHref}
            variant="primary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {page.hero.primaryCta}
          </ButtonLink>
          <ButtonLink
            href={briefHref}
            variant="secondary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {page.hero.secondaryCta}
          </ButtonLink>
        </div>
        <p className="idea-detail mt-4 max-w-2xl">{page.hero.microLine}</p>
      </section>

      <ProjectsModalGrid dictionary={dictionary} lang={locale} />

      <section className="surface-block surface-section min-w-0 overflow-x-clip">
        <h2 className="page-section-h3 max-w-3xl break-words">
          {page.disclosureBlock.title}
        </h2>
        <p className="idea-support mt-5 max-w-4xl">{page.disclosureBlock.body}</p>
        <ul className="idea-support mt-5 max-w-4xl space-y-2">
          <li>— {page.disclosureBlock.bullet1}</li>
          <li>— {page.disclosureBlock.bullet2}</li>
          <li>— {page.disclosureBlock.bullet3}</li>
        </ul>
        <ButtonLink
          href={contactHref}
          variant="secondary"
          size="md"
          className="mt-6 w-full max-w-full sm:w-fit"
        >
          {page.disclosureBlock.cta}
        </ButtonLink>
      </section>

      <section className="surface-block surface-section min-w-0 overflow-x-clip">
        <h2 className="page-section-h3 max-w-3xl break-words">{page.finalCta.title}</h2>
        <p className="section-lead mt-3 max-w-3xl">{page.finalCta.subtitle}</p>
        <p className="idea-support mt-4 max-w-4xl">{page.finalCta.body}</p>
        <div className="mt-6 flex w-full min-w-0 max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink
            href={contactHref}
            variant="primary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {page.finalCta.primaryCta}
          </ButtonLink>
          <ButtonLink
            href={briefHref}
            variant="secondary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {page.finalCta.secondaryCta}
          </ButtonLink>
        </div>
        <p className="idea-detail mt-4 max-w-2xl">{page.finalCta.microNote}</p>
      </section>
    </div>
  );
}
