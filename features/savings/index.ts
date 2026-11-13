/**
 * Public API fitur tabungan yang aman dipakai di Client & Server Component.
 * Fungsi yang memanggil backend (butuh sesi) ada di "@/features/savings/server".
 * Helper internal diimpor langsung dari file-nya oleh kode di dalam fitur & unit test.
 */

// Aturan program
export { isSavingRegistrationOpen, SAVINGS_PROGRAM } from "./lib/program";

// Bulan
export { formatYearMonth, type YearMonth } from "./lib/year-month";
export type { StartMonthOption } from "./lib/start-months";

// Perhitungan
export {
  estimateMonthlyAmount,
  type InstallmentPlan,
} from "./lib/installment-plan";

// Status & perjalanan
export type { InstallmentStatus } from "./lib/installment-status";
export { buildJourneyStepsFromStage, type JourneyStep } from "./lib/journey";

// Model domain
export type {
  CreateSavingInput,
  DepositRecord,
  Installment,
  Saving,
  SavingLedger,
  SavingStatus,
} from "./lib/types";

// Hooks
export {
  useSavingSimulation,
  type SavingSimulationState,
} from "./hooks/use-saving-simulation";

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
export { SavingSummaryCard } from "./components/saving-summary-card";
