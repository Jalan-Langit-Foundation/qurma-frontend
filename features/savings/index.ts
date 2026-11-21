// Aturan program
export { isSavingRegistrationOpen, SAVINGS_PROGRAM } from "./lib/program";
export { PAYMENT_DEADLINE } from "./lib/payment-deadline";
export { SAVINGS_POLICY } from "./lib/policy";

// Bulan
export { formatYearMonth, formatYearMonthShort } from "./lib/year-month";

// Perhitungan
export {
  calculateDepositPlan,
  resolveDepositCount,
  type DepositCount,
  type DepositPlan,
} from "./lib/deposit-plan";

// Status & perjalanan
export type { InstallmentStatus } from "./lib/installment-status";
export { getSavingStatus, type SavingStatusTone } from "./lib/saving-status";
export { buildJourneyStepsFromStage, type JourneyStep } from "./lib/journey";

// Model domain
export type {
  CreateSavingInput,
  DepositRecord,
  Installment,
  Saving,
  SavingLedger,
  SavingStatus,
  UpgradeOption,
  UpgradeOptions,
} from "./lib/types";

// Hooks
export { useSavingWindow } from "./hooks/use-saving-window";

// Komponen
export {
  DepositTable,
  type DepositTableProps,
} from "./components/deposit-table";
export {
  InstallmentStatusBadge,
  type InstallmentStatusBadgeProps,
} from "./components/installment-status-badge";
export {
  JourneyChecklist,
  type ChecklistStep,
  type JourneyChecklistProps,
} from "./components/journey-checklist";
export { DepositRecords } from "./components/deposit-records";
