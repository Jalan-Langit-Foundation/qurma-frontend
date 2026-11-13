import { NextResponse, type NextRequest } from "next/server";
import { ROUTES } from "@/config/navigation";
import { SESSION_COOKIE } from "@/lib/server/session-cookie";

/**
 * Dituju saat token ditolak backend (401) atau cookie sesi tidak ada.
 * Server Component tidak boleh menghapus cookie, jadi dilakukan di sini,
 * lalu pengguna diarahkan ke halaman login dengan pesan "sesi berakhir".
 */
export function GET(request: NextRequest) {
  const loginUrl = new URL(ROUTES.login, request.url);
  loginUrl.searchParams.set("expired", "1");

  const response = NextResponse.redirect(loginUrl);
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
