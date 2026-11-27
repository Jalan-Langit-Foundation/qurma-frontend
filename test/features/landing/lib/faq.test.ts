import { describe, expect, it } from "vitest";
import { buildFaqContent } from "@/features/landing/lib/content/faq";
import { FALLBACK_PACKAGES } from "@/features/packages";
import { FALLBACK_SCHEDULE, getPaymentDeadline } from "@/features/program";
import { SAVINGS_POLICY } from "@/features/savings";

const FAQ_CONTENT = buildFaqContent(
  FALLBACK_PACKAGES,
  getPaymentDeadline(FALLBACK_SCHEDULE),
);
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

  it('daftar paket memakai nama dari data, tanpa "Domba" dobel', () => {
    const answer = String(
      FAQ_CONTENT.items.find((item) => item.id === "faq-tunaikan-paket")
        ?.answer,
    );
    expect(answer).toContain("Domba Standar (20–25 kg)");
    expect(answer).not.toContain("Domba Domba");
  });

  it("batas pelunasan mengikuti jadwal dari CS QURMA", () => {
    const custom = buildFaqContent(
      FALLBACK_PACKAGES,
      getPaymentDeadline({
        ...FALLBACK_SCHEDULE,
        payoffDeadline: "2027-05-03",
        eidAlAdhaDate: "2027-05-17",
      }),
    );
    const text = custom.items.map((item) => String(item.answer)).join(" ");
    expect(text).toContain("H-14 Iduladha");
  });

  it("lokasi 2027 belum diklaim final", () => {
    expect(answers).toMatch(/tahap pemetaan/);
  });
});
