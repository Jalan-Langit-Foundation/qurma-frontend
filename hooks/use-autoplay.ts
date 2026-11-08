import * as React from "react";

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

  React.useEffect(() => {
    if (!enabled || totalItems <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [totalItems, intervalMs, enabled]);

  return {
    currentIndex,
    setCurrentIndex,
  };
}
