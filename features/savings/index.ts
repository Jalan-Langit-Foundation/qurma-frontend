// Aturan program
export { SAVINGS_PROGRAM } from "./lib/program";
export { SAVINGS_POLICY } from "./lib/policy";

// Bulan
export {
  formatMonthShort,
  formatYearMonth,
  formatYearMonthShort,
} from "./lib/year-month";

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
export {
  buildJourneySteps,
  buildJourneyStepsFromStage,
  buildJourneyTimeline,
  type JourneyMilestones,
  type JourneyTimelineStep,
} from "./lib/journey";

// Model domain
export type {
  DepositRecord,
  Installment,
  Saving,
  SavingLedger,
} from "./lib/types";

// Hooks
export { useSavingWindow } from "./hooks/use-saving-window";

// Komponen
export { DepositTable } from "./components/deposit-table";
export { InstallmentStatusBadge } from "./components/installment-status-badge";
export { DepositRecords } from "./components/deposit-records";
export { JourneyTimeline } from "./components/journey-timeline";
