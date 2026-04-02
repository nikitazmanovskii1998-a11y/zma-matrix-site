import { ContentBlock } from "@/components/ui/content-block";
import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale } from "@/i18n/locales";
import { notFound } from "next/navigation";

type PageKey =
  | "home"
  | "approach"
  | "projects"
  | "services"
  | "about"
  | "contact"
  | "privacy"
  | "offer";

type RouteContentProps = {
  pageKey: PageKey;
  params: Promise<{ lang: string }>;
  showLegalTodo?: boolean;
};

export async function RouteContent({
  pageKey,
  params,
  showLegalTodo = false,
}: RouteContentProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dictionary = await getDictionary(lang);
  const page = dictionary.pages?.[pageKey] ?? {
    title: pageKey,
    body: "",
  };

  return (
    <ContentBlock
      title={page.title}
      body={page.body}
      note={showLegalTodo ? (dictionary.ui?.placeholderNote ?? "") : undefined}
    />
  );
}
