import type { AuthUser } from "@/features/auth";
import type { PackageId } from "@/features/packages";
import type { InstallmentStatus, Saving } from "@/features/savings";

export interface PackagePrice {
  packageId: PackageId | null;
  name: string;
  price: number;
}

export type SchedulePositionStatus =
  "not_started" | "behind" | "on_track" | "ahead" | "completed";

export interface UpgradeSuggestion {
  from: PackagePrice;
  to: PackagePrice;
  additionalAmount: number;
}

export interface DashboardInsights {
  monthSummary: {
    /** "YYYY-MM" */
    month: string;
    installment: {
      amount: number;
      paidAmount: number;
      remainingAmount: number;
      status: InstallmentStatus;
    } | null;
    deposited: number;
  };
  dailyEstimate: number;
  schedulePosition: {
    status: SchedulePositionStatus;
    amountBehind: number;
    monthsAhead: number;
  };

  upgradeSuggestion: UpgradeSuggestion | null;
}

export interface DashboardData {
  user: AuthUser;
  savingsCount: number;
  saving: Saving | null;

  insights: DashboardInsights | null;
}
