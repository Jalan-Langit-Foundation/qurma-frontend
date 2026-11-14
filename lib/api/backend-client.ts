import "server-only";
import { serverEnv } from "@/lib/server/env";
import { ApiError, kindFromStatus } from "./api-error";
import type { ApiBody, BackendFile, FieldErrors } from "./types";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface BackendRequestOptions {
  method?: HttpMethod;
  body?: unknown;
  /** Token Sanctum (Bearer). Kosongkan untuk endpoint publik. */
  token?: string | null;
  /** Query string, mis. { page: 2 }. Nilai undefined/null diabaikan. */
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
  accept: string,
): Promise<Response> {
  const headers: Record<string, string> = { Accept: accept };
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

    console.error(`[backend] ${method} ${path} gagal:`, error);
    throw new ApiError({ kind: isTimeout ? "timeout" : "network", status: 0 });
  }
}

/** Ubah respons gagal (atau sukses tapi formatnya tidak dikenal) menjadi ApiError. */
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

/**
 * Satu-satunya pintu ke backend Laravel. Hanya berjalan di server Next
 * (Server Component, Server Action, Route Handler), sehingga:
 * - token tidak pernah terlihat oleh JavaScript di browser,
 * - URL backend tidak bocor ke pengguna,
 * - tidak bergantung pada pengaturan CORS backend.
 *
 * Mengembalikan isi `data` bila sukses; melempar ApiError bila gagal.
 */
export async function backendRequest<T>(
  path: string,
  options: BackendRequestOptions = {},
): Promise<T> {
  const method = options.method ?? "GET";
  const response = await send(path, options, "application/json");
  const json = await readJson(response);

  if (response.ok && isApiBody(json) && json.success) {
    return json.data as T;
  }

  if (response.ok && json === null) {
    return undefined as T;
  }
  throw toApiError(response, json, method, path);
}

/** Ambil nama file dari header Content-Disposition (filename / filename*). */
function parseFileName(disposition: string | null): string | null {
  if (!disposition) return null;
  const encoded = /filename\*=(?:UTF-8'')?([^;]+)/i.exec(disposition)?.[1];
  if (encoded) {
    try {
      return decodeURIComponent(encoded.trim().replace(/^"|"$/g, ""));
    } catch {}
  }
  return /filename="?([^";]+)"?/i.exec(disposition)?.[1]?.trim() ?? null;
}

/**
 * Unduh berkas biner (mis. PDF kwitansi). Bila gagal, backend tetap
 * membalas JSON standar sehingga error-nya diperlakukan sama seperti backendRequest.
 */
export async function backendFileRequest(
  path: string,
  options: BackendRequestOptions = {},
): Promise<BackendFile> {
  const method = options.method ?? "GET";
  const response = await send(
    path,
    options,
    "application/pdf, application/octet-stream, application/json",
  );
  const contentType =
    response.headers.get("content-type") ?? "application/octet-stream";

  if (!response.ok || contentType.includes("application/json")) {
    throw toApiError(response, await readJson(response), method, path);
  }
  if (!response.body) {
    throw toApiError(response, undefined, method, path);
  }

  return {
    body: response.body,
    contentType,
    fileName: parseFileName(response.headers.get("content-disposition")),
  };
}
