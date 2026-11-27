import type { AuthUser } from "@/features/auth";
import { isPackageId } from "@/features/packages";
import { toSaving } from "@/features/savings/server";
import type {
  DashboardData,
  DashboardInsights,
  PackagePrice,
} from "../lib/types";
import type {
  DashboardDto,
  DashboardInsightsDto,
  PackagePriceDto,
} from "./dashboard.dto";

function toPackagePrice(dto: PackagePriceDto): PackagePrice {
  return {
    packageId: isPackageId(dto.code) ? dto.code : null,
    name: dto.name,
    price: dto.price,
  };
}

function toDashboardInsights(dto: DashboardInsightsDto): DashboardInsights {
  const { month_summary, schedule_position, upgrade_suggestion } = dto;
  const installment = month_summary.installment;

  return {
    monthSummary: {
      month: month_summary.month,
      installment: installment
        ? {
            amount: installment.amount,
            paidAmount: installment.paid_amount,
            remainingAmount: installment.remaining_amount,
            status: installment.status,
          }
        : null,
      deposited: month_summary.deposited,
    },
    dailyEstimate: dto.daily_estimate,
    schedulePosition: {
      status: schedule_position.status,
      amountBehind: schedule_position.amount_behind,
      monthsAhead: schedule_position.months_ahead,
    },
    upgradeSuggestion: upgrade_suggestion
      ? {
          from: toPackagePrice(upgrade_suggestion.from),
          to: toPackagePrice(upgrade_suggestion.to),
          additionalAmount: upgrade_suggestion.additional_amount,
        }
      : null,
  };
}

export function toDashboardData(
  dto: DashboardDto,
  user: AuthUser,
): DashboardData {
  const saving = dto.has_saving && dto.saving ? toSaving(dto.saving) : null;

  return {
    user,
    savingsCount: dto.savings_count,
    saving,
    insights: saving && dto.insights ? toDashboardInsights(dto.insights) : null,
  };
}
