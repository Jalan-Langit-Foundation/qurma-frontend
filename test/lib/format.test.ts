import { describe, expect, it } from "vitest";
import {
  formatBulanTahun,
  formatPersen,
  formatRupiah,
  formatRupiahSingkat,
  formatTanggal,
} from "@/lib/format";

describe("format", () => {
  it("formatRupiah", () => {
    expect(formatRupiah(1_900_000)).toBe("Rp1.900.000");
    expect(formatRupiah(-500)).toBe("-Rp500");
    expect(formatRupiah(Number.NaN)).toBe("Rp0");
  });

  it("formatRupiahSingkat: satu gaya rb/jt", () => {
    expect(formatRupiahSingkat(270_000)).toBe("Rp270 rb");
    expect(formatRupiahSingkat(271_500)).toBe("Rp271,5 rb");
    expect(formatRupiahSingkat(1_600_000)).toBe("Rp1,6 jt");
    expect(formatRupiahSingkat(1_495_000)).toBe("Rp1,495 jt");
    expect(formatRupiahSingkat(2_990_000)).toBe("Rp2,99 jt");
    expect(formatRupiahSingkat(500)).toBe("Rp500");
  });

  it("formatRupiahSingkat: approx & compact", () => {
    expect(formatRupiahSingkat(270_000, { approx: true })).toBe("±Rp270 rb");
    expect(formatRupiahSingkat(270_000, { compact: true })).toBe("270rb");
    expect(formatRupiahSingkat(1_600_000, { compact: true })).toBe("1,6jt");
  });

  it("formatRupiahSingkat: nilai tidak valid jadi Rp0", () => {
    expect(formatRupiahSingkat(Number.NaN)).toBe("Rp0");
    expect(formatRupiahSingkat(-5_000)).toBe("Rp0");
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
