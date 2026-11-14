/**
 * USULAN kontrak (belum ada di API Contract). Lihat docs/api-usulan-endpoint.md.
 * Bila backend memakai bentuk lain, cukup ubah file ini dan mapper-nya.
 */

/** Satu setoran yang sudah dicatat admin. */
export interface TransactionDto {
  id: number;
  saving_id: number;
  package: { code: string; name: string };
  amount: number;
  /** Tanggal setoran diterima, "YYYY-MM-DD" */
  paid_at: string;
  note: string | null;
  /** Nomor kwitansi; null = kwitansi belum diterbitkan */
  receipt_number: string | null;
  /** Waktu dicatat admin (ISO 8601) */
  created_at: string;
}

/** Query GET /transactions */
export interface TransactionListQueryDto {
  page?: number;
  per_page?: number;
  saving_id?: number;
}
