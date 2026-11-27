import "server-only";
import { authedRequest, nullIfNotFound } from "@/lib/api/authed-request";
import type { ShohibulReport, Tracking } from "../lib/types";
import type { ReportDto, TrackingDto } from "./fulfillment.dto";
import { toShohibulReport, toTracking } from "./fulfillment.mapper";

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
