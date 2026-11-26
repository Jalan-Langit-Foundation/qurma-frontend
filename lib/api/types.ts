/**
 * Format respons standar backend QURMA (lihat API Contract: "Aturan umum").
 * Sukses: { success: true, message, data }
 * Gagal : { success: false, message, errors? }
 */
export interface ApiSuccessBody<T> {
  success: true;
  message: string;
  data: T;
  meta?: unknown;
}

export interface ApiErrorBody {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
}

export type ApiBody<T> = ApiSuccessBody<T> | ApiErrorBody;

/** Error per field dari validasi backend (422), sudah diambil pesan pertamanya. */
export type FieldErrors = Record<string, string>;

/** `meta` pagination, sejajar dengan `data` (API Contract bagian 9). */
export interface PaginationMetaDto {
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}
