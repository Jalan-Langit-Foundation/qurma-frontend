import { describe, expect, it } from "vitest";
import { buildTerms } from "@/features/legal/lib/terms";
import { FALLBACK_SCHEDULE, getPaymentDeadline } from "@/features/program";
import { SAVINGS_POLICY } from "@/features/savings";

const build = (websiteRegistration: boolean) =>
  buildTerms({
    paymentDeadline: getPaymentDeadline(FALLBACK_SCHEDULE),
    schedule: FALLBACK_SCHEDULE,
    websiteRegistration,
  });

const TERMS = build(false);
const text = JSON.stringify(TERMS);

describe("S&K sesuai Brief V1.1 (E.3, G.2, H.2, H.3)", () => {
  it("memakai istilah CS QURMA, bukan Admin", () => {
    expect(text).not.toMatch(/\bAdmin\b/);
    expect(text).toContain("CS QURMA");
  });

  it("pembatalan mengikuti usulan H.3 (angka dari SAVINGS_POLICY)", () => {
    expect(text).toContain(
      `pengembalian ${SAVINGS_POLICY.refundPercent}% dari saldo terverifikasi, tanpa potongan`,
    );
    expect(text).toContain(`${SAVINGS_POLICY.refundWorkingDays} hari kerja`);
    expect(text).not.toMatch(/14 hari kerja|biaya transfer/);
  });

  it("saldo belum lunas dialihkan menjadi Sedekah Daging Qurban berdasarkan akad", () => {
    expect(text).toContain(SAVINGS_POLICY.unpaidTransferProgram);
    expect(text).toMatch(/menyetujui akad/);
    expect(text).not.toMatch(/program qurban tahun berikutnya/);
  });

  it("tidak mengklaim harga tetap selama periode (E.3)", () => {
    expect(text).not.toMatch(/tidak berubah selama periode/);
  });

  it("menyebut minimum setoran & setoran fleksibel (H.2)", () => {
    expect(text).toContain("Rp100.000");
    expect(text).toMatch(/Tidak ada kewajiban menyetor setiap bulan/);
  });

  it("tidak menyinggung akun/kata sandi selama registrasi belum dibuka (G.2)", () => {
    expect(text).not.toMatch(/kata sandi|membuat akun|data akun/);
  });

  it("setelah registrasi website dibuka, S&K menyebut akun", () => {
    expect(JSON.stringify(build(true))).toMatch(/membuat akun/);
  });

  it("batas pelunasan & bulan mulai mengikuti jadwal CS QURMA", () => {
    const custom = buildTerms({
      paymentDeadline: getPaymentDeadline({
        ...FALLBACK_SCHEDULE,
        payoffDeadline: "2027-05-03",
        eidAlAdhaDate: "2027-05-17",
      }),
      schedule: { openingMonth: "2026-12" },
      websiteRegistration: false,
    });
    const customText = JSON.stringify(custom);
    expect(customText).toContain("H-14 Iduladha");
    expect(customText).toContain("Desember 2026");
  });

  it("menampilkan catatan draf selama ketentuan belum disahkan", () => {
    if (SAVINGS_POLICY.approved) return;
    expect(TERMS.draftNote).toMatch(/menunggu pengesahan/);
  });
});
