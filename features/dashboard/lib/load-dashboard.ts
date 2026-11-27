import "server-only";
import { cache } from "react";
import { env } from "@/config/env";
import { getCurrentUser } from "@/features/auth/server";
import { getCurrentSaving } from "@/features/savings/server";
import { getDashboardSummary } from "../api/dashboard.api";
import type { DashboardData } from "./types";

export const loadDashboard = cache(async (): Promise<DashboardData> => {
  if (env.features.dashboardSummary) return getDashboardSummary();

  const [user, saving] = await Promise.all([
    getCurrentUser(),
    getCurrentSaving(),
  ]);

  return { user, savingsCount: saving ? 1 : 0, saving, insights: null };
});
