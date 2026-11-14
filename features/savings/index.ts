export { isSavingRegistrationOpen, SAVINGS_PROGRAM } from "./lib/program";
export {
  formatYearMonth,
  formatYearMonthShort,
  type YearMonth,
} from "./lib/year-month";
export {
  toStartMonthSelectOptions,
  type StartMonthOption,
} from "./lib/start-months";
export {
  estimateMonthlyAmount,
  type InstallmentPlan,
} from "./lib/installment-plan";
export type { InstallmentStatus } from "./lib/installment-status";
export { getSavingStatus, type SavingStatusTone } from "./lib/saving-status";
export { buildJourneyStepsFromStage, type JourneyStep } from "./lib/journey";

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

export {
  useSavingSimulation,
  type SavingSimulationState,
} from "./hooks/use-saving-simulation";

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
export { PlanInputs } from "./components/plan-inputs";
