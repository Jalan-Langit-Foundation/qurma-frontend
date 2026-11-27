import { describe, expect, it } from "vitest";
import { parsePageParam, toPaginated } from "@/lib/api/pagination";

describe("toPaginated", () => {
  it("memetakan item dan meta halaman", () => {
    const result = toPaginated(
      [{ id: 1 }, { id: 2 }],
      { current_page: 2, per_page: 2, total: 5, last_page: 3 },
      (item) => item.id * 10,
    );
    expect(result).toEqual({
      items: [10, 20],
      page: 2,
      perPage: 2,
      total: 5,
      totalPages: 3,
      hasNextPage: true,
      hasPreviousPage: true,
    });
  });

  it("daftar kosong tetap dianggap 1 halaman", () => {
    const result = toPaginated(
      [],
      { current_page: 1, per_page: 10, total: 0, last_page: 0 },
      (item: unknown) => item,
    );
    expect(result.totalPages).toBe(1);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(false);
  });

  it("meta tidak dikirim → satu halaman berisi semua item", () => {
    const result = toPaginated([1, 2, 3], null, (item) => item);
    expect(result).toMatchObject({
      page: 1,
      perPage: 3,
      total: 3,
      totalPages: 1,
      hasNextPage: false,
    });
  });
});

describe("parsePageParam", () => {
  it.each([
    ["3", 3],
    [["2", "5"], 2],
    [undefined, 1],
    ["0", 1],
    ["-1", 1],
    ["abc", 1],
  ] as const)("%s → %s", (input, expected) => {
    expect(parsePageParam(input as string | string[] | undefined)).toBe(
      expected,
    );
  });
});
