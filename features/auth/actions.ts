"use server";

import { redirect } from "next/navigation";
import { ROUTES } from "@/config/navigation";
import { ApiError, toUserMessage } from "@/lib/api/api-error";
import { serverEnv } from "@/lib/server/env";
import {
  clearSessionToken,
  getSessionToken,
  setSessionToken,
} from "@/lib/server/session";
import { loginRequest, logoutRequest, registerRequest } from "./api/auth.api";
import { getSafeRedirectPath } from "./lib/redirect";
import {
  loginSchema,
  registerSchema,
  zodFieldErrors,
  type LoginFormData,
  type RegisterFormData,
} from "./lib/schemas";
import type { AuthActionError } from "./lib/types";

const INVALID_INPUT_MESSAGE =
  "Data yang diisi belum sesuai. Silakan periksa kembali.";

function toActionError(error: unknown): AuthActionError {
  if (error instanceof ApiError) {
    return {
      ok: false,
      message: toUserMessage(error),
      fieldErrors: error.fieldErrors,
    };
  }
  console.error("[auth] kesalahan tak terduga:", error);
  return { ok: false, message: toUserMessage(error) };
}

/**
 * Login penabung.
 * Sukses → token disimpan di cookie HttpOnly → redirect ke ?next= atau dashboard.
 */
export async function loginAction(
  input: LoginFormData,
  next: string | null,
): Promise<AuthActionError> {
  const parsed = loginSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: INVALID_INPUT_MESSAGE,
      fieldErrors: zodFieldErrors(parsed.error),
    };
  }

  try {
    const session = await loginRequest({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    // Admin mengelola data lewat panel Filament, bukan lewat website ini
    if (session.user.role === "admin") {
      await logoutRequest(session.token);
      const panelHint = serverEnv.adminPanelUrl
        ? ` di ${serverEnv.adminPanelUrl}`
        : "";
      return {
        ok: false,
        message: `Akun admin tidak dapat masuk di halaman ini. Silakan masuk melalui panel admin${panelHint}.`,
      };
    }

    await setSessionToken(session.token, { remember: parsed.data.remember });
  } catch (error) {
    return toActionError(error);
  }

  // redirect() harus di luar try/catch
  redirect(getSafeRedirectPath(next));
}

/**
 * Daftar akun penabung. Backend langsung memberi token, jadi pengguna
 * tidak perlu login ulang (API Contract: Catatan tambahan no. 4).
 */
export async function registerAction(
  input: RegisterFormData,
  next: string | null,
): Promise<AuthActionError> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      message: INVALID_INPUT_MESSAGE,
      fieldErrors: zodFieldErrors(parsed.error),
    };
  }

  try {
    const session = await registerRequest({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      password: parsed.data.password,
      password_confirmation: parsed.data.password_confirmation,
    });
    // Akun baru belum memilih "ingat saya" → sesi bertahan 30 hari agar tidak langsung keluar
    await setSessionToken(session.token, { remember: true });
  } catch (error) {
    return toActionError(error);
  }

  redirect(getSafeRedirectPath(next));
}

/** Keluar: cabut token di backend, hapus cookie, kembali ke halaman login. */
export async function logoutAction(): Promise<void> {
  const token = await getSessionToken();
  if (token) await logoutRequest(token);
  await clearSessionToken();
  redirect(ROUTES.login);
}
