import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/layout/site-frame";
import { OrganizationAndWebSiteJsonLd } from "@/components/seo/json-ld";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, locales, type Locale } from "@/i18n/locales";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);

  return (
    <>
      <OrganizationAndWebSiteJsonLd locale={lang as Locale} />
      <SiteFrame locale={lang as Locale} dictionary={dictionary}>
        {children}
      </SiteFrame>
    </>
  );
}
