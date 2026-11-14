import type { Transaction, TransactionListQuery } from "../lib/types";
import { DEFAULT_TRANSACTIONS_PER_PAGE } from "../lib/types";
import type {
  TransactionDto,
  TransactionListQueryDto,
} from "./transactions.dto";

export function toTransaction(dto: TransactionDto): Transaction {
  const receiptNumber = dto.receipt_number?.trim() || null;
  return {
    id: dto.id,
    savingId: dto.saving_id,
    packageName: dto.package.name,
    amount: dto.amount,
    paidAt: dto.paid_at,
    note: dto.note,
    receiptNumber,
    hasReceipt: receiptNumber !== null,
    recordedAt: dto.created_at,
  };
}

export function toTransactionListQuery(
  query: TransactionListQuery,
): TransactionListQueryDto {
  return {
    page: Math.max(1, query.page ?? 1),
    per_page: query.perPage ?? DEFAULT_TRANSACTIONS_PER_PAGE,
    saving_id: query.savingId,
  };
}
