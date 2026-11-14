import { describe, expect, it } from "vitest";
import { PROGRAM } from "@/config/program";

describe("config/program", () => {
  it("semua label diturunkan dari tahun program", () => {
    expect(PROGRAM.name).toBe(`QURMA ${PROGRAM.year}`);
    expect(PROGRAM.fullName).toBe(`Tabungan Qurban QURMA ${PROGRAM.year}`);
    expect(PROGRAM.hijriLabel).toBe(`${PROGRAM.hijriYear} H`);
    expect(PROGRAM.periodLabel).toBe(
      `${PROGRAM.hijriYear} H / ${PROGRAM.year} M`,
    );
    expect(PROGRAM.previousName).toBe(`QURMA ${PROGRAM.year - 1}`);
  });

  it("pelunasan berakhir di tahun program, setelah bulan pembukaan", () => {
    expect(PROGRAM.finalPaymentMonth.startsWith(String(PROGRAM.year))).toBe(
      true,
    );
    expect(PROGRAM.openingMonth < PROGRAM.finalPaymentMonth).toBe(true);
  });
});
