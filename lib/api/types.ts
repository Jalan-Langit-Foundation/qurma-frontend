/**
 * Format respons standar backend QURMA (lihat API Contract: "Aturan umum").
 * Sukses: { success: true, message, data }
 * Gagal : { success: false, message, errors? }
 */
export interface ApiSuccessBody<T> {
  success: true;
  message: string;
  data: T;
}

export interface ApiErrorBody {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export type ApiBody<T> = ApiSuccessBody<T> | ApiErrorBody;

/** Error per field dari validasi backend (422), sudah diambil pesan pertamanya. */
export type FieldErrors = Record<string, string>;

/** Daftar berhalaman dari backend (usulan: docs/api-usulan-endpoint.md). */
export interface PaginatedDto<T> {
  items: T[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

/** Berkas biner dari backend (mis. PDF kwitansi). */
export interface BackendFile {
  body: ReadableStream<Uint8Array>;
  contentType: string;
  /** Nama file dari header Content-Disposition backend, bila ada */
  fileName: string | null;
}
