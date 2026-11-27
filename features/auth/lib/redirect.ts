import { ROUTES } from "@/config/navigation";

const PARSE_BASE = "http://qurma.invalid";

const BLOCKED_PATHS: readonly string[] = [
  ROUTES.login,
  ROUTES.register,
  ROUTES.sessionExpired,
];

export function getSafeRedirectPath(
  next: string | null | undefined,
  fallback: string = ROUTES.dashboard,
): string {
  if (!next || !next.startsWith("/")) return fallback;

  let url: URL;
  try {
    url = new URL(next, PARSE_BASE);
  } catch {
    return fallback;
  }
  if (url.origin !== PARSE_BASE) return fallback;
  if (BLOCKED_PATHS.includes(url.pathname)) return fallback;

  return `${url.pathname}${url.search}${url.hash}`;
}

export function withNext(path: string, next: string | null): string {
  return next ? `${path}?next=${encodeURIComponent(next)}` : path;
}
