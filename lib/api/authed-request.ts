import "server-only";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/navigation";
import { getSessionToken } from "@/lib/server/session";
import { ApiError } from "./api-error";
import {
  backendRequest,
  backendRequestWithMeta,
  type BackendRequestOptions,
  type BackendResult,
} from "./backend-client";

type AuthedOptions = Omit<BackendRequestOptions, "token">;

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

export function authedRequest<T>(
  path: string,
  options: AuthedOptions = {},
): Promise<T> {
  return withSession((token) => backendRequest<T>(path, { ...options, token }));
}

export function authedRequestWithMeta<T, M = unknown>(
  path: string,
  options: AuthedOptions = {},
): Promise<BackendResult<T, M>> {
  return withSession((token) =>
    backendRequestWithMeta<T, M>(path, { ...options, token }),
  );
}

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
