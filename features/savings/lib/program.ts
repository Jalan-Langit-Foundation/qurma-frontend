import { env } from "@/config/env";
import { PROGRAM } from "@/config/program";
import type { YearMonth } from "./year-month";

export const SAVINGS_PROGRAM = {
  programYear: PROGRAM.year,
  hijriLabel: PROGRAM.periodLabel,
  openingMonth: PROGRAM.openingMonth as YearMonth,
  finalPaymentMonth: PROGRAM.finalPaymentMonth as YearMonth,
  roundingUnit: 500,
  maxTenorMonths: 12,
  daysPerMonth: 30,
  dailyRoundingUnit: 500,
} as const;

export const isSavingRegistrationOpen = env.savingRegistrationOpen;
