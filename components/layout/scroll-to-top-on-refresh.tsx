"use client";

import * as React from "react";

/** Mengembalikan posisi halaman ke atas ketika browser melakukan refresh. */
export function ScrollToTopOnRefresh() {
  React.useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined;

    if (navigation?.type !== "reload") return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const frame = window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return null;
}
