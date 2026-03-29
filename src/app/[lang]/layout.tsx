import { notFound } from "next/navigation";
import { SiteFrame } from "@/components/layout/site-frame";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale, locales } from "@/i18n/locales";

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

  return <SiteFrame locale={lang} dictionary={dictionary}>{children}</SiteFrame>;
}
