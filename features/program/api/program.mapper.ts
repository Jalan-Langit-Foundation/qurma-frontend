import { mergeApiPackages } from "@/features/packages";
import { FALLBACK_SCHEDULE } from "../lib/fallback";
import type {
  MonthString,
  ProgramInfo,
  ProgramSchedule,
  RegistrationStatus,
} from "../lib/types";
import type { ProgramDto } from "./program.dto";

const DATE_PATTERN = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const MONTH_PATTERN = /^\d{4}-(0[1-9]|1[0-2])$/;

const isDate = (value: unknown): value is string =>
  typeof value === "string" && DATE_PATTERN.test(value);

const isMonth = (value: unknown): value is MonthString =>
  typeof value === "string" && MONTH_PATTERN.test(value);

const isPositiveInt = (value: unknown): value is number =>
  typeof value === "number" && Number.isInteger(value) && value > 0;

/** Nilai dari API yang rusak/kosong diganti cadangan per field, bukan seluruhnya. */
function toProgramSchedule(program: ProgramDto["program"]): ProgramSchedule {
  const fb = FALLBACK_SCHEDULE;
  return {
    openingMonth: isMonth(program.opening_month)
      ? program.opening_month
      : fb.openingMonth,
    lastInstallmentMonth: isMonth(program.last_installment_month)
      ? program.last_installment_month
      : fb.lastInstallmentMonth,
    maxTenor: isPositiveInt(program.max_tenor)
      ? program.max_tenor
      : fb.maxTenor,
    defaultTenor: isPositiveInt(program.default_tenor)
      ? program.default_tenor
      : fb.defaultTenor,
    rounding: isPositiveInt(program.rounding) ? program.rounding : fb.rounding,
    payoffDeadline: isDate(program.payoff_deadline)
      ? program.payoff_deadline
      : fb.payoffDeadline,
    eidAlAdhaDate: isDate(program.idul_adha_date)
      ? program.idul_adha_date
      : fb.eidAlAdhaDate,
    eidAlAdhaIsEstimate:
      typeof program.idul_adha_is_estimate === "boolean"
        ? program.idul_adha_is_estimate
        : fb.eidAlAdhaIsEstimate,
  };
}

function toRegistrationStatus(
  program: ProgramDto["program"],
): RegistrationStatus | null {
  if (typeof program.registration_open !== "boolean") return null;
  if (!isDate(program.registration_deadline)) return null;
  return {
    open: program.registration_open,
    deadline: program.registration_deadline,
  };
}

export function toProgramInfo(dto: ProgramDto): ProgramInfo {
  return {
    packages: mergeApiPackages(dto.program.packages ?? []),
    schedule: toProgramSchedule(dto.program),
    registration: toRegistrationStatus(dto.program),
    source: "api",
  };
}
