"use server";

import { redirect } from "next/navigation";
import { ROUTES } from "@/config/navigation";
import { isPackageId } from "@/features/packages";
import { ApiError, toUserMessage } from "@/lib/api/api-error";
import { createSaving } from "./api/savings.api";
import { formatTanggal } from "@/lib/format";
import { getSavingRegistration } from "./api/registration.api";
import { getStartMonthOptions } from "./lib/start-months";
import { currentYearMonth } from "./lib/year-month";

export interface CreateSavingActionError {
  ok: false;
  message: string;
  hasActiveSaving?: boolean;
}

export async function createSavingAction(input: {
  packageId: string;
  startMonth: string;
}): Promise<CreateSavingActionError> {
  const registration = await getSavingRegistration();
  if (registration.state === "not_opened") {
    return {
      ok: false,
      message:
        "Pendaftaran tabungan online belum dibuka. Silakan hubungi CS QURMA melalui WhatsApp.",
    };
  }
  if (registration.state === "closed") {
    return {
      ok: false,
      message: `Pendaftaran Tabungan Qurban sudah ditutup (batas pendaftaran: ${formatTanggal(registration.deadline)}).`,
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
