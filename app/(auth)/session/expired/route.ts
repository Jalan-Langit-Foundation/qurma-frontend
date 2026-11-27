import { NextResponse, type NextRequest } from "next/server";
import { ROUTES } from "@/config/navigation";
import { SESSION_COOKIE } from "@/lib/server/session-cookie";

export function GET(request: NextRequest) {
  const loginUrl = new URL(ROUTES.login, request.url);
  loginUrl.searchParams.set("expired", "1");

  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
