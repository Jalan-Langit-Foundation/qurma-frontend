import {
  getPackageByBackendCode,
  toBackendPackageCode,
} from "@/features/packages";
import { buildJourneySteps } from "../lib/journey";
import { calculateProgress } from "../lib/progress";
import type {
  CreateSavingInput,
  DepositRecord,
  Installment,
  Saving,
  SavingLedger,
} from "../lib/types";
import { isYearMonth, type YearMonth } from "../lib/year-month";
import type {
  CreateSavingRequestDto,
  DepositItemDto,
  SavingDepositsDto,
  SavingSummaryDto,
  ScheduleItemDto,
} from "./savings.dto";

function toYearMonth(value: string, field: string): YearMonth {
  if (!isYearMonth(value)) {
    throw new Error(
      `Respons backend tidak valid: ${field} = "${value}" (harus YYYY-MM)`,
    );
  }
  return value;
}

export function toSaving(dto: SavingSummaryDto): Saving {
  const progress = calculateProgress(dto.total_paid, dto.target_amount);

  return {
    id: dto.id,
    packageId: getPackageByBackendCode(dto.package.code)?.id ?? null,
    packageName: dto.package.name,
    programYear: dto.program_year,
    status: dto.status,
    targetAmount: dto.target_amount,
    totalPaid: dto.total_paid,
    remainingAmount: dto.remaining_amount,
    progressPercent: progress.percent,
    tenorMonths: dto.tenor_months,
    startMonth: toYearMonth(dto.start_month, "start_month"),
    endMonth: toYearMonth(dto.end_month, "end_month"),
    monthlyAmount: dto.monthly_amount,
    lastInstallmentAmount: dto.last_installment_amount,
    nextInstallment: dto.next_installment
      ? {
          month: toYearMonth(
            dto.next_installment.month,
            "next_installment.month",
          ),
          amount: dto.next_installment.amount,
        }
      : null,
    journey: buildJourneySteps(dto.journey),
  };
}

export function toInstallment(dto: ScheduleItemDto): Installment {
  return {
    installmentNo: dto.installment_no,
    month: toYearMonth(dto.month, "schedule.month"),
    amount: dto.amount,
    paidAmount: dto.paid_amount,
    remainingAmount: dto.remaining_amount,
    status: dto.status,
    isFinal: dto.is_final,
  };
}

function toDepositRecord(dto: DepositItemDto): DepositRecord {
  return {
    id: dto.id,
    amount: dto.amount,
    paidAt: dto.paid_at,
    note: dto.note,
  };
}

export function toSavingLedger(dto: SavingDepositsDto): SavingLedger {
  return {
    savingId: dto.saving_id,
    targetAmount: dto.target_amount,
    totalPaid: dto.total_paid,
    installments: dto.schedule.map(toInstallment),
    deposits: dto.deposits.map(toDepositRecord),
  };
}

export function toCreateSavingRequest(
  input: CreateSavingInput,
): CreateSavingRequestDto {
  return {
    package_code: toBackendPackageCode(input.packageId),
    start_month: input.startMonth,
    tenor_months: input.tenorMonths,
  };
}
