import "server-only";
import { authedRequest } from "@/lib/api/authed-request";
import type { DashboardData } from "../lib/types";
import type { DashboardDto } from "./dashboard.dto";
import { toDashboardData } from "./dashboard.mapper";

/** GET /user/dashboard → ringkasan dashboard dalam satu request. */
export async function getDashboardSummary(): Promise<DashboardData> {
  return toDashboardData(await authedRequest<DashboardDto>("/user/dashboard"));
}
