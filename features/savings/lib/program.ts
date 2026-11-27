import { PROGRAM } from "@/config/program";

export const SAVINGS_PROGRAM = {
  programYear: PROGRAM.year,
  hijriLabel: PROGRAM.periodLabel,
  daysPerMonth: 30,
  dailyRoundingUnit: 500,
  minDepositAmount: 100_000,
  depositCountOptions: [2, 3, 4, 5, 6],
  defaultDepositCount: 6,
  depositRoundingUnit: 5_000,
} as const;
