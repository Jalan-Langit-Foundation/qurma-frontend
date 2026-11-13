import "server-only";
import { serverEnv } from "@/lib/server/env";
import { ApiError, kindFromStatus } from "./api-error";
import type { ApiBody, FieldErrors } from "./types";

export interface BackendRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;

  token?: string | null;
  timeoutMs?: number;
}

function firstFieldErrors(errors?: Record<string, string[]>): FieldErrors {
  const result: FieldErrors = {};
  for (const [field, messages] of Object.entries(errors ?? {})) {
    const first = messages[0];
    if (first) result[field] = first;
  }
  return result;
}

async function readJson(response: Response): Promise<unknown> {
  if (response.status === 204) return null;
  try {
    return await response.json();
  } catch {
    return undefined;
  }
}

function isApiBody(value: unknown): value is ApiBody<unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    typeof (value as { success: unknown }).success === "boolean"
  );
}

export async function backendRequest<T>(
  path: string,
  { method = "GET", body, token, timeoutMs }: BackendRequestOptions = {},
): Promise<T> {
  const url = `${serverEnv.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;

  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(timeoutMs ?? serverEnv.apiTimeoutMs),
    });
  } catch (error) {
    const isTimeout =
      error instanceof DOMException &&
      (error.name === "TimeoutError" || error.name === "AbortError");

    console.error(`[backend] ${method} ${path} gagal:`, error);
    throw new ApiError({ kind: isTimeout ? "timeout" : "network", status: 0 });
  }

  const json = await readJson(response);

  if (response.ok && isApiBody(json) && json.success) {
    return json.data as T;
  }

  if (response.ok && json === null) {
    return undefined as T;
  }

  const kind = response.ok ? "server" : kindFromStatus(response.status);
  const errorBody = isApiBody(json) && !json.success ? json : undefined;

  if (kind === "server") {
    console.error(
      `[backend] ${method} ${path} → ${response.status}`,
      errorBody?.message ?? "(respons bukan format standar)",
    );
  }

  throw new ApiError({
    kind,
    status: response.status,

    message: kind === "server" ? undefined : errorBody?.message,
    fieldErrors: firstFieldErrors(errorBody?.errors),
  });
}
