"use client";

import { useState } from "react";
import { DialogModal } from "@/components/ui/dialog-modal";
import { Button } from "@/components/ui/button";
import { resolveModalCloseLabel } from "@/i18n/fallbacks";
import type { SiteDictionary } from "@/i18n/types";

type ServicesModalGridProps = {
  dictionary: SiteDictionary;
};

export function ServicesModalGrid({ dictionary }: ServicesModalGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const page = dictionary.servicesPage;
  if (!page?.items?.length) {
    return null;
  }
  const items = page.items;
  const active = activeIndex === null ? null : items[activeIndex] ?? null;
  const closeLabel = resolveModalCloseLabel(dictionary);
  const moreLabel = page?.serviceCard?.more ?? (dictionary.localeLabel === "RU" ? "Ознакомиться" : "Explore");

  return (
    <>
      <section className="grid min-w-0 gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <article key={item.title} className="surface-block surface-section min-w-0">
            <h2 className="card-title">{item.title}</h2>
            <p className="idea-main mt-3">{item.solves}</p>
            <Button
              onClick={() => setActiveIndex(index)}
              variant="primary"
              size="md"
              className="mt-5"
            >
              {moreLabel}
            </Button>
          </article>
        ))}
      </section>

      <DialogModal
        open={Boolean(active)}
        onClose={() => setActiveIndex(null)}
        title={active?.title ?? ""}
        closeLabel={closeLabel}
      >
        {active ? (
          <div className="space-y-4">
            <p className="idea-main">{active.solves}</p>
            <p className="idea-support">{active.included}</p>
            <p className="idea-support">{active.forWhom}</p>
            <p className="idea-main">{active.changes}</p>
          </div>
        ) : null}
      </DialogModal>
    </>
  );
}
