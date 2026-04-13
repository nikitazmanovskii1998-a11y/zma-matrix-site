import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/i18n/locales";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  /* `public/` is served at the site root. A locale prefix would break URLs like
   * `/media/hero/...` (redirect to `/en/media/...` → 404, broken <img>). */
  if (pathname.startsWith("/media/")) {
    return NextResponse.next();
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0];

  const pathnameHasLocale = firstSegment ? hasLocale(firstSegment) : false;

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  /** Always prefix with default locale (RU). No Accept-Language negotiation — see `defaultLocale`. */
  const locale = defaultLocale;
  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
