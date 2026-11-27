import { describe, expect, it } from "vitest";
import {
  getPaymentDeadline,
  isPastPaymentDeadline,
} from "@/features/program/lib/payment-deadline";
import { FALLBACK_SCHEDULE } from "@/features/program/lib/fallback";
import type { ProgramSchedule } from "@/features/program";
import { formatTanggal } from "@/lib/format";

const schedule = (patch: Partial<ProgramSchedule> = {}): ProgramSchedule => ({
  ...FALLBACK_SCHEDULE,
  eidAlAdhaDate: "2027-05-17",
  payoffDeadline: "2027-05-07",
  eidAlAdhaIsEstimate: true,
  ...patch,
});

describe("getPaymentDeadline (tanggal dari CS QURMA)", () => {
  it("H-n dihitung dari selisih Iduladha dan batas pelunasan", () => {
    const deadline = getPaymentDeadline(schedule());
    expect(deadline.relativeLabel).toBe("H-10 Iduladha");
    expect(deadline.dateLabel).toBe(formatTanggal("2027-05-07"));
    expect(deadline.date).toBe("2027-05-07");
  });

  it("mengikuti perubahan admin, misalnya pelunasan H-14", () => {
    const deadline = getPaymentDeadline(
      schedule({ payoffDeadline: "2027-05-03" }),
    );
    expect(deadline.relativeLabel).toBe("H-14 Iduladha");
    expect(deadline.dateLabel).toBe(formatTanggal("2027-05-03"));
  });

  it("selama Iduladha masih perkiraan, label & catatan menyebutnya", () => {
    const deadline = getPaymentDeadline(schedule());
    expect(deadline.isEstimate).toBe(true);
    expect(deadline.label).toContain("perkiraan");
    expect(deadline.note).toContain("sidang isbat");
  });

  it("setelah tanggal resmi diisi admin, tidak lagi ditandai perkiraan", () => {
    const deadline = getPaymentDeadline(
      schedule({ eidAlAdhaIsEstimate: false }),
    );
    expect(deadline.label).not.toContain("perkiraan");
    expect(deadline.note).toBeNull();
  });

  it("batas di hari Iduladha atau sesudahnya → label netral", () => {
    expect(
      getPaymentDeadline(schedule({ payoffDeadline: "2027-05-17" }))
        .relativeLabel,
    ).toBe("Sebelum Iduladha");
  });
});

describe("isPastPaymentDeadline", () => {
  it("masih terbuka sampai tanggal batas, tutup sehari setelahnya", () => {
    const rules = { payoffDeadline: "2027-05-07" };
    expect(isPastPaymentDeadline("2027-05-07", rules)).toBe(false);
    expect(isPastPaymentDeadline("2027-05-08", rules)).toBe(true);
  });
});
