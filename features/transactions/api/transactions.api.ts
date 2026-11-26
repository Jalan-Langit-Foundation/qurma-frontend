import "server-only";
import { authedRequestWithMeta } from "@/lib/api/authed-request";
import type { PaginationMetaDto } from "@/lib/api/types";
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
