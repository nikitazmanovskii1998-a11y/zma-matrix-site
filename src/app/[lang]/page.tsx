import { HomeHero } from "@/components/hero/home-hero";
import { HomeHeroQuotePlate } from "@/components/hero/home-hero-quote-plate";
import { HomeSections } from "@/components/home/home-sections";
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
  const { pageMetaTitle, pageMetaDescription } = dictionary.homeSeo;
  return localizedPageMetadata(lang, "", pageMetaTitle, pageMetaDescription);
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  return (
    <>
      <HomeHero locale={lang} dictionary={dictionary} />
      <div className="mt-6 w-full min-w-0 md:mt-7">
        <HomeHeroQuotePlate dictionary={dictionary} />
      </div>
      <HomeSections locale={lang} dictionary={dictionary} />
    </>
  );
}
