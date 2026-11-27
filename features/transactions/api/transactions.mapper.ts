import type { PaginationMetaDto } from "@/lib/api/types";
import { toPaginated } from "@/lib/api/pagination";
import type {
  Transaction,
  TransactionListQuery,
  TransactionPage,
} from "../lib/types";
import { DEFAULT_TRANSACTIONS_PER_PAGE } from "../lib/types";
import type {
  TransactionDto,
  TransactionListDto,
  TransactionListQueryDto,
} from "./transactions.dto";

export function toTransaction(dto: TransactionDto): Transaction {
  return {
    id: dto.id,
    savingId: dto.saving_id,
    packageName: dto.package.name,
    amount: dto.amount,
    paidAt: dto.paid_at,
    note: dto.note,
  };
}

export function toTransactionPage(
  data: TransactionListDto,
  meta: PaginationMetaDto | null,
): TransactionPage {
  return {
    ...toPaginated(data.transactions, meta, toTransaction),
    totalAmount: data.total_amount,
  };
}

export function toTransactionListQuery(
  query: TransactionListQuery,
): TransactionListQueryDto {
  return {
    page: Math.max(1, query.page ?? 1),
    per_page: query.perPage ?? DEFAULT_TRANSACTIONS_PER_PAGE,
    saving_id: query.savingId,
    month: query.month,
    from: query.from,
    to: query.to,
    sort: query.sort,
  };
}
