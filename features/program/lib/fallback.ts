import { PROGRAM } from "@/config/program";
import { FALLBACK_PACKAGES } from "@/features/packages";
import type { MonthString, ProgramInfo, ProgramSchedule } from "./types";

export const FALLBACK_SCHEDULE: ProgramSchedule = {
  openingMonth: PROGRAM.openingMonth as MonthString,
  lastInstallmentMonth: PROGRAM.finalPaymentMonth as MonthString,
  maxTenor: 12,
  defaultTenor: 7,
  rounding: 5_000,
  payoffDeadline: PROGRAM.paymentDeadlineDate,
  eidAlAdhaDate: PROGRAM.eidAlAdhaDate,
  eidAlAdhaIsEstimate: !PROGRAM.eidAlAdhaConfirmed,
};

export const FALLBACK_PROGRAM: ProgramInfo = {
  packages: FALLBACK_PACKAGES,
  schedule: FALLBACK_SCHEDULE,
  registration: null,
  source: "fallback",
};
