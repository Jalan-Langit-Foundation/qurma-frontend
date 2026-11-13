import { formatRupiahRibu } from "@/lib/format";
import type { QurbanPackage } from "./types";

export function formatWeightRange(pkg: QurbanPackage): string {
  return `${pkg.weightMinKg}–${pkg.weightMaxKg} kg`;
}

export function getPackageFeatures(
  pkg: QurbanPackage,
  monthlyAmount: number | null,
): string[] {
  const features = [`${pkg.copy.weightLabel} ${formatWeightRange(pkg)}`];

  if (monthlyAmount !== null && monthlyAmount > 0) {
    features.push(
      `${pkg.copy.depositLabel} ${formatRupiahRibu(monthlyAmount, { unit: "rb" })}/bln`,
    );
  }

  return [...features, ...pkg.perks];
}
