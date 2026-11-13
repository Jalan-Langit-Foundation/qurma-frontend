import { SAVINGS_PROGRAM } from "./program";
import {
  addMonths,
  countMonthsInclusive,
  isYearMonth,
  type YearMonth,
} from "./year-month";

export interface PlannedInstallment {
  installmentNo: number;
  month: YearMonth;
  amount: number;
  isFinal: boolean;
}

export interface InstallmentPlan {
  target: number;
  startMonth: YearMonth;
  endMonth: YearMonth;
  tenorMonths: number;
  monthlyAmount: number;
  lastAmount: number;
  installments: PlannedInstallment[];
}

export type InstallmentPlanError =
  | "invalid_target"
  | "invalid_month"
  | "start_after_deadline"
  | "tenor_too_long"
  | "target_too_small";

const INSTALLMENT_PLAN_ERROR_MESSAGES: Record<InstallmentPlanError, string> = {
  invalid_target: "Target qurban tidak valid.",
  invalid_month: "Bulan mulai tidak valid.",
  start_after_deadline: "Bulan mulai sudah melewati batas pelunasan program.",
  tenor_too_long: "Periode menabung melebihi batas maksimum program.",
  target_too_small: "Target terlalu kecil untuk dibagi ke periode ini.",
};

export type InstallmentPlanResult =
  | { ok: true; plan: InstallmentPlan }
  | { ok: false; error: InstallmentPlanError; message: string };

interface CalculateInstallmentPlanInput {
  target: number;
  startMonth: string;
  endMonth?: YearMonth;
  roundingUnit?: number;
  maxTenorMonths?: number;
}

const failure = (error: InstallmentPlanError): InstallmentPlanResult => ({
  ok: false,
  error,
  message: INSTALLMENT_PLAN_ERROR_MESSAGES[error],
});

export function calculateInstallmentPlan({
  target,
  startMonth,
  endMonth = SAVINGS_PROGRAM.finalPaymentMonth,
  roundingUnit = SAVINGS_PROGRAM.roundingUnit,
  maxTenorMonths = SAVINGS_PROGRAM.maxTenorMonths,
}: CalculateInstallmentPlanInput): InstallmentPlanResult {
  if (!Number.isFinite(target) || target <= 0) return failure("invalid_target");
  if (!isYearMonth(startMonth)) return failure("invalid_month");

  const tenorMonths = countMonthsInclusive(startMonth, endMonth);
  if (tenorMonths <= 0) return failure("start_after_deadline");
  if (tenorMonths > maxTenorMonths) return failure("tenor_too_long");

  const monthlyAmount =
    tenorMonths === 1
      ? target
      : Math.ceil(target / tenorMonths / roundingUnit) * roundingUnit;
  const lastAmount = target - monthlyAmount * (tenorMonths - 1);
  if (lastAmount <= 0) return failure("target_too_small");

  const installments: PlannedInstallment[] = Array.from(
    { length: tenorMonths },
    (_, index) => {
      const isFinal = index === tenorMonths - 1;
      return {
        installmentNo: index + 1,
        month: addMonths(startMonth, index),
        amount: isFinal ? lastAmount : monthlyAmount,
        isFinal,
      };
    },
  );

  return {
    ok: true,
    plan: {
      target,
      startMonth,
      endMonth,
      tenorMonths,
      monthlyAmount,
      lastAmount,
      installments,
    },
  };
}

export function estimateMonthlyAmount(
  target: number,
  startMonth: YearMonth | null,
): number | null {
  if (!startMonth) return null;
  const result = calculateInstallmentPlan({ target, startMonth });
  return result.ok ? result.plan.monthlyAmount : null;
}

export function estimateDailySaving(
  monthlyAmount: number,
  daysPerMonth: number = SAVINGS_PROGRAM.daysPerMonth,
  roundingUnit: number = SAVINGS_PROGRAM.dailyRoundingUnit,
): number {
  if (!Number.isFinite(monthlyAmount) || monthlyAmount <= 0) return 0;
  return Math.round(monthlyAmount / daysPerMonth / roundingUnit) * roundingUnit;
}
