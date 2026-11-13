import { NextResponse, type NextRequest } from "next/server";
import {
  GUEST_ONLY_ROUTES,
  PROTECTED_ROUTE_PREFIXES,
  ROUTES,
} from "@/config/navigation";
import { SESSION_COOKIE } from "@/lib/server/session-cookie";

const isProtected = (pathname: string) =>
  PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );

const isGuestOnly = (pathname: string) =>
  (GUEST_ONLY_ROUTES as readonly string[]).includes(pathname);

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hasSession = request.cookies.has(SESSION_COOKIE);

  if (isProtected(pathname) && !hasSession) {
    const loginUrl = new URL(ROUTES.login, request.url);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (isGuestOnly(pathname) && hasSession) {
    return NextResponse.redirect(new URL(ROUTES.dashboard, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/tabungan/:path*",
    "/qurban/:path*",
    "/report/:path*",
    "/login",
    "/register",
  ],
};
