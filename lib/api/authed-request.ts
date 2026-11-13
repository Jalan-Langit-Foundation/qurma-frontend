import "server-only";
import { redirect } from "next/navigation";
import { ROUTES } from "@/config/navigation";
import { getSessionToken } from "@/lib/server/session";
import { ApiError } from "./api-error";
import { backendRequest, type BackendRequestOptions } from "./backend-client";

export async function authedRequest<T>(
  path: string,
  options: Omit<BackendRequestOptions, "token"> = {},
): Promise<T> {
  const token = await getSessionToken();
  if (!token) redirect(ROUTES.sessionExpired);

  try {
    return await backendRequest<T>(path, { ...options, token });
  } catch (error) {
    if (error instanceof ApiError && error.kind === "unauthenticated") {
      redirect(ROUTES.sessionExpired);
    }
    throw error;
  }
}
