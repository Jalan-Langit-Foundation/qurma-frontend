import { toAuthUser } from "@/features/auth/server";
import { toSaving } from "@/features/savings/server";
import { toTransaction } from "@/features/transactions/server";
import type { DashboardData } from "../lib/types";
import type { DashboardDto } from "./dashboard.dto";

export function toDashboardData(dto: DashboardDto): DashboardData {
  return {
    user: toAuthUser(dto.user),
    saving: dto.saving ? toSaving(dto.saving) : null,
    recentTransactions: dto.recent_transactions.map(toTransaction),
  };
}
