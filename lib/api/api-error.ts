import type { FieldErrors } from "./types";

export type ApiErrorKind =
  | "validation"
  | "unauthenticated"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "rate_limited"
  | "server"
  | "network"
  | "timeout";

const FRIENDLY_MESSAGES: Record<ApiErrorKind, string> = {
  validation: "Data yang diisi belum sesuai. Silakan periksa kembali.",
  unauthenticated: "Sesi Anda telah berakhir. Silakan masuk kembali.",
  forbidden: "Anda tidak memiliki akses ke halaman ini.",
  not_found: "Data tidak ditemukan.",
  conflict: "Permintaan tidak dapat diproses karena data sudah ada.",
  rate_limited:
    "Terlalu banyak percobaan. Silakan tunggu sebentar lalu coba lagi.",
  server: "Server sedang mengalami kendala. Silakan coba beberapa saat lagi.",
  network:
    "Tidak dapat terhubung ke server. Periksa koneksi internet Anda lalu coba lagi.",
  timeout: "Server terlalu lama merespons. Silakan coba beberapa saat lagi.",
};

export const ACTION_NETWORK_ERROR =
  "Terjadi kendala jaringan. Silakan coba beberapa saat lagi.";

export function kindFromStatus(status: number): ApiErrorKind {
  switch (status) {
    case 401:
      return "unauthenticated";
    case 403:
      return "forbidden";
    case 404:
      return "not_found";
    case 409:
      return "conflict";
    case 422:
      return "validation";
    case 429:
      return "rate_limited";
    default:
      return "server";
  }
}

export class ApiError extends Error {
  readonly kind: ApiErrorKind;
  readonly status: number;
  readonly fieldErrors: FieldErrors;

  constructor(options: {
    kind: ApiErrorKind;
    status: number;
    message?: string;
    fieldErrors?: FieldErrors;
  }) {
    super(options.message || FRIENDLY_MESSAGES[options.kind]);
    this.name = "ApiError";
    this.kind = options.kind;
    this.status = options.status;
    this.fieldErrors = options.fieldErrors ?? {};
  }
}

export function toUserMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (
      error.kind === "server" ||
      error.kind === "network" ||
      error.kind === "timeout"
    ) {
      return FRIENDLY_MESSAGES[error.kind];
    }
    return error.message;
  }
  return FRIENDLY_MESSAGES.server;
}
