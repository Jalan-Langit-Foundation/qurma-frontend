import type {
  PackageCode,
  SavingStatus,
  ScheduleStatus,
  ScheduleItem,
  JourneyMilestones,
} from "./api";

/**
 * ID Paket Qurban resmi (diselaraskan dengan PackageCode API backend)
 */
export type PackageId = PackageCode;

/**
 * Entitas Paket Tabungan Qurban
 */
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
  description?: string;
  features?: string[];
}

/**
 * Status visual setoran pada tabel UI
 */
export type DepositStatus =
  | "Lunas"
  | "Berikutnya"
  | "Terjadwal"
  | "Pelunasan"
  | "Terlambat";

/**
 * Model data setoran/angsuran tabungan di frontend
 */
export interface Deposit {
  id: string;
  mudhohiId: string;
  periode: number; // Bulan ke-1, 2, dst.
  nominal: number;
  dueDate: string; // ISO date string YYYY-MM-DD
  paidDate?: string; // ISO date string YYYY-MM-DD jika lunas
  status: DepositStatus;
}

/**
 * Langkah perjalanan qurban (Shohibul Journey Checklist)
 */
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

/**
 * ============================================================================
 * ADAPTER & MAPPER FUNCTIONS (Sinkronisasi API Contracts <-> Domain Presentation)
 * ============================================================================
 */

/**
 * Mengonversi ScheduleStatus dari REST API backend menjadi DepositStatus untuk tampilan tabel frontend
 */
export function mapScheduleStatusToDepositStatus(
  status: ScheduleStatus,
  isFinal: boolean = false
): DepositStatus {
  switch (status) {
    case "paid":
      return "Lunas";
    case "overdue":
      return "Terlambat";
    case "next":
      return isFinal ? "Pelunasan" : "Berikutnya";
    case "scheduled":
      return isFinal ? "Pelunasan" : "Terjadwal";
    default:
      return "Terjadwal";
  }
}

/**
 * Mengonversi SavingStatus dari REST API backend menjadi MudhohiStatus
 */
export function mapSavingStatusToMudhohiStatus(status: SavingStatus): MudhohiStatus {
  switch (status) {
    case "completed":
      return "Lunas";
    case "overdue":
      return "Overdue";
    case "active":
    case "cancelled":
    default:
      return "Aktif";
  }
}

/**
 * Mengonversi ScheduleItem dari response backend `/api/savings/{id}/deposits` menjadi objek Deposit UI
 */
export function convertScheduleItemToDeposit(
  item: ScheduleItem,
  mudhohiId: string = "mudhohi-current"
): Deposit {
  return {
    id: `dep-${item.installment_no}`,
    mudhohiId,
    periode: item.installment_no,
    nominal: item.amount,
    dueDate: `${item.month}-15`, // Default tanggal jatuh tempo pertengahan bulan
    paidDate: item.status === "paid" ? `${item.month}-10` : undefined,
    status: mapScheduleStatusToDepositStatus(item.status, item.is_final),
  };
}

/**
 * Mengonversi JourneyMilestones boolean flags dari API backend menjadi 7 langkah visual checklist
 */
export function mapJourneyMilestonesToSteps(milestones: JourneyMilestones): JourneyStep[] {
  const steps: JourneyStep[] = [
    {
      id: 1,
      title: "Target Ditentukan",
      description: "Paket qurban telah dipilih sesuai kemampuan finansial.",
      completed: Boolean(milestones.target_selected),
    },
    {
      id: 2,
      title: "Tabungan Dimulai",
      description: "Setoran pertama telah berhasil diverifikasi.",
      completed: Boolean(milestones.saving_started),
    },
    {
      id: 3,
      title: "50% Tercapai",
      description: "Akumulasi tabungan telah mencapai separuh target.",
      completed: Boolean(milestones.half_reached),
    },
    {
      id: 4,
      title: "100% Lunas",
      description: "Seluruh target dana qurban telah terkumpul penuh.",
      completed: Boolean(milestones.target_reached),
    },
    {
      id: 5,
      title: "Hewan Disiapkan",
      description: "Domba qurban dialokasikan & dipelihara peternak mitra.",
      completed: Boolean(milestones.animal_prepared),
    },
    {
      id: 6,
      title: "Pelaksanaan Qurban",
      description: "Penyembelihan syar'i dilaksanakan pada hari raya.",
      completed: Boolean(milestones.qurban_done),
    },
    {
      id: 7,
      title: "Laporan Diterima",
      description: "Dokumentasi foto & video Shohibul Report tersedia.",
      completed: Boolean(milestones.report_received),
    },
  ];

  // Menandai langkah aktif saat ini (langkah pertama yang belum selesai)
  let foundCurrent = false;
  return steps.map((step) => {
    if (!step.completed && !foundCurrent) {
      foundCurrent = true;
      return { ...step, current: true };
    }
    return step;
  });
}
