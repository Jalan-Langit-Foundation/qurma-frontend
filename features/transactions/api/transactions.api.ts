import "server-only";
import {
  authedFileRequest,
  authedRequest,
  nullIfNotFound,
} from "@/lib/api/authed-request";
import { toPaginated, type Paginated } from "@/lib/api/pagination";
import type { BackendFile, PaginatedDto } from "@/lib/api/types";
import type { Transaction, TransactionListQuery } from "../lib/types";
import type { TransactionDto } from "./transactions.dto";
import { toTransaction, toTransactionListQuery } from "./transactions.mapper";

/**
 * GET /transactions → daftar setoran milik pengguna (terbaru lebih dulu).
 * @public Disiapkan: halaman /transaksi bila NEXT_PUBLIC_FEATURE_TRANSACTIONS=true.
 */
export async function getTransactions(
  query: TransactionListQuery = {},
): Promise<Paginated<Transaction>> {
  const data = await authedRequest<PaginatedDto<TransactionDto>>(
    "/transactions",
    { query: { ...toTransactionListQuery(query) } },
  );
  return toPaginated(data, toTransaction);
}

/**
 * GET /transactions/{id}/receipt → PDF kwitansi.
 * null = transaksi tidak ada, bukan milik pengguna, atau kwitansi belum terbit.
 */
export function getReceiptFile(
  transactionId: number,
): Promise<BackendFile | null> {
  return nullIfNotFound(
    authedFileRequest(`/transactions/${transactionId}/receipt`),
  );
}
