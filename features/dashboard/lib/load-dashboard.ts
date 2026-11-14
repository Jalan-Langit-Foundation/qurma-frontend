import "server-only";
import { env } from "@/config/env";
import { getCurrentUser } from "@/features/auth/server";
import { getCurrentSaving } from "@/features/savings/server";
import { getDashboardSummary } from "../api/dashboard.api";
import type { DashboardData } from "./types";

/**
 * Sumber data dashboard:
 * - fitur dashboardSummary aktif → satu request GET /user/dashboard
 * - belum aktif → gabungan /auth/me + /savings/current (endpoint yang sudah ada)
 * Komponen tidak perlu tahu sumbernya.
 */
export async function loadDashboard(): Promise<DashboardData> {
  if (env.features.dashboardSummary) return getDashboardSummary();

  const [user, saving] = await Promise.all([
    getCurrentUser(),
    getCurrentSaving(),
  ]);
  return { user, saving, recentTransactions: [] };
}
