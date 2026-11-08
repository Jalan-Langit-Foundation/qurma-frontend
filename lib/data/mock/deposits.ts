import { Deposit } from "@/types/qurma";

export const MOCK_DEPOSITS_SAVING: Deposit[] = [
  {
    id: "dep-001-1",
    mudhohiId: "mudhohi-001",
    periode: 1,
    nominal: 271500,
    dueDate: "2026-10-15",
    paidDate: "2026-10-10",
    status: "Lunas",
  },
  {
    id: "dep-001-2",
    mudhohiId: "mudhohi-001",
    periode: 2,
    nominal: 271500,
    dueDate: "2026-11-15",
    paidDate: "2026-11-12",
    status: "Lunas",
  },
  {
    id: "dep-001-3",
    mudhohiId: "mudhohi-001",
    periode: 3,
    nominal: 271500,
    dueDate: "2026-12-15",
    paidDate: "2026-12-14",
    status: "Lunas",
  },
  {
    id: "dep-001-4",
    mudhohiId: "mudhohi-001",
    periode: 4,
    nominal: 271500,
    dueDate: "2027-01-15",
    status: "Berikutnya",
  },
  {
    id: "dep-001-5",
    mudhohiId: "mudhohi-001",
    periode: 5,
    nominal: 271500,
    dueDate: "2027-02-15",
    status: "Terjadwal",
  },
  {
    id: "dep-001-6",
    mudhohiId: "mudhohi-001",
    periode: 6,
    nominal: 271500,
    dueDate: "2027-03-15",
    status: "Terjadwal",
  },
  {
    id: "dep-001-7",
    mudhohiId: "mudhohi-001",
    periode: 7,
    nominal: 271000,
    dueDate: "2027-04-15",
    status: "Pelunasan",
  },
];

export const MOCK_DEPOSITS_COMPLETED: Deposit[] = [
  {
    id: "dep-002-1",
    mudhohiId: "mudhohi-002",
    periode: 1,
    nominal: 357500,
    dueDate: "2026-10-15",
    paidDate: "2026-10-12",
    status: "Lunas",
  },
  {
    id: "dep-002-2",
    mudhohiId: "mudhohi-002",
    periode: 2,
    nominal: 357500,
    dueDate: "2026-11-15",
    paidDate: "2026-11-14",
    status: "Lunas",
  },
  {
    id: "dep-002-3",
    mudhohiId: "mudhohi-002",
    periode: 3,
    nominal: 357500,
    dueDate: "2026-12-15",
    paidDate: "2026-12-10",
    status: "Lunas",
  },
  {
    id: "dep-002-4",
    mudhohiId: "mudhohi-002",
    periode: 4,
    nominal: 357500,
    dueDate: "2027-01-15",
    paidDate: "2027-01-11",
    status: "Lunas",
  },
  {
    id: "dep-002-5",
    mudhohiId: "mudhohi-002",
    periode: 5,
    nominal: 357500,
    dueDate: "2027-02-15",
    paidDate: "2027-02-13",
    status: "Lunas",
  },
  {
    id: "dep-002-6",
    mudhohiId: "mudhohi-002",
    periode: 6,
    nominal: 357500,
    dueDate: "2027-03-15",
    paidDate: "2027-03-10",
    status: "Lunas",
  },
  {
    id: "dep-002-7",
    mudhohiId: "mudhohi-002",
    periode: 7,
    nominal: 355000,
    dueDate: "2027-04-15",
    paidDate: "2027-04-08",
    status: "Lunas",
  },
];

export const MOCK_DEPOSITS_OVERDUE: Deposit[] = [
  {
    id: "dep-004-1",
    mudhohiId: "mudhohi-004",
    periode: 1,
    nominal: 271500,
    dueDate: "2026-10-15",
    paidDate: "2026-10-14",
    status: "Lunas",
  },
  {
    id: "dep-004-2",
    mudhohiId: "mudhohi-004",
    periode: 2,
    nominal: 271500,
    dueDate: "2026-11-15",
    status: "Terlambat",
  },
  {
    id: "dep-004-3",
    mudhohiId: "mudhohi-004",
    periode: 3,
    nominal: 271500,
    dueDate: "2026-12-15",
    status: "Berikutnya",
  },
  {
    id: "dep-004-4",
    mudhohiId: "mudhohi-004",
    periode: 4,
    nominal: 271500,
    dueDate: "2027-01-15",
    status: "Terjadwal",
  },
  {
    id: "dep-004-5",
    mudhohiId: "mudhohi-004",
    periode: 5,
    nominal: 271500,
    dueDate: "2027-02-15",
    status: "Terjadwal",
  },
  {
    id: "dep-004-6",
    mudhohiId: "mudhohi-004",
    periode: 6,
    nominal: 271500,
    dueDate: "2027-03-15",
    status: "Terjadwal",
  },
  {
    id: "dep-004-7",
    mudhohiId: "mudhohi-004",
    periode: 7,
    nominal: 271000,
    dueDate: "2027-04-15",
    status: "Pelunasan",
  },
];

/**
 * Peta riwayat setoran per Mudhohi ID
 */
export const MOCK_DEPOSITS_MAP: Record<string, Deposit[]> = {
  "mudhohi-001": MOCK_DEPOSITS_SAVING,
  "mudhohi-002": MOCK_DEPOSITS_COMPLETED,
  "mudhohi-003": MOCK_DEPOSITS_COMPLETED, // Budi Santoso juga lunas penuh
  "mudhohi-004": MOCK_DEPOSITS_OVERDUE,
};

/**
 * Helper untuk mengambil daftar setoran berdasarkan mudhohiId
 */
export function getDepositsByMudhohiId(mudhohiId: string): Deposit[] {
  return MOCK_DEPOSITS_MAP[mudhohiId] || [];
}

/**
 * Helper untuk menghitung total setoran lunas
 */
export function calculateTotalPaid(deposits: Deposit[]): number {
  return deposits
    .filter((d) => d.status === "Lunas")
    .reduce((sum, d) => sum + d.nominal, 0);
}
