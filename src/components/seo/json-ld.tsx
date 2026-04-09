import type { Locale } from "@/i18n/locales";
import { getSiteUrl } from "@/lib/site-url";
import type { ServiceSlug } from "@/lib/service-slugs";

function JsonLdPayload({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organization + WebSite for every localized route. */
export function OrganizationAndWebSiteJsonLd({ locale }: { locale: Locale }) {
  const base = getSiteUrl();
  const home = `${base}/${locale}`;
  return (
    <JsonLdPayload
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": `${base}/#organization`,
            name: "ZMA Resulting",
            url: base,
            logo: `${base}/icon.svg`,
          },
          {
            "@type": "WebSite",
            "@id": `${home}/#website`,
            name: "ZMA Resulting",
            url: home,
            inLanguage: locale === "ru" ? "ru-RU" : "en-US",
            publisher: { "@id": `${base}/#organization` },
          },
        ],
      }}
    />
  );
}

type ServiceDetailJsonLdProps = {
  locale: Locale;
  slug: ServiceSlug;
  name: string;
  description: string;
  breadcrumbServicesName: string;
};

export function ServiceDetailJsonLd({
  locale,
  slug,
  name,
  description,
  breadcrumbServicesName,
}: ServiceDetailJsonLdProps) {
  const base = getSiteUrl();
  const servicesUrl = `${base}/${locale}/services`;
  const pageUrl = `${base}/${locale}/services/${slug}`;

  return (
    <JsonLdPayload
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Service",
            "@id": `${pageUrl}/#service`,
            name,
            description,
            url: pageUrl,
            provider: { "@id": `${base}/#organization` },
            areaServed: locale === "ru" ? "RU" : "US",
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}/#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: breadcrumbServicesName,
                item: servicesUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name,
                item: pageUrl,
              },
            ],
          },
        ],
      }}
    />
  );
}
