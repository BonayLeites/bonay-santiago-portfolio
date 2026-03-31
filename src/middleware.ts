import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "./lib/pin-auth";

const intlMiddleware = createMiddleware(routing);

const localeGroup = routing.locales.join("|");
const PRIVATE_ROUTE_PATTERN = new RegExp(`^/(${localeGroup})/private(?!/login)`);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = PRIVATE_ROUTE_PATTERN.exec(pathname);

  if (match) {
    const locale = match[1];
    const token = request.cookies.get(COOKIE_NAME)?.value;
    const pin = process.env.PRIVATE_PIN;

    if (!token || !pin || !(await verifyToken(token, pin))) {
      const loginUrl = new URL(`/${locale}/private/login`, request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|icon|apple-icon|manifest|.*\\..*).*)"],
};
