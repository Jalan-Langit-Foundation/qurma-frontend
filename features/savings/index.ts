// Aturan program
export { isSavingRegistrationOpen, SAVINGS_PROGRAM } from "./lib/program";
export { PAYMENT_DEADLINE } from "./lib/payment-deadline";
export { SAVINGS_POLICY } from "./lib/policy";

// Bulan
export { formatYearMonth, formatYearMonthShort } from "./lib/year-month";

// Perhitungan
export {
  calculateDepositPlan,
  estimateDepositAmounts,
  resolveDepositCount,
  type DepositCount,
  type DepositPlan,
} from "./lib/deposit-plan";

// Status & perjalanan
export type { InstallmentStatus } from "./lib/installment-status";
export { getSavingStatus, type SavingStatusTone } from "./lib/saving-status";
export { buildJourneyStepsFromStage } from "./lib/journey";

// Model domain
export type { Installment, Saving, SavingLedger } from "./lib/types";

// Hooks
export { useSavingWindow } from "./hooks/use-saving-window";

// Komponen
export { DepositTable } from "./components/deposit-table";
export { InstallmentStatusBadge } from "./components/installment-status-badge";
export {
  JourneyChecklist,
  type ChecklistStep,
} from "./components/journey-checklist";
export { DepositRecords } from "./components/deposit-records";
