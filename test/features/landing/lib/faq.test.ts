import { describe, expect, it } from "vitest";
import { FAQ_CONTENT } from "@/features/landing/lib/content/faq";
import { SAVINGS_POLICY } from "@/features/savings";

const questions = FAQ_CONTENT.items.map((item) => item.question).join("\n");
const answers = FAQ_CONTENT.items.map((item) => String(item.answer)).join(" ");

describe("FAQ (Brief V1.1 H.1 & H.3)", () => {
  it("id pertanyaan unik", () => {
    const ids = FAQ_CONTENT.items.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("items = gabungan semua grup", () => {
    const total = FAQ_CONTENT.groups.reduce((n, g) => n + g.items.length, 0);
    expect(FAQ_CONTENT.items).toHaveLength(total);
  });

  it("memuat FAQ dua jalur (H.1)", () => {
    expect(questions).toMatch(/Apa itu Tunaikan Qurbanmu\?/);
    expect(questions).toMatch(/memilih paket berdasarkan bobot dan harga/);
    expect(questions).toMatch(/pembayaran dan konfirmasinya/);
  });

  it.each([
    ["wajib setor tiap bulan", /wajib menyetor setiap bulan/],
    ["minimum setoran", /minimum setoran/],
    ["cek saldo", /mengecek saldo/],
    ["pembatalan", /dibatalkan/],
    ["tidak lunas", /tidak lunas/],
    ["lokasi", /lokasi pelaksanaan/],
    ["laporan", /dokumentasi dan pelaporan/],
  ])("memuat pertanyaan tabungan: %s (H.3)", (_, pattern) => {
    expect(questions).toMatch(pattern);
  });

  it("menyebut minimum Rp100.000 dan setoran fleksibel", () => {
    expect(answers).toContain("Rp100.000");
    expect(answers).toMatch(/fleksibel/);
  });

  it("tidak menayangkan ketentuan H.3 sebelum disahkan", () => {
    if (SAVINGS_POLICY.approved) return;
    expect(answers).not.toMatch(/hari kerja|Sedekah Daging Qurban|100%/);
    expect(answers).toMatch(/Syarat & Ketentuan yang telah disahkan/);
  });

  it("lokasi 2027 belum diklaim final", () => {
    expect(answers).toMatch(/tahap pemetaan/);
  });
});
