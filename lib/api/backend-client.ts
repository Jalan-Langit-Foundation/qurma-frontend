import "server-only";
import { serverEnv } from "@/lib/server/env";
import { ApiError, kindFromStatus } from "./api-error";
import type { ApiBody, FieldErrors } from "./types";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface BackendRequestOptions {
  method?: HttpMethod;
  body?: unknown;
  token?: string | null;
  query?: Record<string, string | number | undefined | null>;
  timeoutMs?: number;
}

function buildUrl(path: string, query: BackendRequestOptions["query"]): string {
  const url = new URL(
    `${serverEnv.apiBaseUrl}${path.startsWith("/") ? path : `/${path}`}`,
  );
  for (const [key, value] of Object.entries(query ?? {})) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
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

/** Kirim request; gangguan jaringan & timeout diubah menjadi ApiError. */
async function send(
  path: string,
  { method = "GET", body, token, query, timeoutMs }: BackendRequestOptions,
): Promise<Response> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    return await fetch(buildUrl(path, query), {
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
    // Detail asli hanya ke log server, bukan ke pengguna
    console.error(`[backend] ${method} ${path} gagal:`, error);
    throw new ApiError({ kind: isTimeout ? "timeout" : "network", status: 0 });
  }
}

function toApiError(
  response: Response,
  json: unknown,
  method: HttpMethod,
  path: string,
): ApiError {
  const kind = response.ok ? "server" : kindFromStatus(response.status);
  const errorBody = isApiBody(json) && !json.success ? json : undefined;

  if (kind === "server") {
    console.error(
      `[backend] ${method} ${path} → ${response.status}`,
      errorBody?.message ?? "(respons bukan format standar)",
    );
  }

  return new ApiError({
    kind,
    status: response.status,
    message: kind === "server" ? undefined : errorBody?.message,
    fieldErrors: firstFieldErrors(errorBody?.errors),
  });
}

export interface BackendResult<T, M> {
  data: T;
  meta: M | null;
}

export async function backendRequestWithMeta<T, M = unknown>(
  path: string,
  options: BackendRequestOptions = {},
): Promise<BackendResult<T, M>> {
  const method = options.method ?? "GET";
  const response = await send(path, options);
  const json = await readJson(response);

  if (response.ok && isApiBody(json) && json.success) {
    return { data: json.data as T, meta: (json.meta as M) ?? null };
  }

  if (response.ok && json === null) {
    return { data: undefined as T, meta: null };
  }
  throw toApiError(response, json, method, path);
}

export async function backendRequest<T>(
  path: string,
  options: BackendRequestOptions = {},
): Promise<T> {
  return (await backendRequestWithMeta<T>(path, options)).data;
}
