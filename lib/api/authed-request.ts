import "server-only";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/navigation";
import { getSessionToken } from "@/lib/server/session";
import { ApiError } from "./api-error";
import {
  backendFileRequest,
  backendRequest,
  type BackendRequestOptions,
} from "./backend-client";
import type { BackendFile } from "./types";

type AuthedOptions = Omit<BackendRequestOptions, "token">;

/**
 * Jalankan request dengan token dari cookie sesi.
 * Token tidak ada atau ditolak backend (401) → /session/expired
 * (cookie dihapus lalu diarahkan ke halaman login).
 */
async function withSession<T>(run: (token: string) => Promise<T>): Promise<T> {
  const token = await getSessionToken();
  if (!token) redirect(ROUTES.sessionExpired);

  try {
    return await run(token);
  } catch (error) {
    if (error instanceof ApiError && error.kind === "unauthenticated") {
      redirect(ROUTES.sessionExpired);
    }
    throw error;
  }
}

/** Request JSON ke endpoint yang butuh login. */
export function authedRequest<T>(
  path: string,
  options: AuthedOptions = {},
): Promise<T> {
  return withSession((token) => backendRequest<T>(path, { ...options, token }));
}

/** Unduh berkas dari endpoint yang butuh login. */
export function authedFileRequest(
  path: string,
  options: AuthedOptions = {},
): Promise<BackendFile> {
  return withSession((token) =>
    backendFileRequest(path, { ...options, token }),
  );
}

/** 404 dari backend berarti "tidak ada" (bukan error) untuk banyak endpoint. */
export async function nullIfNotFound<T>(
  request: Promise<T>,
): Promise<T | null> {
  try {
    return await request;
  } catch (error) {
    if (error instanceof ApiError && error.kind === "not_found") return null;
    throw error;
  }
}
