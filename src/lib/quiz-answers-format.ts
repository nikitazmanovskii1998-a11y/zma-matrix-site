import type { QuizQuestion } from "@/i18n/types";

type Answers = Record<string, string | string[]>;

/**
 * Non-contact quiz answers + optional contact comment for the lead “Комментарий” block.
 */
export function formatQuizAnswersForLead(questions: QuizQuestion[], answers: Answers): string {
  const lines: string[] = [];
  for (const q of questions) {
    if (q.id === "contacts") continue;
    const v = answers[q.id];
    if (q.allowMultiple) {
      if (Array.isArray(v) && v.length > 0) {
        lines.push(`— ${q.question}: ${v.join(", ")}`);
      }
    } else if (typeof v === "string" && v.trim()) {
      lines.push(`— ${q.question}: ${v.trim()}`);
    }
  }
  const userComment =
    typeof answers["contacts.comment"] === "string" ? answers["contacts.comment"].trim() : "";
  const briefBlock = lines.length > 0 ? ["Бриф:", ...lines].join("\n") : "";
  if (briefBlock && userComment) return `${briefBlock}\n\n${userComment}`;
  if (userComment) return userComment;
  return briefBlock || "—";
}

/** Primary “service” line from quiz — first need answer. */
export function quizServiceLine(answers: Answers): string {
  const need = answers.need;
  return typeof need === "string" && need.trim() ? need.trim() : "—";
}
