"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const SHOW_DELAY_MS = 150;

const SAFETY_TIMEOUT_MS = 10_000;

function isInternalPageNavigation(event: MouseEvent): boolean {
  if (event.button !== 0) return false;
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
    return false;

  const anchor = (event.target as HTMLElement | null)?.closest("a");
  if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download"))
    return false;

  const href = anchor.getAttribute("href");
  if (!href || !href.startsWith("/") || href.startsWith("/#")) return false;

  try {
    const target = new URL(anchor.href, window.location.origin);
    return (
      target.origin === window.location.origin &&
      target.pathname !== window.location.pathname
    );
  } catch {
    return false;
  }
}

function PageLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const routeKey = `${pathname}?${searchParams.toString()}`;

  const [prevRouteKey, setPrevRouteKey] = React.useState(routeKey);
  const [isMounted, setIsMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const timersRef = React.useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = React.useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  if (prevRouteKey !== routeKey) {
    setPrevRouteKey(routeKey);
    setIsVisible(false);
  }

  React.useEffect(() => clearTimers, [routeKey, clearTimers]);

  React.useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!isInternalPageNavigation(event)) return;

      clearTimers();
      timersRef.current.push(
        setTimeout(() => {
          setIsMounted(true);
          setIsVisible(true);
        }, SHOW_DELAY_MS),
        setTimeout(() => setIsVisible(false), SAFETY_TIMEOUT_MS),
      );
    };

    document.addEventListener("click", handleClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleClick, { capture: true });
      clearTimers();
    };
  }, [clearTimers]);

  if (!isMounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      onTransitionEnd={() => {
        if (!isVisible) setIsMounted(false);
      }}
      className={cn(
        "fixed inset-0 z-[99999] flex items-center justify-center bg-white transition-opacity duration-200",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-brand-soft border-t-brand sm:h-10 sm:w-10" />
      <span className="sr-only">Memuat halaman…</span>
    </div>
  );
}

export function PageLoader() {
  return (
    <React.Suspense fallback={null}>
      <PageLoaderContent />
    </React.Suspense>
  );
}
