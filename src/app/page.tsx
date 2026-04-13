import { redirect } from "next/navigation";

/**
 * Root must always open Russian home — literal path (not inferred) so production
 * cannot drift to /en from stale bundles, hosting i18n defaults, or Accept-Language.
 * Keep in sync with `defaultLocale` in `@/i18n/locales` and `src/proxy.ts`.
 */
const ROOT_HOME = "/ru";

export default function Home() {
  redirect(ROOT_HOME);
}
