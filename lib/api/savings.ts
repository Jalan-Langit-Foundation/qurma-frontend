import { apiRequest, ApiClientError } from "./client";
import type {
  CreateSavingRequest,
  SavingDepositsData,
  SavingSummary,
} from "@/types/api";

/**
 * Membuat tabungan qurban baru
 * Menolak (409) jika user sudah memiliki tabungan yang berstatus 'active'.
 */
export async function createSaving(payload: CreateSavingRequest): Promise<SavingSummary> {
  const response = await apiRequest<{ saving: SavingSummary }>("/savings", {
    method: "POST",
    body: payload,
  });

  return response.data.saving;
}

/**
 * Mengambil data tabungan aktif pengguna (untuk halaman Dashboard)
 * Jika pengguna belum memiliki tabungan (HTTP 404), fungsi mengembalikan `null`.
 */
export async function getCurrentSaving(): Promise<SavingSummary | null> {
  try {
    const response = await apiRequest<{ saving: SavingSummary }>("/savings/current", {
      method: "GET",
    });

    return response.data.saving;
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * Mengambil riwayat setoran dan jadwal angsuran berdasarkan ID tabungan
 */
export async function getSavingDeposits(savingId: number): Promise<SavingDepositsData> {
  const response = await apiRequest<SavingDepositsData>(`/savings/${savingId}/deposits`, {
    method: "GET",
  });

  return response.data;
}
