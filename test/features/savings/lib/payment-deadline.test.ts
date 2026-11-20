import { describe, expect, it } from "vitest";
import { PROGRAM } from "@/config/program";
import {
  isPastPaymentDeadline,
  PAYMENT_DEADLINE,
} from "@/features/savings/lib/payment-deadline";
import { formatTanggal } from "@/lib/format";

describe("batas pelunasan H-10 Iduladha", () => {
  it("label diturunkan dari tanggal Iduladha di config", () => {
    expect(PAYMENT_DEADLINE.relativeLabel).toBe("H-10 Iduladha");
    expect(PAYMENT_DEADLINE.dateLabel).toBe(
      formatTanggal(PROGRAM.paymentDeadlineDate),
    );
    expect(PAYMENT_DEADLINE.label).toContain(PAYMENT_DEADLINE.dateLabel);
  });

  it("selama belum sidang isbat, tanggal ditandai perkiraan", () => {
    expect(PAYMENT_DEADLINE.isEstimate).toBe(!PROGRAM.eidAlAdhaConfirmed);
    if (PAYMENT_DEADLINE.isEstimate) {
      expect(PAYMENT_DEADLINE.label).toContain("perkiraan");
      expect(PAYMENT_DEADLINE.note).toContain("sidang isbat");
    } else {
      expect(PAYMENT_DEADLINE.note).toBeNull();
    }
  });

  it("tabungan masih terbuka sampai tanggal batas, tutup sehari setelahnya", () => {
    const deadline = PROGRAM.paymentDeadlineDate;
    const [y, m, d] = deadline.split("-").map(Number);
    const nextDay = new Date(Date.UTC(y ?? 0, (m ?? 1) - 1, (d ?? 1) + 1))
      .toISOString()
      .slice(0, 10);

    expect(isPastPaymentDeadline(deadline)).toBe(false);
    expect(isPastPaymentDeadline(nextDay)).toBe(true);
  });
});
