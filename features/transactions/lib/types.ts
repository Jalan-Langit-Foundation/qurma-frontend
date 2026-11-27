import type { Paginated } from "@/lib/api/pagination";

export interface Transaction {
  id: number;
  savingId: number;
  packageName: string;
  amount: number;
  paidAt: string;
  note: string | null;
}

export type TransactionSort = "paid_at" | "-paid_at" | "amount" | "-amount";

export interface TransactionListQuery {
  page?: number;
  perPage?: number;
  savingId?: number;
  month?: string;
  from?: string;
  to?: string;
  sort?: TransactionSort;
}

export interface TransactionPage extends Paginated<Transaction> {
  totalAmount: number;
}

export const DEFAULT_TRANSACTIONS_PER_PAGE = 10;
