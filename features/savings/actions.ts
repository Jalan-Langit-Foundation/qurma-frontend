"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { env } from "@/config/env";
import { ROUTES } from "@/config/navigation";
import { isPackageId } from "@/features/packages";
import { ApiError, toUserMessage } from "@/lib/api/api-error";
import { parsePositiveId } from "@/lib/params";
import { createSaving } from "./api/savings.api";
import { upgradeSaving } from "./api/upgrade.api";
import { isSavingRegistrationOpen } from "./lib/program";
import { getStartMonthOptions } from "./lib/start-months";
import type { Saving } from "./lib/types";
import { currentYearMonth } from "./lib/year-month";

export interface CreateSavingActionError {
  ok: false;
  message: string;
  /** true bila pengguna sudah punya tabungan aktif → tampilkan tautan ke dashboard */
  hasActiveSaving?: boolean;
}

/**
 * Membuat tabungan dari halaman /tabungan/baru.
 * Semua input diperiksa ulang di server; tenor dihitung di sini agar
 * tabungan selalu berakhir di batas pelunasan program (bukan default backend).
 */
export async function createSavingAction(input: {
  packageId: string;
  startMonth: string;
}): Promise<CreateSavingActionError> {
  if (!isSavingRegistrationOpen) {
    return {
      ok: false,
      message:
        "Pendaftaran tabungan online belum dibuka. Silakan hubungi admin QURMA melalui WhatsApp.",
    };
  }

  if (!isPackageId(input.packageId)) {
    return { ok: false, message: "Paket qurban tidak ditemukan." };
  }

  const option = getStartMonthOptions(currentYearMonth()).find(
    (candidate) => candidate.value === input.startMonth,
  );
  if (!option) {
    return {
      ok: false,
      message: "Bulan mulai menabung tidak tersedia. Silakan pilih bulan lain.",
    };
  }

  try {
    const result = await createSaving({
      packageId: input.packageId,
      startMonth: option.value,
      tenorMonths: option.tenorMonths,
    });
    if (result.status === "conflict") {
      return { ok: false, message: result.message, hasActiveSaving: true };
    }
  } catch (error) {
    const fieldMessage =
      error instanceof ApiError
        ? Object.values(error.fieldErrors)[0]
        : undefined;
    return { ok: false, message: fieldMessage ?? toUserMessage(error) };
  }

  redirect(ROUTES.dashboard);
}

export type UpgradeSavingActionResult =
  | { ok: true; message: string; saving: Saving }
  | { ok: false; message: string };

/**
 * Upgrade paket tabungan yang sedang berjalan.
 * Hanya kode paket yang dikirim; target & setoran baru dihitung backend.
 * @public Disiapkan: dipanggil form upgrade bila NEXT_PUBLIC_FEATURE_UPGRADE=true.
 */
export async function upgradeSavingAction(input: {
  savingId: number;
  packageId: string;
}): Promise<UpgradeSavingActionResult> {
  if (!env.features.upgrade) {
    return { ok: false, message: "Fitur upgrade paket belum tersedia." };
  }

  const savingId = parsePositiveId(String(input.savingId));
  if (!savingId) return { ok: false, message: "Tabungan tidak ditemukan." };
  if (!isPackageId(input.packageId)) {
    return { ok: false, message: "Paket qurban tidak ditemukan." };
  }

  try {
    const result = await upgradeSaving(savingId, input.packageId);
    if (result.status === "rejected") {
      return { ok: false, message: result.message };
    }

    refresh();
    return {
      ok: true,
      message: `Paket berhasil diubah ke ${result.saving.packageName}.`,
      saving: result.saving,
    };
  } catch (error) {
    const fieldMessage =
      error instanceof ApiError
        ? Object.values(error.fieldErrors)[0]
        : undefined;
    return { ok: false, message: fieldMessage ?? toUserMessage(error) };
  }
}
