"use server";

import { refresh } from "next/cache";
import { env } from "@/config/env";
import { ApiError, toUserMessage } from "@/lib/api/api-error";
import { zodFieldErrors } from "@/lib/validation";
import { changePassword, updateProfile } from "./api/account.api";
import {
  changePasswordSchema,
  profileSchema,
  type ChangePasswordFormData,
  type ProfileFormData,
} from "./lib/schemas";
import type {
  AccountActionResult,
  ChangePasswordResult,
  UpdateProfileResult,
} from "./lib/types";

const FEATURE_OFF: AccountActionResult<never> = {
  ok: false,
  message: "Fitur ini belum tersedia.",
};

const INVALID_INPUT_MESSAGE =
  "Data yang diisi belum sesuai. Silakan periksa kembali.";

function toFailure(error: unknown): AccountActionResult<never> {
  if (error instanceof ApiError) {
    return {
      ok: false,
      message: toUserMessage(error),
      fieldErrors: error.fieldErrors,
    };
  }
  console.error("[account] kesalahan tak terduga:", error);
  return { ok: false, message: toUserMessage(error) };
}

/** Ubah nama, email, dan nomor WhatsApp. */
export async function updateProfileAction(
  input: ProfileFormData,
): Promise<UpdateProfileResult> {
  if (!env.features.profile) return FEATURE_OFF;

  const parsed = profileSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: INVALID_INPUT_MESSAGE,
      fieldErrors: zodFieldErrors(parsed.error),
    };
  }

  try {
    const user = await updateProfile(parsed.data);

    refresh();
    return { ok: true, message: "Profil berhasil diperbarui.", data: user };
  } catch (error) {
    return toFailure(error);
  }
}

export async function changePasswordAction(
  input: ChangePasswordFormData,
): Promise<ChangePasswordResult> {
  if (!env.features.profile) return FEATURE_OFF;

  const parsed = changePasswordSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: INVALID_INPUT_MESSAGE,
      fieldErrors: zodFieldErrors(parsed.error),
    };
  }

  try {
    await changePassword(parsed.data);
    return {
      ok: true,
      message: "Kata sandi berhasil diganti.",
      data: undefined,
    };
  } catch (error) {
    return toFailure(error);
  }
}
