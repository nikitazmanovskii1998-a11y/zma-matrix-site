import { ServiceDetailJsonLd } from "@/components/seo/json-ld";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, locales, type Locale } from "@/i18n/locales";
import { localizedPageMetadata } from "@/lib/page-metadata";
import { toLocalizedPath } from "@/lib/locale-path";
import { isServiceSlug, serviceSlugs } from "@/lib/service-slugs";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ui/button";

export async function generateStaticParams() {
  return locales.flatMap((lang) => serviceSlugs.map((service) => ({ lang, service })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}): Promise<Metadata> {
  const { lang, service } = await params;
  if (!hasLocale(lang) || !isServiceSlug(service)) {
    return {};
  }
  const dictionary = await getDictionary(lang);
  const detail = dictionary.servicesPage.detailPages.find((item) => item.slug === service);
  if (!detail) {
    return {};
  }
  return localizedPageMetadata(lang, `services/${service}`, detail.metaTitle, detail.metaDescription);
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}) {
  const { lang, service } = await params;

  if (!hasLocale(lang) || !isServiceSlug(service)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  const page = dictionary.servicesPage;
  const detail = page.detailPages.find((item) => item.slug === service);

  if (!detail) {
    notFound();
  }

  return (
    <div className="min-w-0 space-y-6 md:space-y-8">
      <ServiceDetailJsonLd
        locale={lang as Locale}
        slug={service}
        name={detail.title}
        description={detail.subtitle}
        breadcrumbServicesName={dictionary.nav.services}
      />
      <section className="surface-block surface-section min-w-0 overflow-x-clip">
        <p className="idea-detail text-neon-line">{detail.eyebrow}</p>
        <h1 className="page-hero-title mt-2 max-w-5xl break-words">{detail.title}</h1>
        <p className="page-hero-lead mt-4 min-w-0 max-w-4xl break-words">{detail.subtitle}</p>
        <p className="idea-main mt-4 min-w-0 max-w-4xl break-words">{detail.lead}</p>
        <p className="idea-support mt-4 min-w-0 max-w-4xl break-words">{detail.intro}</p>
        <div className="mt-6 flex w-full min-w-0 max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch">
          <ButtonLink
            href={`${toLocalizedPath(lang, "")}#quiz`}
            variant="primary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {detail.primaryCta}
          </ButtonLink>
          <ButtonLink
            href={`/${lang}/contact`}
            variant="secondary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {detail.secondaryCta}
          </ButtonLink>
          <ButtonLink
            href={`/${lang}/services`}
            variant="ghost"
            size="md"
            className="w-full shrink-0 sm:w-auto sm:max-w-xs"
          >
            {page.detailLabels.backToServices}
          </ButtonLink>
        </div>
        <p className="body-hint mt-3 max-w-3xl">{detail.ctaHelper}</p>
      </section>

      <section className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <article className="surface-soft min-w-0 p-5 sm:p-6 md:p-8">
          <h2 className="card-title">{page.detailLabels.whatWeDo}</h2>
          <p className="section-lead mt-3">{detail.whatWeDo}</p>
        </article>
        <article className="surface-soft min-w-0 p-5 sm:p-6 md:p-8">
          <h2 className="card-title">{page.detailLabels.howWeDoIt}</h2>
          <p className="section-lead mt-3">{detail.howWeDoIt}</p>
        </article>
        <article className="surface-soft min-w-0 p-5 sm:p-6 md:p-8">
          <h2 className="card-title">{page.detailLabels.whatClientGets}</h2>
          <p className="section-lead mt-3">{detail.whatClientGets}</p>
        </article>
      </section>

      <section className="surface-block surface-section">
        <h2 className="section-title">{page.detailLabels.whenNeeded}</h2>
        <ul className="mt-4 space-y-2.5">
          {detail.whenNeeded.map((point) => (
            <li key={point} className="section-lead border-l border-neon-line/20 pl-3">
              {point}
            </li>
          ))}
        </ul>
      </section>

      <section className="surface-block surface-section min-w-0 overflow-x-clip">
        <h2 className="section-title">{detail.ctaTitle}</h2>
        <p className="section-lead mt-3 max-w-4xl break-words">{detail.ctaText}</p>
        <div className="mt-5 flex w-full min-w-0 max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch">
          <ButtonLink
            href={`${toLocalizedPath(lang, "")}#quiz`}
            variant="primary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {detail.primaryCta}
          </ButtonLink>
          <ButtonLink
            href={`/${lang}/contact`}
            variant="secondary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {detail.secondaryCta}
          </ButtonLink>
          <ButtonLink
            href={`/${lang}/services`}
            variant="ghost"
            size="md"
            className="w-full shrink-0 sm:w-auto sm:max-w-xs"
          >
            {page.detailLabels.backToServices}
          </ButtonLink>
        </div>
        <p className="body-hint mt-4 max-w-3xl">{detail.ctaHelper}</p>
      </section>
    </div>
  );
}
