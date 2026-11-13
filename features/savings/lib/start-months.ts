import { SAVINGS_PROGRAM } from "./program";
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

export function getStartMonthOptions(
  currentMonth: YearMonth,
  program: Pick<
    typeof SAVINGS_PROGRAM,
    "openingMonth" | "finalPaymentMonth"
  > = SAVINGS_PROGRAM,
): StartMonthOption[] {
  const options: StartMonthOption[] = [];
  let month = maxYearMonth(currentMonth, program.openingMonth);

  while (compareYearMonth(month, program.finalPaymentMonth) <= 0) {
    options.push({
      value: month,
      label: formatYearMonth(month),
      tenorMonths: countMonthsInclusive(month, program.finalPaymentMonth),
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
