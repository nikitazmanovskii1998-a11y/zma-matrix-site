"use client";

import Script from "next/script";
import { useCookieConsent } from "@/components/cookies/cookie-consent-context";
import { canLoadAnalytics } from "@/lib/cookies/consent";

function yandexMetrikaInline(counterId: string): string {
  return `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${counterId},"init",{defer:true,clickmap:true,trackLinks:true,accurateTrackBounce:true});`;
}

function ga4InitInline(measurementId: string): string {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{anonymize_ip:true});`;
}

/**
 * Yandex Metrica + GA4 — only when analytics cookies are accepted.
 */
export function AnalyticsScripts() {
  const { consent, ready } = useCookieConsent();
  if (!ready || !canLoadAnalytics(consent)) {
    return null;
  }

  const ym = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID?.trim();
  const ga = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID?.trim();

  return (
    <>
      {ga ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga)}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: ga4InitInline(ga) }}
          />
        </>
      ) : null}
      {ym ? (
        <>
          <Script
            id="yandex-metrika"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{ __html: yandexMetrikaInline(ym) }}
          />
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://mc.yandex.ru/watch/${encodeURIComponent(ym)}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        </>
      ) : null}
    </>
  );
}
