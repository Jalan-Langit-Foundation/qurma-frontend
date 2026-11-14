import "server-only";
import { cookies } from "next/headers";
import { env } from "@/config/env";
import { SESSION_COOKIE } from "./session-cookie";

const REMEMBER_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export async function getSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value || null;
}

/**
 * Ada cookie sesi atau tidak (tanpa memeriksa ke backend).
 * Cukup untuk tampilan, mis. navbar; keabsahan token tetap dicek backend.
 */
export async function hasSession(): Promise<boolean> {
  return (await getSessionToken()) !== null;
}

export async function setSessionToken(
  token: string,
  { remember }: { remember: boolean },
): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,

    secure: env.siteUrl.startsWith("https://"),
    sameSite: "lax",
    path: "/",
    ...(remember ? { maxAge: REMEMBER_MAX_AGE_SECONDS } : {}),
  });
}

export async function clearSessionToken(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
