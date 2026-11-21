import { SAVINGS_PROGRAM } from "./program";

export type DepositCount = (typeof SAVINGS_PROGRAM.depositCountOptions)[number];

export interface DepositPlan {
  target: number;
  depositCount: number;

  depositAmount: number;

  lastAmount: number;
  deposits: number[];
}

function isDepositCount(value: unknown): value is DepositCount {
  return (SAVINGS_PROGRAM.depositCountOptions as readonly unknown[]).includes(
    value,
  );
}

export function resolveDepositCount(
  value: string | null | undefined,
): DepositCount {
  const parsed = Number(value);
  return isDepositCount(parsed) ? parsed : SAVINGS_PROGRAM.defaultDepositCount;
}

export function calculateDepositPlan(
  target: number,
  depositCount: number,
  roundingUnit: number = SAVINGS_PROGRAM.depositRoundingUnit,
): DepositPlan | null {
  if (!Number.isFinite(target) || target <= 0) return null;
  if (!Number.isInteger(depositCount) || depositCount < 1) return null;
  if (!Number.isFinite(roundingUnit) || roundingUnit <= 0) return null;

  const depositAmount =
    depositCount === 1
      ? target
      : Math.ceil(target / depositCount / roundingUnit) * roundingUnit;
  const lastAmount = target - depositAmount * (depositCount - 1);
  if (lastAmount <= 0) return null;

  return {
    target,
    depositCount,
    depositAmount,
    lastAmount,
    deposits: Array.from({ length: depositCount }, (_, index) =>
      index === depositCount - 1 ? lastAmount : depositAmount,
    ),
  };
}

export function estimateDepositAmounts(
  packages: readonly { id: string; target: number }[],
  depositCount: number,
): Record<string, number | null> {
  return Object.fromEntries(
    packages.map((pkg) => [
      pkg.id,
      calculateDepositPlan(pkg.target, depositCount)?.depositAmount ?? null,
    ]),
  );
}
