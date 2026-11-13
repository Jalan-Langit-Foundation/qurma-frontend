import { env } from "@/config/env";
import type { YearMonth } from "./year-month";

export const SAVINGS_PROGRAM = {
  programYear: 2027,
  hijriLabel: "1448 H / 2027 M",
  openingMonth: "2026-10" as YearMonth,
  finalPaymentMonth: "2027-04" as YearMonth,
  roundingUnit: 500,
  maxTenorMonths: 12,
  daysPerMonth: 30,
  dailyRoundingUnit: 500,
} as const;

export const isSavingRegistrationOpen = env.savingRegistrationOpen;
