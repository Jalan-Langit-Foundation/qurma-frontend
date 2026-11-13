import "server-only";
import { ApiError } from "@/lib/api/api-error";
import { authedRequest } from "@/lib/api/authed-request";
import type { CreateSavingInput, Saving, SavingLedger } from "../lib/types";
import type { SavingDepositsDto, SavingSummaryDto } from "./savings.dto";
import {
  toCreateSavingRequest,
  toSaving,
  toSavingLedger,
} from "./savings.mapper";

/** 404 dari backend berarti "tidak ada" (bukan error) untuk endpoint ini. */
async function nullIfNotFound<T>(request: Promise<T>): Promise<T | null> {
  try {
    return await request;
  } catch (error) {
    if (error instanceof ApiError && error.kind === "not_found") return null;
    throw error;
  }
}

/** Tabungan berjalan (atau terakhir) milik pengguna. null = belum punya tabungan. */
export async function getCurrentSaving(): Promise<Saving | null> {
  const data = await nullIfNotFound(
    authedRequest<{ saving: SavingSummaryDto }>("/savings/current"),
  );
  return data ? toSaving(data.saving) : null;
}

/** Jadwal & catatan setoran. null = tabungan tidak ada / bukan milik pengguna. */
export async function getSavingLedger(
  savingId: number,
): Promise<SavingLedger | null> {
  const data = await nullIfNotFound(
    authedRequest<SavingDepositsDto>(`/savings/${savingId}/deposits`),
  );
  return data ? toSavingLedger(data) : null;
}

export type CreateSavingResult =
  | { status: "created"; saving: Saving }
  /** Pengguna masih punya tabungan aktif (409) */
  | { status: "conflict"; message: string };

/**
 * Membuat tabungan. Aman bila tombol tertekan dua kali:
 * backend menolak tabungan aktif kedua dengan 409.
 */
export async function createSaving(
  input: CreateSavingInput,
): Promise<CreateSavingResult> {
  try {
    const data = await authedRequest<{ saving: SavingSummaryDto }>("/savings", {
      method: "POST",
      body: toCreateSavingRequest(input),
    });
    return { status: "created", saving: toSaving(data.saving) };
  } catch (error) {
    if (error instanceof ApiError && error.kind === "conflict") {
      return { status: "conflict", message: error.message };
    }
    throw error;
  }
}
