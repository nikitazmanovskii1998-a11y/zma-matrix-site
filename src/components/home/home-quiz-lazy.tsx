"use client";

import dynamic from "next/dynamic";
import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";

const ProjectQuiz = dynamic(
  () => import("@/components/quiz/project-quiz").then((m) => ({ default: m.ProjectQuiz })),
  {
    ssr: false,
    loading: () => (
      <div className="surface-block surface-section py-10 text-center text-sm text-text-muted-soft">
        …
      </div>
    ),
  },
);

type HomeQuizLazyProps = {
  dictionary: SiteDictionary;
  locale: Locale;
};

/** Client-only lazy bundle for the project brief (below the fold on home). */
export function HomeQuizLazy({ dictionary, locale }: HomeQuizLazyProps) {
  return <ProjectQuiz dictionary={dictionary} locale={locale} />;
}
