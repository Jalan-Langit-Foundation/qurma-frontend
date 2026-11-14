import { ROUTES } from "@/config/navigation";

export function getSafeRedirectPath(
  next: string | null | undefined,
  fallback: string = ROUTES.dashboard,
): string {
  if (!next) return fallback;
  if (
    !next.startsWith("/") ||
    next.startsWith("//") ||
    next.startsWith("/\\")
  ) {
    return fallback;
  }

  const pathname = next.split(/[?#]/)[0];
  if (
    pathname === ROUTES.login ||
    pathname === ROUTES.register ||
    pathname === ROUTES.sessionExpired
  ) {
    return fallback;
  }
  return next;
}

export function withNext(path: string, next: string | null): string {
  return next ? `${path}?next=${encodeURIComponent(next)}` : path;
}
