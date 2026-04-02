import { HomeHero } from "@/components/hero/home-hero";
import { HomeBootReveal } from "@/components/home/home-boot-reveal";
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
      <HomeBootReveal>
        <HomeHero locale={lang} dictionary={dictionary} />
      </HomeBootReveal>
      <HomeSections locale={lang} dictionary={dictionary} />
    </>
  );
}
