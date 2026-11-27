export interface SavingProgress {
  collected: number;
  remaining: number;
  percent: number;
  isComplete: boolean;
}

export function calculateProgress(
  totalPaid: number,
  target: number,
): SavingProgress {
  const collected = Math.max(0, Number.isFinite(totalPaid) ? totalPaid : 0);
  const safeTarget = Math.max(0, Number.isFinite(target) ? target : 0);
  const remaining = Math.max(0, safeTarget - collected);
  const percent =
    safeTarget > 0
      ? Math.min(100, Math.floor((collected / safeTarget) * 100))
      : 0;

  return {
    collected,
    remaining,
    percent,
    isComplete: safeTarget > 0 && collected >= safeTarget,
  };
}
