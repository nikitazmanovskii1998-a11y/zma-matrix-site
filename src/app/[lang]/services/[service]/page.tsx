import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, locales } from "@/i18n/locales";
import { localizedPageMetadata } from "@/lib/page-metadata";
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
      <section className="surface-block surface-section">
        <h1 className="page-hero-title max-w-5xl">{detail.title}</h1>
        <p className="section-lead mt-5 min-w-0 max-w-4xl">{detail.subtitle}</p>
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

      <section className="surface-block surface-section">
        <h3 className="card-title">{detail.ctaTitle}</h3>
        <p className="section-lead mt-3">{detail.ctaText}</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`/${lang}/contact#quiz`} variant="primary" size="lg" className="w-full sm:w-auto">
            {detail.primaryCta}
          </ButtonLink>
          <ButtonLink href={`/${lang}/contact`} variant="secondary" size="lg" className="w-full sm:w-auto">
            {detail.secondaryCta}
          </ButtonLink>
          <ButtonLink href={`/${lang}/services`} variant="ghost" size="md" className="w-full sm:w-auto">
            {page.detailLabels.backToServices}
          </ButtonLink>
        </div>
        <p className="body-hint mt-4">{detail.ctaHelper}</p>
      </section>
    </div>
  );
}
