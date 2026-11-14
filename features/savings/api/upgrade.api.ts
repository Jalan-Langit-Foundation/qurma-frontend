import "server-only";
import type { PackageId } from "@/features/packages";
import { ApiError } from "@/lib/api/api-error";
import { authedRequest, nullIfNotFound } from "@/lib/api/authed-request";
import type { Saving, UpgradeOptions } from "../lib/types";
import type {
  SavingSummaryDto,
  UpgradeOptionsDto,
  UpgradeSavingRequestDto,
} from "./savings.dto";
import { toSaving, toUpgradeOptions } from "./savings.mapper";

/**
 * GET /savings/{id}/upgrade-options. null = tabungan tidak ada / bukan milik pengguna.
 * @public Disiapkan: dipakai halaman upgrade paket bila NEXT_PUBLIC_FEATURE_UPGRADE=true.
 */
export async function getUpgradeOptions(
  savingId: number,
): Promise<UpgradeOptions | null> {
  const data = await nullIfNotFound(
    authedRequest<UpgradeOptionsDto>(`/savings/${savingId}/upgrade-options`),
  );
  return data ? toUpgradeOptions(data) : null;
}

export type UpgradeSavingResult =
  | { status: "upgraded"; saving: Saving }
  /** Upgrade ditolak aturan bisnis (409), mis. sudah lunas atau lewat batas */
  | { status: "rejected"; message: string };

/** POST /savings/{id}/upgrade. Hanya kode paket yang dikirim; nominal dihitung backend. */
export async function upgradeSaving(
  savingId: number,
  packageId: PackageId,
): Promise<UpgradeSavingResult> {
  const body: UpgradeSavingRequestDto = { package_code: packageId };
  try {
    const data = await authedRequest<{ saving: SavingSummaryDto }>(
      `/savings/${savingId}/upgrade`,
      { method: "POST", body },
    );
    return { status: "upgraded", saving: toSaving(data.saving) };
  } catch (error) {
    if (error instanceof ApiError && error.kind === "conflict") {
      return { status: "rejected", message: error.message };
    }
    throw error;
  }
}
