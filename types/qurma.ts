export type PackageId = "loyalty" | "start" | "plus" | "premium";

export interface Package {
  id: PackageId;
  name: string;
  target: number;
  weightMin: number;
  weightMax: number;
  monthlyEstimate: string;
  note: string;
  recommended: boolean;
  loyaltyOnly: boolean;
}

export type DepositStatus =
  | "Lunas"
  | "Berikutnya"
  | "Terjadwal"
  | "Pelunasan"
  | "Terlambat";

export interface Deposit {
  id: string;
  mudhohiId: string;
  periode: number; // Bulan ke-1, 2, dst.
  nominal: number;
  dueDate: string; // ISO date string YYYY-MM-DD
  paidDate?: string; // ISO date string YYYY-MM-DD jika lunas
  status: DepositStatus;
}

export interface JourneyStep {
  id: number; // 1 s.d. 7
  title: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export type PreparationKey =
  | "dana"
  | "hewan"
  | "verifikasi"
  | "pelaksanaan"
  | "laporan";

export type PreparationState = "selesai" | "berjalan" | "belum";

export interface PreparationStatusItem {
  key: PreparationKey;
  label: string;
  description: string;
  state: PreparationState;
}

export type MudhohiStatus = "Aktif" | "Lunas" | "Overdue";

export interface Mudhohi {
  id: string;
  name: string;
  whatsapp: string;
  email?: string;
  packageId: PackageId;
  target: number;
  bulanMulai: string; // YYYY-MM
  createdAt: string;
  status: MudhohiStatus;
  hasUpgraded?: boolean;
  vendor?: string;
  assignedAnimal?: string;
}

export interface ShohibulReport {
  id: string;
  mudhohiId: string;
  shohibulName: string;
  packageName: string;
  packageWeight: string;
  location: string;
  date: string;
  photos: {
    hewan: string[];
    penyembelihan: string[];
    distribusi: string[];
  };
  published: boolean;
  notes?: string;
}
