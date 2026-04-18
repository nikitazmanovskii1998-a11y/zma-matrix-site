import { resolvePreloaderLines } from "@/i18n/fallbacks";
import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import { toLocalizedPath } from "@/lib/locale-path";
import { MatrixBackground } from "@/components/matrix/matrix-background";
import { PageContainer } from "@/components/layout/page-container";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieConsentProvider } from "@/components/cookies/cookie-consent-provider";
import { Preloader } from "@/components/ui/preloader";
import { SiteFrameChrome } from "@/components/seo/site-frame-chrome";
import { FixedBottomActions } from "@/components/layout/fixed-bottom-actions";

type SiteFrameProps = {
  locale: Locale;
  dictionary: SiteDictionary;
  children: React.ReactNode;
};

export async function SiteFrame({ locale, dictionary, children }: SiteFrameProps) {
  const preloaderLines = resolvePreloaderLines(dictionary);

  return (
    <CookieConsentProvider
      locale={locale}
      copy={dictionary.cookieConsent}
      privacyHref={toLocalizedPath(locale, "privacy")}
      offerHref={toLocalizedPath(locale, "offer")}
      privacyLabel={dictionary.ui.privacy}
      offerLabel={dictionary.ui.offer}
    >
      <SiteFrameChrome />
      <MatrixBackground />
      <Preloader lines={preloaderLines} />
      <div className="relative z-10 flex min-h-screen min-w-0 flex-col overflow-x-clip">
        <PageContainer>
          <SiteHeader locale={locale} dictionary={dictionary} />
          <div className="mt-5 w-full min-w-0 flex-1">{children}</div>
          <SiteFooter locale={locale} dictionary={dictionary} />
        </PageContainer>
        <FixedBottomActions
          locale={locale}
          contactsLabel={dictionary.ui.fixedDockContacts}
          briefLabel={dictionary.ui.fixedDockBrief}
        />
      </div>
    </CookieConsentProvider>
  );
}
