import "server-only";
import {
  authedFileRequest,
  authedRequestWithMeta,
  nullIfNotFound,
} from "@/lib/api/authed-request";
import type { BackendFile, PaginationMetaDto } from "@/lib/api/types";
import type { TransactionListQuery, TransactionPage } from "../lib/types";
import type { TransactionListDto } from "./transactions.dto";
import {
  toTransactionListQuery,
  toTransactionPage,
} from "./transactions.mapper";

export async function getTransactions(
  query: TransactionListQuery = {},
): Promise<TransactionPage> {
  const { data, meta } = await authedRequestWithMeta<
    TransactionListDto,
    PaginationMetaDto
  >("/transactions", { query: { ...toTransactionListQuery(query) } });
  return toTransactionPage(data, meta);
}

/**
 * GET /transactions/{id}/receipt → PDF kwitansi.
 * Belum ada di API Contract ("bukti setoran PDF" menyusul); tetap mati lewat
 * NEXT_PUBLIC_FEATURE_RECEIPTS sampai endpoint tersedia.
 * null = transaksi tidak ada, bukan milik pengguna, atau kwitansi belum terbit.
 */
export function getReceiptFile(
  transactionId: number,
): Promise<BackendFile | null> {
  return nullIfNotFound(
    authedFileRequest(`/transactions/${transactionId}/receipt`),
  );
}
