import { Package, PackageId } from "@/types/qurma";

/**
 * Konfigurasi Paket Qurban QURMA 2027 (Single Source of Truth)
 * Seluruh harga dan bobot di seluruh aplikasi mengacu pada data ini.
 */
export const PACKAGES: Package[] = [
  {
    id: "loyalty",
    name: "Loyalty",
    target: 1500000,
    weightMin: 20,
    weightMax: 22,
    monthlyEstimate: "±Rp214 ribu",
    note: "Khusus Mudhohi QURMA 2026",
    recommended: false,
    loyaltyOnly: true,
  },
  {
    id: "start",
    name: "Start",
    target: 1900000,
    weightMin: 23,
    weightMax: 25,
    monthlyEstimate: "±Rp271 ribu",
    note: "Paling direkomendasikan",
    recommended: true,
    loyaltyOnly: false,
  },
  {
    id: "plus",
    name: "Plus",
    target: 2500000,
    weightMin: 26,
    weightMax: 28,
    monthlyEstimate: "±Rp357 ribu",
    note: "Untuk meningkatkan target",
    recommended: false,
    loyaltyOnly: false,
  },
  {
    id: "premium",
    name: "Premium",
    target: 2990000,
    weightMin: 29,
    weightMax: 34,
    monthlyEstimate: "±Rp427 ribu",
    note: "Bobot lebih besar",
    recommended: false,
    loyaltyOnly: false,
  },
];

export const DEFAULT_PACKAGE_ID: PackageId = "start";

/**
 * Mencari paket berdasarkan ID
 */
export function getPackageById(id: string): Package | undefined {
  return PACKAGES.find((pkg) => pkg.id === id);
}

/**
 * Mengambil opsi paket upgrade (hanya paket dengan target lebih tinggi dari paket aktif)
 * Paket Loyalty tidak pernah ditawarkan sebagai opsi upgrade.
 */
export function getUpgradeOptions(currentId: string): Package[] {
  const currentPkg = getPackageById(currentId);
  if (!currentPkg) return [];

  return PACKAGES.filter(
    (pkg) => !pkg.loyaltyOnly && pkg.target > currentPkg.target
  );
}
