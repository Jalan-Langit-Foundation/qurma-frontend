export type SavingStatusDto = "active" | "overdue" | "completed" | "cancelled";
export type ScheduleStatusDto = "paid" | "overdue" | "next" | "scheduled";

export interface JourneyMilestonesDto {
  target_selected: boolean;
  saving_started: boolean;
  half_reached: boolean;
  target_reached: boolean;
  animal_prepared: boolean;
  qurban_done: boolean;
  report_received: boolean;
}

export interface SavingSummaryDto {
  id: number;
  package: { code: string; name: string };
  program_year: number;
  status: SavingStatusDto;
  target_amount: number;
  total_paid: number;
  paid_this_month: number;
  remaining_amount: number;
  progress_percent: number;
  tenor_months: number;
  start_month: string;
  end_month: string;
  monthly_amount: number;
  last_installment_amount: number;
  next_installment: { month: string; amount: number } | null;
  journey: JourneyMilestonesDto;
}

export interface ScheduleItemDto {
  installment_no: number;
  month: string;
  amount: number;
  paid_amount: number;
  remaining_amount: number;
  status: ScheduleStatusDto;
  is_final: boolean;
}

export interface DepositItemDto {
  id: number;
  amount: number;
  paid_at: string;
  note: string | null;
}

export interface SavingDepositsDto {
  saving_id: number;
  target_amount: number;
  total_paid: number;
  schedule: ScheduleItemDto[];
  deposits: DepositItemDto[];
}

export interface CreateSavingRequestDto {
  package_code: string;
  start_month: string;
  tenor_months: number;
}
