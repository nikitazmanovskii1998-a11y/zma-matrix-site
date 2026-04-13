import { SimpleContactForm } from "@/components/contact/simple-contact-form";
import { ButtonAnchor, ButtonLink } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale } from "@/i18n/locales";
import { localizedPageMetadata } from "@/lib/page-metadata";
import { toLocalizedPath } from "@/lib/locale-path";
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
  const { pageMetaTitle, pageMetaDescription } = dictionary.contactPage.seo;
  return localizedPageMetadata(lang, "contact", pageMetaTitle, pageMetaDescription);
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  const page = dictionary.contactPage;

  return (
    <div className="min-w-0 space-y-6 md:space-y-8">
      <section className="surface-block surface-section min-w-0 overflow-x-clip">
        <h1 className="page-hero-title max-w-4xl break-words">
          {page.hero}
        </h1>
        <p className="page-hero-lead mt-4 min-w-0 max-w-4xl break-words">{page.heroLead}</p>
        <p className="idea-support mt-4 min-w-0 max-w-4xl break-words">{page.intro}</p>
        <div className="mt-6 flex w-full min-w-0 max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch">
          <ButtonLink
            href={`${toLocalizedPath(lang, "")}#quiz`}
            variant="primary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-md"
          >
            {page.quizCta}
          </ButtonLink>
          <ButtonAnchor
            href="https://t.me/zma_resulting"
            variant="secondary"
            size="lg"
            className="w-full shrink-0 sm:w-auto sm:max-w-xs"
          >
            {page.directWrite}
          </ButtonAnchor>
        </div>
      </section>
      <section className="grid min-w-0 gap-6 sm:grid-cols-2">
        <div className="surface-block surface-section">
          <h2 className="page-section-h3">{page.contactsTitle}</h2>
          <div className="mt-4 space-y-3">
            {page.contacts.map((item) => (
              <div key={item.label} className="surface-soft min-w-0 px-5 py-4">
                <p className="idea-detail">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="idea-main mt-2 inline-block">
                    {item.value}
                  </a>
                ) : (
                  <p className="idea-main mt-2">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          id="contact-form"
          className="surface-block surface-section min-w-0 scroll-mt-24 overflow-x-clip md:scroll-mt-28"
        >
          <p className="idea-support mb-4 max-w-full min-w-0 break-words sm:max-w-xl">{page.helper}</p>
          <SimpleContactForm dictionary={dictionary} title={page.formTitle} />
          <div className="mt-5 flex w-full min-w-0 max-w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href={`${toLocalizedPath(lang, "contact")}#contact-form`}
              variant="secondary"
              size="md"
              className="w-full shrink-0 sm:w-auto sm:max-w-md"
            >
              {page.formTitle}
            </ButtonLink>
            <ButtonAnchor
              href="https://t.me/zma_resulting"
              variant="ghost"
              size="md"
              className="w-full shrink-0 sm:w-auto sm:max-w-xs"
            >
              {page.directWrite}
            </ButtonAnchor>
          </div>
        </div>
      </section>
      <section className="surface-block surface-section">
        <h2 className="page-section-h3">{page.requisitesTitle}</h2>
        <div className="idea-support mt-5 grid gap-2">
          <p>{page.requisites.name}</p>
          <p>ИНН: {page.requisites.inn}</p>
          <p>ОГРНИП: {page.requisites.ogrnip}</p>
        </div>
      </section>
    </div>
  );
}
