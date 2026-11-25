import type { UserDto } from "@/features/auth/server";
import type {
  SavingSummaryDto,
  ScheduleItemDto,
} from "@/features/savings/server";

export interface PackagePriceDto {
  code: string;
  name: string;
  price: number;
}

export type SchedulePositionStatusDto =
  | "not_started"
  | "behind"
  | "on_track"
  | "ahead"
  | "completed";

export interface DashboardInsightsDto {
  month_summary: {
    month: string;
    installment: Pick<
      ScheduleItemDto,
      "amount" | "paid_amount" | "remaining_amount" | "status"
    > | null;

    deposited: number;
  };

  daily_estimate: number;
  schedule_position: {
    status: SchedulePositionStatusDto;
    amount_behind: number;
    months_ahead: number;
  };

  upgrade_suggestion: {
    from: PackagePriceDto;
    to: PackagePriceDto;
    additional_amount: number;
  } | null;
}

/** GET /user/dashboard */
export interface DashboardDto {
  user: UserDto;
  savings_count: number;

  has_saving: boolean;
  saving: SavingSummaryDto | null;
  insights: DashboardInsightsDto | null;
}
