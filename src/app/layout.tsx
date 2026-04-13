/**
 * Site verification: set env `GOOGLE_SITE_VERIFICATION` and/or `YANDEX_VERIFICATION`
 * to the token from Search Console / Yandex.Webmaster (HTML tag method).
 * Values are read at build/runtime into `metadata.verification` — no hardcoded tokens.
 */
import type { Metadata, Viewport } from "next";
import { Commissioner, Unbounded } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import { defaultLocale } from "@/i18n/locales";
import "./globals.css";

const displayFont = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const secondaryFont = Commissioner({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-secondary",
});

const googleVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const yandexVerification = process.env.YANDEX_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "ZMA Resulting",
  description:
    "Custom websites and digital systems — structure, Telegram, automation, SEO.",
  icons: {
    icon: "/icon.svg",
  },
  ...(googleVerification || yandexVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(yandexVerification ? { yandex: yandexVerification } : {}),
        },
      }
    : {}),
};

/** Lets `env(safe-area-inset-*)` reflect device notches when used with fixed layers. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={defaultLocale}
      className={`${displayFont.variable} ${secondaryFont.variable} h-full antialiased`}
    >
      <body className="min-h-full min-w-0 overflow-x-clip">{children}</body>
    </html>
  );
}
