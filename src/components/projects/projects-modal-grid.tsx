"use client";

import { useState } from "react";
import { DialogModal } from "@/components/ui/dialog-modal";
import { Button, ButtonLink } from "@/components/ui/button";
import { resolveModalCloseLabel } from "@/i18n/fallbacks";
import type { SiteDictionary } from "@/i18n/types";
import type { Locale } from "@/i18n/locales";
import { toLocalizedPath } from "@/lib/locale-path";

type ProjectsModalGridProps = {
  dictionary: SiteDictionary;
  lang: Locale;
};

type ProjectFilter = SiteDictionary["projectsPage"]["filterOrder"][number] | "all";

export function ProjectsModalGrid({ dictionary, lang }: ProjectsModalGridProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const page = dictionary.projectsPage;
  if (!page?.filters?.all || !page.filterOrder?.length) {
    return null;
  }
  const cards = page.cards ?? [];
  const active = activeIndex === null ? null : cards[activeIndex] ?? null;
  const closeLabel = resolveModalCloseLabel(dictionary);
  const contactHref = toLocalizedPath(lang, "contact");
  const briefHref = `${toLocalizedPath(lang, "")}#quiz`;

  return (
    <>
      <section className="surface-block surface-section min-w-0">
        <div className="flex min-w-0 max-w-full flex-wrap gap-2">
          {page.filterOrder.map((key) => {
            const filterKey: ProjectFilter = key;
            const bucket = page.filters[key] ?? page.filters.all;
            const { label, shortHint } = bucket;
            const selected = activeFilter === filterKey;
            return (
              <button
                key={key}
                type="button"
                title={shortHint}
                aria-pressed={selected}
                onClick={() => setActiveFilter(filterKey)}
                className={
                  selected
                    ? "surface-soft idea-detail px-3 py-1.5 ring-1 ring-neon-line/60"
                    : "surface-soft idea-detail px-3 py-1.5"
                }
              >
                {label}
              </button>
            );
          })}
        </div>
        <p className="idea-detail mt-3 max-w-3xl md:hidden">
          {(page.filters[activeFilter] ?? page.filters.all).shortHint}
        </p>
      </section>

      <section className="grid min-w-0 gap-3 sm:grid-cols-2">
        {cards.map((entry, index) => {
          const { card } = entry;
          const visible = activeFilter === "all" || card.filterKey === activeFilter;
          if (!visible) return null;

          return (
            <article
              key={card.slug}
              title={card.hoverLine}
              className="surface-block surface-section group min-w-0"
            >
              <p className="idea-detail text-neon-line">{card.category}</p>
              <p className="idea-detail mt-1">{card.status}</p>
              <h2 className="card-title mt-2">{card.title}</h2>
              <p className="idea-main mt-2">{card.subtitle}</p>
              <p className="idea-support mt-3">{card.shortDescription}</p>
              <p className="idea-detail mt-3 opacity-0 transition-opacity group-hover:opacity-100 md:opacity-100">
                {card.hoverLine}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="surface-soft idea-detail px-2.5 py-1 text-xs">{card.badge1}</span>
                <span className="surface-soft idea-detail px-2.5 py-1 text-xs">{card.badge2}</span>
                <span className="surface-soft idea-detail px-2.5 py-1 text-xs">{card.badge3}</span>
              </div>
              <Button
                onClick={() => setActiveIndex(index)}
                variant="primary"
                size="md"
                className="mt-5"
              >
                {card.openLabel}
              </Button>
            </article>
          );
        })}
      </section>

      <DialogModal
        open={Boolean(active)}
        onClose={() => setActiveIndex(null)}
        title={active?.modal.title ?? ""}
        closeLabel={closeLabel}
      >
        {active ? (
          <div className="project-detail-modal min-w-0 overflow-x-hidden pr-1 sm:pr-2">
            {/*
              Unified narrative (same for every card): format label → descriptor →
              business fit → friction → solution type → what is assembled → outcome (logic) →
              what the client receives → closing line → CTAs.
            */}
            <header className="project-detail-modal__lead">
              <p className="idea-detail text-neon-line">{active.modal.eyebrow ?? ""}</p>
              <p className="idea-main mt-2.5 max-w-[62ch] text-pretty leading-snug">
                {active.modal.intro ?? ""}
              </p>
            </header>

            <section
              className="project-detail-modal__section"
              aria-labelledby={`pd-${active.card.slug}-fit`}
            >
              <h4 className="project-detail-modal__h" id={`pd-${active.card.slug}-fit`}>
                {active.modal.fitTitle ?? ""}
              </h4>
              <p className="project-detail-modal__body">{active.modal.fitText ?? ""}</p>
            </section>

            <section
              className="project-detail-modal__section"
              aria-labelledby={`pd-${active.card.slug}-problem`}
            >
              <h4 className="project-detail-modal__h" id={`pd-${active.card.slug}-problem`}>
                {active.modal.problemTitle ?? ""}
              </h4>
              <p className="project-detail-modal__body">{active.modal.problemText ?? ""}</p>
            </section>

            <section
              className="project-detail-modal__section"
              aria-labelledby={`pd-${active.card.slug}-solution`}
            >
              <h4 className="project-detail-modal__h" id={`pd-${active.card.slug}-solution`}>
                {active.modal.solutionTitle ?? ""}
              </h4>
              <ul className="project-detail-modal__list">
                {(active.modal.solutionItems ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section
              className="project-detail-modal__section"
              aria-labelledby={`pd-${active.card.slug}-arch`}
            >
              <h4 className="project-detail-modal__h" id={`pd-${active.card.slug}-arch`}>
                {active.modal.architectureTitle ?? ""}
              </h4>
              <ul className="project-detail-modal__list">
                {(active.modal.architectureItems ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section
              className="project-detail-modal__outcome"
              aria-labelledby={`pd-${active.card.slug}-outcome`}
            >
              <h4 className="project-detail-modal__h" id={`pd-${active.card.slug}-outcome`}>
                {active.modal.effectTitle ?? ""}
              </h4>
              <p className="project-detail-modal__body">{active.modal.effectText ?? ""}</p>
            </section>

            <section
              className="project-detail-modal__section"
              aria-labelledby={`pd-${active.card.slug}-deliver`}
            >
              <h4 className="project-detail-modal__h" id={`pd-${active.card.slug}-deliver`}>
                {active.modal.deliverablesTitle ?? ""}
              </h4>
              <ul className="project-detail-modal__list">
                {(active.modal.deliverablesItems ?? []).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            {active.modal.note ? (
              <p className="project-detail-modal__note">{active.modal.note}</p>
            ) : null}

            <div className="project-detail-modal__cta">
              <ButtonLink href={contactHref} variant="primary" size="md">
                {active.modal.ctaPrimary ?? ""}
              </ButtonLink>
              <ButtonLink href={briefHref} variant="secondary" size="md">
                {active.modal.ctaSecondary ?? ""}
              </ButtonLink>
            </div>
          </div>
        ) : null}
      </DialogModal>
    </>
  );
}
