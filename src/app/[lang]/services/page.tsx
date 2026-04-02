import { ButtonLink } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale } from "@/i18n/locales";
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
  const { pageMetaTitle, pageMetaDescription } = dictionary.servicesPage.seo;
  return localizedPageMetadata(lang, "services", pageMetaTitle, pageMetaDescription);
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  const page = dictionary.servicesPage;

  return (
    <div className="min-w-0 space-y-6 md:space-y-8">
      <section className="surface-block surface-section">
        <h1 className="page-hero-title max-w-4xl">
          {page.hero}
        </h1>
        <p className="idea-support mt-4 min-w-0 max-w-4xl">{page.intro}</p>
      </section>
      <section className="surface-block surface-section">
        <h2 className="section-title">{page.hubTitle}</h2>
        <p className="section-lead mt-4 min-w-0 max-w-4xl">{page.hubIntro}</p>
        <div className="mt-5 grid min-w-0 gap-4 sm:grid-cols-2">
          {(page.serviceLinks ?? []).map((item) => {
            return (
              <article key={item.slug} className="surface-soft min-w-0 p-5 sm:p-6 md:p-8">
                <h3 className="card-title">{item.title}</h3>
                <p className="section-lead mt-3">{item.summary}</p>
                <ButtonLink
                  href={`/${lang}/services/${item.slug}`}
                  variant="secondary"
                  size="md"
                  className="mt-5"
                >
                  {page.serviceCard?.more ?? ""}
                </ButtonLink>
              </article>
            );
          })}
        </div>
      </section>

      <section className="surface-block surface-section">
        <p className="idea-main min-w-0 max-w-4xl">{page.pricingNote}</p>
        <ButtonLink
          href={`/${lang}/contact#quiz`}
          className="mt-5"
          variant="primary"
          size="lg"
        >
          {page.cta}
        </ButtonLink>
      </section>
    </div>
  );
}
