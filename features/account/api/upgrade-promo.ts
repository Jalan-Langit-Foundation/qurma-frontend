import "server-only";
import { cookies } from "next/headers";
import { env } from "@/config/env";
import { getSessionToken } from "@/lib/server/session";
import { sessionFingerprint } from "@/lib/server/session-fingerprint";

const PROMO_COOKIE = "qurma_upgrade_promo_closed";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

export async function isUpgradePromoDismissed(): Promise<boolean> {
  const [store, token] = await Promise.all([cookies(), getSessionToken()]);
  const value = store.get(PROMO_COOKIE)?.value;
  return Boolean(token && value && value === sessionFingerprint(token));
}

export async function dismissUpgradePromo(): Promise<void> {
  const token = await getSessionToken();
  if (!token) return;
  const store = await cookies();
  store.set(PROMO_COOKIE, sessionFingerprint(token), {
    httpOnly: true,
    secure: env.siteUrl.startsWith("https://"),
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}
