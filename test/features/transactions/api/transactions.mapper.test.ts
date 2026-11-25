import { describe, expect, it } from "vitest";
import type { TransactionDto } from "@/features/transactions/api/transactions.dto";
import {
  toTransaction,
  toTransactionListQuery,
  toTransactionPage,
} from "@/features/transactions/api/transactions.mapper";

const dto: TransactionDto = {
  id: 4,
  saving_id: 1,
  package: { code: "standar", name: "Domba Standar" },
  amount: 230_000,
  paid_at: "2027-02-03",
  note: null,
};

describe("toTransaction", () => {
  it("memetakan contoh API Contract bagian 9", () => {
    expect(toTransaction(dto)).toEqual({
      id: 4,
      savingId: 1,
      packageName: "Domba Standar",
      amount: 230_000,
      paidAt: "2027-02-03",
      note: null,
    });
  });
});

describe("toTransactionPage", () => {
  it("menggabungkan data.transactions, total_amount, dan meta", () => {
    const page = toTransactionPage(
      { total_amount: 920_000, transactions: [dto, { ...dto, id: 3 }] },
      { current_page: 1, per_page: 2, total: 4, last_page: 2 },
    );
    expect(page.items.map((item) => item.id)).toEqual([4, 3]);
    expect(page).toMatchObject({
      totalAmount: 920_000,
      page: 1,
      perPage: 2,
      total: 4,
      totalPages: 2,
      hasNextPage: true,
      hasPreviousPage: false,
    });
  });

  it("tanpa meta → dianggap satu halaman", () => {
    const page = toTransactionPage(
      { total_amount: 230_000, transactions: [dto] },
      null,
    );
    expect(page).toMatchObject({ total: 1, totalPages: 1, hasNextPage: false });
  });
});

describe("toTransactionListQuery", () => {
  it("default halaman 1, 10 per halaman", () => {
    expect(toTransactionListQuery({})).toEqual({
      page: 1,
      per_page: 10,
      saving_id: undefined,
      month: undefined,
      from: undefined,
      to: undefined,
      sort: undefined,
    });
  });

  it("meneruskan filter & urutan dari kontrak", () => {
    expect(
      toTransactionListQuery({
        page: 0,
        perPage: 20,
        savingId: 3,
        month: "2027-02",
        sort: "-amount",
      }),
    ).toMatchObject({
      page: 1,
      per_page: 20,
      saving_id: 3,
      month: "2027-02",
      sort: "-amount",
    });
  });
});
