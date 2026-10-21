import { Mudhohi } from "@/types/qurma";

/**
 * 1. Mudhohi State: Sedang Menabung (Progress ~43%)
 */
export const MOCK_MUDHOHI_SAVING: Mudhohi = {
  id: "mudhohi-001",
  name: "Ahmad Fauzi",
  whatsapp: "081234567890",
  email: "ahmad.fauzi@example.com",
  packageId: "start",
  target: 1900000,
  bulanMulai: "2026-10",
  createdAt: "2026-10-01",
  status: "Aktif",
  hasUpgraded: false,
};

/**
 * 2. Mudhohi State: Target 100% Tercapai (Tahap Persiapan Qurban)
 */
export const MOCK_MUDHOHI_COMPLETED: Mudhohi = {
  id: "mudhohi-002",
  name: "Siti Rahmah",
  whatsapp: "085678901234",
  email: "siti.rahmah@example.com",
  packageId: "plus",
  target: 2500000,
  bulanMulai: "2026-10",
  createdAt: "2026-10-02",
  status: "Lunas",
  hasUpgraded: true,
  vendor: "Mitra Ternak Garut Berkah",
  assignedAnimal: "DMB-PLS-042 (27.2 kg)",
};

/**
 * 3. Mudhohi State: Qurban Selesai & Laporan Terbit (Shohibul Report Siap)
 */
export const MOCK_MUDHOHI_FINISHED: Mudhohi = {
  id: "mudhohi-003",
  name: "Budi Santoso",
  whatsapp: "081987654321",
  email: "budi.santoso@example.com",
  packageId: "premium",
  target: 2990000,
  bulanMulai: "2026-10",
  createdAt: "2026-10-03",
  status: "Lunas",
  hasUpgraded: false,
  vendor: "Mitra Peternakan Sukabumi Mandiri",
  assignedAnimal: "DMB-PRM-108 (32.4 kg)",
};

/**
 * 4. Mudhohi State: Ada Setoran Terlambat (Overdue)
 */
export const MOCK_MUDHOHI_OVERDUE: Mudhohi = {
  id: "mudhohi-004",
  name: "Doni Pratama",
  whatsapp: "081311223344",
  email: "doni.pratama@example.com",
  packageId: "start",
  target: 1900000,
  bulanMulai: "2026-10",
  createdAt: "2026-10-04",
  status: "Overdue",
  hasUpgraded: false,
};

/**
 * 5. Mudhohi State: Paket Loyalty
 */
export const MOCK_MUDHOHI_LOYALTY: Mudhohi = {
  id: "mudhohi-005",
  name: "Hj. Endang Sulastri",
  whatsapp: "082199887766",
  email: "endang.sulastri@example.com",
  packageId: "loyalty",
  target: 1500000,
  bulanMulai: "2026-10",
  createdAt: "2026-10-05",
  status: "Aktif",
  hasUpgraded: false,
};

/**
 * Daftar Mudhohi Lengkap untuk Admin Dashboard (Pencarian, Filter, Sortir)
 */
export const MOCK_MUDHOHI_LIST: Mudhohi[] = [
  MOCK_MUDHOHI_SAVING,
  MOCK_MUDHOHI_COMPLETED,
  MOCK_MUDHOHI_FINISHED,
  MOCK_MUDHOHI_OVERDUE,
  MOCK_MUDHOHI_LOYALTY,
];

/**
 * Helper untuk mengambil mudhohi berdasarkan ID
 */
export function getMudhohiById(id: string): Mudhohi | undefined {
  return MOCK_MUDHOHI_LIST.find((m) => m.id === id);
}
