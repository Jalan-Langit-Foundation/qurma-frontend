import { describe, expect, it } from "vitest";
import type { TransactionDto } from "@/features/transactions/api/transactions.dto";
import {
  toTransaction,
  toTransactionListQuery,
} from "@/features/transactions/api/transactions.mapper";

const dto: TransactionDto = {
  id: 12,
  saving_id: 1,
  package: { code: "start", name: "Start" },
  amount: 271_500,
  paid_at: "2026-11-05",
  note: "Setoran November",
  receipt_number: "QRM-2026-000012",
  created_at: "2026-11-05T10:15:00+07:00",
};

describe("toTransaction", () => {
  it("memetakan contoh usulan kontrak", () => {
    expect(toTransaction(dto)).toEqual({
      id: 12,
      savingId: 1,
      packageName: "Start",
      amount: 271_500,
      paidAt: "2026-11-05",
      note: "Setoran November",
      receiptNumber: "QRM-2026-000012",
      hasReceipt: true,
      recordedAt: "2026-11-05T10:15:00+07:00",
    });
  });

  it.each([null, "", "   "])(
    "nomor kwitansi %j → kwitansi belum tersedia",
    (receipt) => {
      const transaction = toTransaction({ ...dto, receipt_number: receipt });
      expect(transaction.hasReceipt).toBe(false);
      expect(transaction.receiptNumber).toBeNull();
    },
  );
});

describe("toTransactionListQuery", () => {
  it("default halaman 1, 10 per halaman", () => {
    expect(toTransactionListQuery({})).toEqual({
      page: 1,
      per_page: 10,
      saving_id: undefined,
    });
  });

  it("halaman di bawah 1 dinaikkan ke 1", () => {
    expect(
      toTransactionListQuery({ page: 0, perPage: 20, savingId: 3 }),
    ).toEqual({ page: 1, per_page: 20, saving_id: 3 });
  });
});
