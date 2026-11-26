import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "@/proxy";
import { SESSION_COOKIE } from "@/lib/server/session-cookie";

function request(path: string, withSession = false) {
  const req = new NextRequest(new URL(path, "http://localhost:3000"));
  if (withSession) req.cookies.set(SESSION_COOKIE, "1|token");
  return req;
}

const location = (response: Response) => response.headers.get("location");

describe("proxy", () => {
  it("halaman penabung tanpa sesi → login dengan ?next", () => {
    const response = proxy(request("/tabungan/baru?paket=plus"));
    expect(location(response)).toBe(
      "http://localhost:3000/login?next=%2Ftabungan%2Fbaru%3Fpaket%3Dplus",
    );
  });

  it("halaman penabung dengan sesi → diteruskan", () => {
    const response = proxy(request("/dashboard", true));
    expect(location(response)).toBeNull();
  });

  it("login/register saat sudah masuk → dashboard", () => {
    expect(location(proxy(request("/login", true)))).toBe(
      "http://localhost:3000/dashboard",
    );
    expect(location(proxy(request("/register", true)))).toBe(
      "http://localhost:3000/dashboard",
    );
  });

  it("login tanpa sesi → tampil", () => {
    expect(location(proxy(request("/login")))).toBeNull();
  });

  it.each(["/akun", "/transaksi?page=2"])(
    "halaman member baru %s juga dijaga",
    (path) => {
      expect(location(proxy(request(path)))).toMatch(/\/login\?next=/);
    },
  );
});
