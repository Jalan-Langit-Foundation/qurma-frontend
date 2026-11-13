import { describe, expect, it } from "vitest";
import {
  formatBulanTahun,
  formatPersen,
  formatRupiah,
  formatRupiahJuta,
  formatRupiahRibu,
  formatTanggal,
} from "@/lib/format";

describe("format", () => {
  it("formatRupiah", () => {
    expect(formatRupiah(1_900_000)).toBe("Rp1.900.000");
    expect(formatRupiah(-500)).toBe("-Rp500");
    expect(formatRupiah(Number.NaN)).toBe("Rp0");
  });

  it("formatRupiahRibu dibulatkan ke bawah", () => {
    expect(formatRupiahRibu(271_500)).toBe("±Rp271 ribu");
    expect(formatRupiahRibu(271_500, { unit: "rb" })).toBe("±Rp271 rb");
    expect(formatRupiahRibu(0)).toBe("±Rp0");
  });

  it("formatRupiahJuta", () => {
    expect(formatRupiahJuta(1_900_000)).toBe("Rp 1,9 Jt");
    expect(formatRupiahJuta(2_990_000)).toBe("Rp 2,99 Jt");
  });

  it("formatPersen", () => {
    expect(formatPersen(54.4)).toBe("54%");
  });

  it("tanggal & bulan tidak bergeser karena zona waktu", () => {
    expect(formatTanggal("2026-12-15")).toBe("15 Desember 2026");
    expect(formatBulanTahun("2026-10")).toBe("Oktober 2026");
    expect(formatBulanTahun("2027-01-01")).toBe("Januari 2027");
  });
});
