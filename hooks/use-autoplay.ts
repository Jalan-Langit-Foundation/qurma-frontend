"use client";

import * as React from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

interface UseAutoPlayOptions {
  totalItems: number;
  intervalMs?: number;
  enabled?: boolean;
}

export function useAutoPlay({
  totalItems,
  intervalMs = 5000,
  enabled = true,
}: UseAutoPlayOptions) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isActive = enabled && totalItems > 1 && !prefersReducedMotion;

  React.useEffect(() => {
    if (!isActive) return;

    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isActive, totalItems, intervalMs]);

  return { currentIndex, setCurrentIndex };
}
