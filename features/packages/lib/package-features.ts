import { formatRupiahRibu } from "@/lib/format";
import type { QurbanPackage } from "./types";

export function formatWeightRange(pkg: QurbanPackage): string {
  return `${pkg.weightMinKg}–${pkg.weightMaxKg} kg`;
}

export function getPackageFeatures(
  pkg: QurbanPackage,
  depositAmount: number | null,
): string[] {
  const features = [`${pkg.copy.weightLabel} ${formatWeightRange(pkg)}`];

  if (depositAmount !== null && depositAmount > 0) {
    features.push(
      `${pkg.copy.depositLabel} ${formatRupiahRibu(depositAmount, { unit: "rb" })}/setoran`,
    );
  }

  return [...features, ...pkg.perks];
}
