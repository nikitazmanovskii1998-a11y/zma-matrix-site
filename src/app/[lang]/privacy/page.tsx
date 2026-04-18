import { ButtonLink } from "@/components/ui/button";
import { getDictionary } from "@/i18n/get-dictionary";
import { toLocalizedPath } from "@/lib/locale-path";
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
  const { seo } = dictionary.privacyPage;
  return localizedPageMetadata(lang, "privacy", seo.pageMetaTitle, seo.pageMetaDescription);
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dictionary = await getDictionary(lang);
  const page = dictionary.privacyPage;

  return (
    <div className="page-section-stack min-w-0">
      <section className="surface-block surface-section min-w-0 overflow-x-clip">
        <p className="idea-detail text-neon-line">{page.hero.eyebrow}</p>
        <h1 className="page-hero-title mt-3">{page.hero.title}</h1>
        <p className="page-hero-lead mt-4 max-w-3xl">{page.hero.subtitle}</p>
        <p className="idea-detail mt-4">
          {page.hero.updatedLabel}: {page.hero.updatedValue}
        </p>
        <p className="idea-support mt-5 max-w-4xl whitespace-pre-line">{page.hero.intro}</p>
        <div className="mt-6 flex w-full min-w-0 max-w-full">
          <ButtonLink
            href={toLocalizedPath(lang, "contact")}
            variant="primary"
            size="lg"
            className="w-full max-w-full sm:w-auto sm:max-w-xl"
          >
            {page.hero.contactCtaLabel}
          </ButtonLink>
        </div>
      </section>
      {page.sectionOrder.map((key) => {
        const section = page.sections[key];
        return (
          <section key={key} className="surface-block surface-section">
            <h2 className="page-section-h2">{section.title}</h2>
            <div className="idea-support mt-4 space-y-2.5">
              {section.body ? <p className="whitespace-pre-line">{section.body}</p> : null}
              {section.bullets?.length ? (
                <ul className="list-disc space-y-1.5 pl-5">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </section>
        );
      })}
    </div>
  );
}
