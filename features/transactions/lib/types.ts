export interface Transaction {
  id: number;
  savingId: number;
  packageName: string;
  amount: number;
  /** "YYYY-MM-DD" */
  paidAt: string;
  note: string | null;
  receiptNumber: string | null;
  /** true bila kwitansi bisa diunduh */
  hasReceipt: boolean;
  recordedAt: string;
}

export interface TransactionListQuery {
  page?: number;
  perPage?: number;
  /** Hanya transaksi dari tabungan tertentu */
  savingId?: number;
}

export const DEFAULT_TRANSACTIONS_PER_PAGE = 10;
