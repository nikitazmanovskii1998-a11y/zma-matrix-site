import type { Locale } from "@/i18n/locales";
import type { SiteDictionary } from "@/i18n/types";
import { MatrixBackground } from "@/components/matrix/matrix-background";
import { PageContainer } from "@/components/layout/page-container";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { CookieBanner } from "@/components/ui/cookie-banner";
import { Preloader } from "@/components/ui/preloader";

type SiteFrameProps = {
  locale: Locale;
  dictionary: SiteDictionary;
  children: React.ReactNode;
};

export function SiteFrame({ locale, dictionary, children }: SiteFrameProps) {
  return (
    <>
      <MatrixBackground />
      <Preloader lines={dictionary.preloader} />
      <div className="relative z-10 flex min-h-screen flex-col">
        <PageContainer>
          <SiteHeader locale={locale} dictionary={dictionary} />
          <div className="mt-5">{children}</div>
          <SiteFooter locale={locale} dictionary={dictionary} />
        </PageContainer>
      </div>
      <CookieBanner
        locale={locale}
        labels={{
          message: dictionary.cookies.message,
          accept: dictionary.cookies.accept,
          decline: dictionary.cookies.decline,
          privacy: dictionary.ui.privacy,
          offer: dictionary.ui.offer,
        }}
      />
    </>
  );
}
