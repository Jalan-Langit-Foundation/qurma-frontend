export interface TransactionDto {
  id: number;
  saving_id: number;
  package: { code: string; name: string };
  amount: number;
  paid_at: string;
  note: string | null;
}

export interface TransactionListDto {
  total_amount: number;
  transactions: TransactionDto[];
}

export type TransactionSortDto = "paid_at" | "-paid_at" | "amount" | "-amount";

export interface TransactionListQueryDto {
  page?: number;
  per_page?: number;
  saving_id?: number;
  month?: string;
  from?: string;
  to?: string;
  sort?: TransactionSortDto;
}
