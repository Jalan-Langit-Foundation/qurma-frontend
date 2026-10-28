import type { Package, PackageId } from "@/types/qurma";

/**
 * Konfigurasi Paket Qurban QURMA 2027 (Single Source of Truth)
 * Seluruh harga, bobot, dan deskripsi paket mengacu pada data ini.
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
    description: "Khusus alumni mudhohi 2026.",
    features: [
      "Estimasi bobot 20–22 kg",
      "Setoran terjangkau ±Rp214 rb/bln",
      "Khusus mudhohi aktif QURMA 2026",
      "Perawatan pakan sehat terjamin",
      "Monitoring progres via dashboard",
      "Shohibul report foto & video lengkap",
    ],
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
    description: "Ideal untuk shohibul pemula.",
    features: [
      "Estimasi bobot 23–25 kg",
      "Setoran ringan ±Rp271 rb/bln",
      "Terbuka untuk shohibul baru & umum",
      "Perawatan pakan sehat terjamin",
      "Monitoring progres via dashboard",
      "Shohibul report foto & video lengkap",
    ],
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
    description: "Untuk manfaat lebih luas.",
    features: [
      "Estimasi bobot 26–28 kg",
      "Setoran terencana ±Rp357 rb/bln",
      "Daging qurban lebih melimpah",
      "Perawatan intensif standar syariat",
      "Monitoring progres via dashboard",
      "Shohibul report foto & video lengkap",
    ],
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
    description: "Pilihan bobot maksimal terbaik.",
    features: [
      "Estimasi bobot unggul 29–34 kg",
      "Setoran teratur ±Rp427 rb/bln",
      "Domba kelas super bertubuh prima",
      "Perawatan intensif standar syariat",
      "Monitoring progres via dashboard",
      "Shohibul report foto & video lengkap",
    ],
  },
];

export const DEFAULT_PACKAGE_ID: PackageId = "start";

/**
 * Mencari paket qurban berdasarkan ID
 */
export function getPackageById(id: string): Package | undefined {
  return PACKAGES.find((pkg) => pkg.id === id);
}

/**
 * Mengambil opsi paket upgrade (hanya paket dengan target lebih tinggi dari paket aktif)
 */
export function getUpgradePackageOptions(currentPackageId: string): Package[] {
  const current = getPackageById(currentPackageId);
  if (!current) return [];
  return PACKAGES.filter((pkg) => pkg.target > current.target);
}
