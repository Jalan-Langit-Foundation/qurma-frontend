import { describe, expect, it } from "vitest";
import {
  getStartMonthOptions,
  resolveStartMonth,
  toStartMonthSelectOptions,
} from "@/features/savings/lib/start-months";
import { formatYearMonth } from "@/features/savings/lib/year-month";

const program = {
  openingMonth: "2026-10",
  lastInstallmentMonth: "2027-04",
  maxTenor: 12,
} as const;

describe("getStartMonthOptions", () => {
  it("sebelum program dibuka → mulai dari bulan pembukaan", () => {
    const options = getStartMonthOptions("2026-08", program);
    expect(options[0]).toMatchObject({
      value: "2026-10",
      label: "Oktober 2026",
      tenorMonths: 7,
    });
    expect(options).toHaveLength(7);
  });

  it("bulan yang sudah lewat tidak ditawarkan", () => {
    const options = getStartMonthOptions("2026-11", program);
    expect(options.map((option) => option.value)).toEqual([
      "2026-11",
      "2026-12",
      "2027-01",
      "2027-02",
      "2027-03",
      "2027-04",
    ]);
    expect(options[0]?.tenorMonths).toBe(6);
    expect(options.at(-1)?.tenorMonths).toBe(1);
  });

  it("setelah batas pelunasan → kosong (program ditutup)", () => {
    expect(getStartMonthOptions("2027-05", program)).toEqual([]);
  });
});

describe("getStartMonthOptions mengikuti pengaturan CS QURMA", () => {
  it("lama menabung maksimal membatasi bulan mulai paling awal", () => {
    const options = getStartMonthOptions("2026-08", {
      ...program,
      maxTenor: 4,
    });
    expect(options.map((option) => option.value)).toEqual([
      "2027-01",
      "2027-02",
      "2027-03",
      "2027-04",
    ]);
    expect(options[0]?.tenorMonths).toBe(4);
  });

  it("bulan cicilan terakhir dari admin menjadi batas akhir", () => {
    const options = getStartMonthOptions("2026-11", {
      ...program,
      lastInstallmentMonth: "2027-05",
    });
    expect(options.at(-1)).toMatchObject({ value: "2027-05", tenorMonths: 1 });
    expect(options[0]?.tenorMonths).toBe(7);
  });

  it("bulan pembukaan dari admin dihormati", () => {
    expect(
      getStartMonthOptions("2026-08", {
        ...program,
        openingMonth: "2027-02",
      })[0]?.value,
    ).toBe("2027-02");
  });
});

describe("resolveStartMonth", () => {
  const options = getStartMonthOptions("2026-11", program);

  it("memakai pilihan pengguna bila masih tersedia", () => {
    expect(resolveStartMonth("2027-01", options)).toBe("2027-01");
  });

  it.each(["2026-10", "2027-05", "ngawur", null, undefined])(
    "kembali ke opsi pertama untuk nilai %s",
    (requested) => {
      expect(resolveStartMonth(requested, options)).toBe("2026-11");
    },
  );

  it("null bila tidak ada opsi", () => {
    expect(resolveStartMonth("2026-11", [])).toBeNull();
  });
});

describe("toStartMonthSelectOptions", () => {
  it("menambahkan lama menabung & batas pelunasan ke label", () => {
    const options = getStartMonthOptions("2027-03", program);
    expect(toStartMonthSelectOptions(options, "April 2027")).toEqual([
      {
        value: "2027-03",
        label: `${formatYearMonth("2027-03")} (2 bulan s/d April 2027)`,
      },
      {
        value: "2027-04",
        label: `${formatYearMonth("2027-04")} (1 bulan s/d April 2027)`,
      },
    ]);
  });

  it("kosong bila tidak ada opsi", () => {
    expect(toStartMonthSelectOptions([], "April 2027")).toEqual([]);
  });
});
