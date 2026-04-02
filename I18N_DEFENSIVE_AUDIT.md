# i18n defensive audit (runtime safety)

## Summary

Hardened the i18n pipeline so missing or partial locale data does not crash the UI. The main lever is **cross-locale deep merge** plus a single **`tightenSiteDictionary`** pass applied in `getDictionary()`, with a few **component-level guards** where arrays or nested modal data are rendered.

## Root causes addressed

| Issue | Mitigation |
|--------|------------|
| RU dictionary returned raw; missing keys stayed `undefined` | `getDictionary` now builds `crossFilled = merge(EN, RU)` so RU inherits EN leaves when RU omits them; EN still uses `merge(crossFilled, EN)` for English wins. |
| `navigationTitle` / `contactsTitle` / `brandLabel` undefined | Already covered by `resolveMobileMenu` + `resolveSiteHeaderCopy`; now also reinforced by cross-merge + `tightenSiteDictionary` (nav/header/lang/mobileMenu). |
| `quiz.progress` → `.replace` on undefined | `resolveQuiz` + `resolveQuizProgressTemplate` + `formatQuizProgress` (4th arg `locale` fills empty template). |
| `validation` undefined on form | `resolveForm` / `resolveFormValidation` unchanged; `tightenSiteDictionary` assigns `form: resolveForm(dictionary)`. |
| `resolveSiteHeaderCopy is not defined` | Historical import issue; header still imports from `@/i18n/fallbacks` (verified). |
| `dictionary.footer` destructuring crash | `resolveFooter()` merges `footerRu` / `footerEn` modules; `SiteFooter` calls `resolveFooter(dictionary)`; tighten also sets `footer`. |
| Deep keys on contact / quiz / ui / common | `resolveContactPage`, `resolveQuiz`, merges with `UI_SHELL`, `COMMON_SHELL` inside `tightenSiteDictionary`. |

## Files changed

- `src/i18n/get-dictionary.ts` — cross-merge + `tightenSiteDictionary`.
- `src/i18n/fallbacks.ts` — `pickNonEmptyString` / `pickNonEmptyArray`, `resolveFooter`, `QUIZ_UI_BASE`, `COMMON_SHELL`, `UI_SHELL`, `CONTACT_PAGE_BASE`, `resolveQuiz`, `resolveContactPage`, `tightenSiteDictionary`, stronger `formatQuizProgress`, `resolveModalCloseLabel` via `UI_SHELL`.
- `src/components/quiz/project-quiz.tsx` — `resolveQuiz(dictionary)`, `formatQuizProgress(..., locale)`.
- `src/components/layout/site-footer.tsx` — `resolveFooter(dictionary)`.
- `src/components/services/services-modal-grid.tsx` — return `null` if no `servicesPage.items`.
- `src/components/projects/projects-modal-grid.tsx` — safe `filters[key]`, safe modal lists/strings, removed unused `modal` destructure.
- `src/components/home/home-sections.tsx` — guard missing `home`, `finalCta.helper ?? ""`.
- `src/components/hero/home-hero.tsx` — guard missing `homeHero`.
- `src/components/content/route-content.tsx` — `dictionary.ui?.placeholderNote ?? ""`.
- `src/components/ui/faq-accordion.tsx` — empty list guard, safe Q/A text, stable keys.

## Fallback copy added (shells)

Duplicated **canonical** RU/EN strings (aligned with current dictionaries) for:

- Quiz UI fields (no `questions`; those always come from the locale pack).
- `common`, full `ui`, full `contactPage`, footer via existing `footer/ru` + `footer/en` modules.

These shells are only used when the loaded tree is missing or empty; they are not intended to replace normal dictionary maintenance or `check-i18n`.

## Helper functions

- **`tightenSiteDictionary`**: one pass after load — nav, header, lang, mobileMenu, form, preloader, footer, quiz, common, ui, contactPage.
- **`resolveQuiz` / `resolveFooter` / `resolveContactPage`**: idempotent; safe if called again in components.

## Verification

- `npx tsc --noEmit` — pass  
- `npm run lint` — pass (warnings only elsewhere if any)  
- `npm run check-i18n` — pass  
- `npm run build` — pass  

## Limits

- Large subtrees (`home`, `servicesPage`, `projectsPage`, legal pages, about/approach) still rely on **deep merge** between EN and RU. If **both** locales drop the same nested key, gaps can remain; `check-i18n` + `satisfies SiteDictionary` are the structural guarantee.
- `tightenSiteDictionary` does not import the full RU dictionary into client bundles; shells are inlined or use small footer modules only.
