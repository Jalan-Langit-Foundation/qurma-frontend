import { afterEach, describe, expect, it, vi } from "vitest";
import { z } from "zod";
import { ApiError } from "@/lib/api/api-error";
import {
  apiNumber,
  apiYearMonth,
  parseResponse,
} from "@/lib/api/response-schema";

afterEach(() => vi.restoreAllMocks());

describe("apiNumber", () => {
  it("menerima number dan string angka dari kolom decimal Laravel", () => {
    expect(apiNumber.parse(1_600_000)).toBe(1_600_000);
    expect(apiNumber.parse("1600000.00")).toBe(1_600_000);
    expect(apiNumber.parse(" 230000 ")).toBe(230_000);
  });

  it.each([null, "", "Rp1.600.000", "abc", undefined])(
    "menolak %j",
    (value) => {
      expect(apiNumber.safeParse(value).success).toBe(false);
    },
  );
});

describe("apiYearMonth", () => {
  it("hanya YYYY-MM", () => {
    expect(apiYearMonth.safeParse("2027-03").success).toBe(true);
    expect(apiYearMonth.safeParse("2027-13").success).toBe(false);
    expect(apiYearMonth.safeParse("2027-03-01").success).toBe(false);
  });
});

describe("parseResponse", () => {
  const schema = z.object({ total: apiNumber });

  it("data sesuai kontrak → dikembalikan (sudah dinormalisasi)", () => {
    expect(parseResponse(schema, { total: "500" }, "GET /x")).toEqual({
      total: 500,
    });
  });

  it("data rusak → ApiError server + log yang menyebut endpoint", () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    let caught: unknown;
    try {
      parseResponse(schema, { total: null }, "GET /user/dashboard");
    } catch (error) {
      caught = error;
    }
    expect(caught).toBeInstanceOf(ApiError);
    expect((caught as ApiError).kind).toBe("server");
    expect(log.mock.calls[0]?.[0]).toContain("GET /user/dashboard");
  });
});
