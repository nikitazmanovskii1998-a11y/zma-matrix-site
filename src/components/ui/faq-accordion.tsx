"use client";

import { useState } from "react";

type FaqAccordionProps = {
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export function FaqAccordion({ items }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) {
    return null;
  }

  return (
    <div className="mt-4 grid min-w-0 gap-2 sm:gap-2.5">
      {items.map((item, index) => {
        const isOpen = index === activeIndex;
        const q = item?.question ?? "";
        const a = item?.answer ?? "";
        return (
          <article
            key={`faq-${index}-${q.slice(0, 24)}`}
            className={["faq-item surface-soft", isOpen ? "is-open" : ""].join(" ")}
          >
            <button
              type="button"
              className="faq-trigger"
              aria-expanded={isOpen}
              onClick={() => setActiveIndex(isOpen ? -1 : index)}
            >
              <span className="faq-question">{q}</span>
              <span className={["faq-icon", isOpen ? "is-open" : ""].join(" ")} aria-hidden="true">
                +
              </span>
            </button>
            <div className={["faq-panel", isOpen ? "is-open" : ""].join(" ")}>
              <p className="faq-answer">{a}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
