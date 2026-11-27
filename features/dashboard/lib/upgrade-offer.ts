import type { QurbanPackage } from "@/features/packages";
import type { Saving } from "@/features/savings";
import type { DashboardInsights, UpgradeSuggestion } from "./types";

/**
 * Tawaran naik paket untuk banner sidebar & halaman Paket.
 *
 * 1. Pakai `insights.upgrade_suggestion` dari backend bila ada.
 * 2. Bila kosong (progres < 50%, atau flag ringkasan dashboard mati), hitung
 *    sendiri dari katalog: paket berikutnya yang lebih mahal.
 *
 * Tidak ada tawaran bila belum punya tabungan, tabungan sudah lunas/batal,
 * atau paketnya sudah yang tertinggi.
 */
export function resolveUpgradeSuggestion(
  saving: Saving | null,
  insights: Pick<DashboardInsights, "upgradeSuggestion"> | null,
  packages: readonly QurbanPackage[],
): UpgradeSuggestion | null {
  if (!saving) return null;
  if (saving.status === "completed" || saving.status === "cancelled") {
    return null;
  }
  if (saving.remainingAmount <= 0) return null;
  if (insights?.upgradeSuggestion) return insights.upgradeSuggestion;

  const next = [...packages]
    .sort((a, b) => a.target - b.target)
    .find((pkg) => pkg.target > saving.targetAmount);
  if (!next) return null;

  return {
    from: {
      packageId: saving.packageId,
      name: saving.packageName,
      price: saving.targetAmount,
    },
    to: { packageId: next.id, name: next.name, price: next.target },
    additionalAmount: next.target - saving.targetAmount,
  };
}
