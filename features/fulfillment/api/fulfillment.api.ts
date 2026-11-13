import "server-only";
import { ApiError } from "@/lib/api/api-error";
import { authedRequest } from "@/lib/api/authed-request";
import type { ShohibulReport, Tracking } from "../lib/types";
import type { ReportDto, TrackingDto } from "./fulfillment.dto";
import { toShohibulReport, toTracking } from "./fulfillment.mapper";

async function nullIfNotFound<T>(request: Promise<T>): Promise<T | null> {
  try {
    return await request;
  } catch (error) {
    if (error instanceof ApiError && error.kind === "not_found") return null;
    throw error;
  }
}

/** null = tabungan tidak ada / bukan milik pengguna. */
export async function getTracking(savingId: number): Promise<Tracking | null> {
  const data = await nullIfNotFound(
    authedRequest<{ tracking: TrackingDto }>(
      `/savings/${savingId}/fulfillment`,
    ),
  );
  return data ? toTracking(data.tracking) : null;
}

/** null = laporan belum dipublikasikan (atau tabungan bukan milik pengguna). */
export async function getShohibulReport(
  savingId: number,
): Promise<ShohibulReport | null> {
  const data = await nullIfNotFound(
    authedRequest<{ report: ReportDto }>(`/savings/${savingId}/report`),
  );
  return data ? toShohibulReport(data.report) : null;
}
