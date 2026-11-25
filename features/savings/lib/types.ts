import type { PackageId } from "@/features/packages";
import type { InstallmentStatus } from "./installment-status";
import type { JourneyStep } from "./journey";
import type { YearMonth } from "./year-month";

export type SavingStatus = "active" | "overdue" | "completed" | "cancelled";

export interface Saving {
  id: number;

  packageId: PackageId | null;
  packageName: string;
  programYear: number;
  status: SavingStatus;
  targetAmount: number;
  totalPaid: number;
  paidThisMonth: number;
  remainingAmount: number;
  progressPercent: number;
  tenorMonths: number;
  startMonth: YearMonth;
  endMonth: YearMonth;
  monthlyAmount: number;
  lastInstallmentAmount: number;
  nextInstallment: { month: YearMonth; amount: number } | null;
  journey: JourneyStep[];
}

export interface Installment {
  installmentNo: number;
  month: YearMonth;
  amount: number;
  paidAmount: number;
  remainingAmount: number;
  status: InstallmentStatus;
  isFinal: boolean;
}

export interface DepositRecord {
  id: number;
  amount: number;
  paidAt: string;
  note: string | null;
}

export interface SavingLedger {
  savingId: number;
  targetAmount: number;
  totalPaid: number;
  installments: Installment[];
  deposits: DepositRecord[];
}

export interface CreateSavingInput {
  packageId: PackageId;
  startMonth: YearMonth;
  tenorMonths: number;
}
