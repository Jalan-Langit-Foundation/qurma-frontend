import type { ApiResponse, ApiErrorResponse } from "@/types/api";

const TOKEN_KEY = "qurma_auth_token";
const USER_KEY = "qurma_auth_user";

/**
 * Custom Error Class untuk response API
 */
export class ApiClientError extends Error {
  public status: number;
  public errors?: Record<string, string[]>;
  public raw?: unknown;

  constructor(status: number, message: string, errors?: Record<string, string[]>, raw?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.errors = errors;
    this.raw = raw;
  }

  /**
   * Helper untuk mengambil error pertama dari spesifik field
   */
  public getFieldError(field: string): string | undefined {
    return this.errors?.[field]?.[0];
  }

  /**
   * Helper untuk mengambil error pertama dari keseluruhan field
   */
  public getFirstError(): string | undefined {
    if (!this.errors) return this.message;
    const firstKey = Object.keys(this.errors)[0];
    return firstKey ? this.errors[firstKey]?.[0] : this.message;
  }
}

/**
 * Helper Token Management (Browser & SSR Safe)
 */
export const tokenStorage = {
  get: (): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },
  set: (token: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(TOKEN_KEY, token);
      // Simpan juga ke document.cookie agar bisa dibaca middleware SSR jika diperlukan
      document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=2592000; SameSite=Lax`;
    } catch {
      // Ignore storage errors
    }
  },
  remove: (): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
    } catch {
      // Ignore storage errors
    }
  },
};

/**
 * Mendapatkan Base URL API backend
 */
export function getApiBaseUrl(): string {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api";
  return base.replace(/\/+$/, ""); // Hilangkan trailing slash jika ada
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  token?: string | null;
  skipAuth?: boolean;
}

/**
 * Core HTTP Request Wrapper untuk Backend Laravel
 */
export async function apiRequest<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { body, token, skipAuth = false, headers: customHeaders, ...restOptions } = options;

  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${getApiBaseUrl()}${cleanEndpoint}`;

  // Tentukan token: dari options atau dari storage lokal
  const authToken = !skipAuth ? (token !== undefined ? token : tokenStorage.get()) : null;

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    ...(customHeaders as Record<string, string>),
  };

  const config: RequestInit = {
    ...restOptions,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const res = await fetch(url, config);

    // Parse JSON response
    let json: ApiResponse<T> | ApiErrorResponse;
    try {
      json = await res.json();
    } catch {
      // Fallback jika response bukan JSON (misal 500 error dari server/proxy)
      throw new ApiClientError(
        res.status,
        res.statusText || "Terjadi kesalahan saat memproses data dari server."
      );
    }

    // Handle HTTP Error (4xx, 5xx)
    if (!res.ok) {
      const errorJson = json as ApiErrorResponse;
      const message = errorJson.message || `Request gagal dengan status ${res.status}`;
      const errors = errorJson.errors;

      // Handle 401 Unauthorized: token kadaluarsa atau belum login
      if (res.status === 401 && typeof window !== "undefined") {
        tokenStorage.remove();
      }

      throw new ApiClientError(res.status, message, errors, json);
    }

    return json as ApiResponse<T>;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    // Network error atau koneksi ke backend terputus
    const networkMsg =
      error instanceof Error && error.message.includes("fetch")
        ? "Tidak dapat terhubung ke server backend. Pastikan server Laravel sedang berjalan di " + getApiBaseUrl()
        : error instanceof Error
        ? error.message
        : "Terjadi kesalahan jaringan yang tidak terduga.";

    throw new ApiClientError(0, networkMsg);
  }
}
