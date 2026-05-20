import { NextRequest, NextResponse } from "next/server";
import {
  defaultLocale,
  getBestLocaleFromAcceptLanguage,
  getLocaleFromPathname,
  isLocale,
  localeCookieName,
  withLocale,
} from "@/lib/i18n/config";

function getPreferredLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  if (isLocale(cookieLocale)) return cookieLocale;

  return getBestLocaleFromAcceptLanguage(request.headers.get("accept-language"));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameLocale = getLocaleFromPathname(pathname);

  // If already has locale prefix, just pass through
  if (pathnameLocale) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-claw-locale", pathnameLocale);
    requestHeaders.set("x-claw-pathname", pathname);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // No locale - redirect to preferred locale
  const locale = getPreferredLocale(request) || defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = withLocale(pathname, locale);

  const response = NextResponse.redirect(url);
  response.cookies.set(localeCookieName, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|llms.txt|.*\\..*).*)",
  ],
};
