import "server-only";
import { getCurrentUser } from "@/features/auth/server";
import { authedRequest } from "@/lib/api/authed-request";
import { parseResponse } from "@/lib/api/response-schema";
import type { DashboardData } from "../lib/types";
import { dashboardDtoSchema } from "./dashboard.dto";
import { toDashboardData } from "./dashboard.mapper";

export async function getDashboardSummary(): Promise<DashboardData> {
  const [data, user] = await Promise.all([
    authedRequest<unknown>("/user/dashboard"),
    getCurrentUser(),
  ]);

  return toDashboardData(
    parseResponse(dashboardDtoSchema, data, "GET /user/dashboard"),
    user,
  );
}
