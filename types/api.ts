/**
 * Definisi Type & Interface API untuk integrasi Backend Laravel (qurma-backend)
 */

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "user" | "admin" | string;
}

export interface AuthData {
  token: string;
  user: User;
}

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type PackageCode = "loyalty" | "start" | "plus" | "premium";

export interface PackageInfo {
  code: PackageCode | string;
  name: string;
}

export interface NextInstallment {
  month: string;
  amount: number;
}

export interface JourneyMilestones {
  target_selected: boolean;
  saving_started: boolean;
  half_reached: boolean;
  target_reached: boolean;
  animal_prepared: boolean;
  qurban_done: boolean;
  report_received: boolean;
}

export type SavingStatus = "active" | "overdue" | "completed" | "cancelled";

export interface SavingSummary {
  id: number;
  package: PackageInfo;
  program_year: number;
  status: SavingStatus;
  target_amount: number;
  total_paid: number;
  remaining_amount: number;
  progress_percent: number;
  tenor_months: number;
  start_month: string;
  end_month: string;
  monthly_amount: number;
  last_installment_amount: number;
  next_installment: NextInstallment | null;
  journey: JourneyMilestones;
}

export interface CreateSavingRequest {
  package_code: PackageCode;
  start_month: string; // Format: YYYY-MM
  tenor_months?: number; // 1 s.d. 12
}

export type ScheduleStatus = "paid" | "overdue" | "next" | "scheduled";

export interface ScheduleItem {
  installment_no: number;
  month: string;
  amount: number;
  paid_amount: number;
  remaining_amount: number;
  status: ScheduleStatus;
  is_final: boolean;
}

export interface DepositItem {
  id: number;
  amount: number;
  paid_at: string; // YYYY-MM-DD
  note: string | null;
}

export interface SavingDepositsData {
  saving_id: number;
  target_amount: number;
  total_paid: number;
  schedule: ScheduleItem[];
  deposits: DepositItem[];
}
