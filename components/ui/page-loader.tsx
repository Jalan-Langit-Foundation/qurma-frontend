"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";

function PageLoaderContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [shouldRender, setShouldRender] = React.useState(false);

  // Sembunyikan loader saat rute selesai berganti
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      const hideTimer = setTimeout(() => setShouldRender(false), 200);
      return () => clearTimeout(hideTimer);
    }, 180);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // Intersep klik pada link internal untuk memicu loading screen saat berpindah halaman
  React.useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a") as HTMLAnchorElement | null;

      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const targetAttr = anchor.getAttribute("target");

      // Validasi link internal ke halaman berbeda (bukan hash scroll atau external)
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("/#") &&
        targetAttr !== "_blank" &&
        !event.ctrlKey &&
        !event.metaKey &&
        !event.shiftKey &&
        !event.altKey
      ) {
        try {
          const currentUrl = new URL(window.location.href);
          const targetUrl = new URL(anchor.href, window.location.origin);

          // Jika berpindah ke pathname yang berbeda
          if (targetUrl.pathname !== currentUrl.pathname) {
            setShouldRender(true);
            setIsLoading(true);
          }
        } catch {
          // Abaikan jika URL tidak valid
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center bg-white transition-opacity duration-200 pointer-events-auto ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
      aria-label="Memuat halaman..."
      role="status"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        {/* Lingkaran Berputar (Spinner) */}
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-[3px] border-[#EAF5FB] border-t-[#3C95C8] animate-spin" />
        <span className="sr-only">Memuat halaman...</span>
      </div>
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
