import type { ProgramSchedule } from "@/features/program";
import {
  addMonths,
  compareYearMonth,
  countMonthsInclusive,
  formatYearMonth,
  isYearMonth,
  maxYearMonth,
  type YearMonth,
} from "./year-month";

export interface StartMonthOption {
  value: YearMonth;
  label: string;
  tenorMonths: number;
}

type StartMonthRules = Pick<
  ProgramSchedule,
  "openingMonth" | "lastInstallmentMonth" | "maxTenor"
>;

/**
 * Bulan mulai yang boleh dipilih: tidak sebelum bulan ini & bulan pembukaan,
 * lama menabung tidak melebihi `maxTenor`, dan selesai di bulan cicilan terakhir
 * yang ditetapkan CS QURMA.
 */
export function getStartMonthOptions(
  currentMonth: YearMonth,
  rules: StartMonthRules,
): StartMonthOption[] {
  const end = rules.lastInstallmentMonth;
  const earliestByTenor = addMonths(end, 1 - Math.max(1, rules.maxTenor));
  const options: StartMonthOption[] = [];
  let month = maxYearMonth(
    maxYearMonth(currentMonth, rules.openingMonth),
    earliestByTenor,
  );

  while (compareYearMonth(month, end) <= 0) {
    options.push({
      value: month,
      label: formatYearMonth(month),
      tenorMonths: countMonthsInclusive(month, end),
    });
    month = addMonths(month, 1);
  }

  return options;
}

export function resolveStartMonth(
  requested: string | null | undefined,
  options: StartMonthOption[],
): YearMonth | null {
  if (
    isYearMonth(requested) &&
    options.some((option) => option.value === requested)
  ) {
    return requested;
  }
  return options[0]?.value ?? null;
}

export function toStartMonthSelectOptions(
  options: readonly StartMonthOption[],
  deadline: string,
): { value: YearMonth; label: string }[] {
  return options.map((option) => ({
    value: option.value,
    label: `${option.label} (${option.tenorMonths} bulan s/d ${deadline})`,
  }));
}
