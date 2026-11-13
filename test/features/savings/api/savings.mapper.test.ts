import { describe, expect, it } from "vitest";
import type { SavingSummaryDto } from "@/features/savings/api/savings.dto";
import {
  toCreateSavingRequest,
  toInstallment,
  toSaving,
} from "@/features/savings/api/savings.mapper";

const baseDto: SavingSummaryDto = {
  id: 7,
  package: { code: "start", name: "Start" },
  program_year: 2027,
  status: "active",
  target_amount: 1_900_000,
  total_paid: 814_500,
  remaining_amount: 1_085_500,
  progress_percent: 43,
  tenor_months: 7,
  start_month: "2026-10",
  end_month: "2027-04",
  monthly_amount: 271_500,
  last_installment_amount: 271_000,
  next_installment: { month: "2027-01", amount: 271_500 },
  journey: {
    target_selected: true,
    saving_started: true,
    half_reached: false,
    target_reached: false,
    animal_prepared: false,
    qurban_done: false,
    report_received: false,
  },
};

describe("toSaving", () => {
  it("memetakan DTO ke model domain", () => {
    const saving = toSaving(baseDto);
    expect(saving).toMatchObject({
      id: 7,
      packageId: "start",
      startMonth: "2026-10",
      nextInstallment: { month: "2027-01", amount: 271_500 },
    });
    expect(saving.journey.find((step) => step.current)?.id).toBe(3);
  });

  it("persen dihitung ulang dengan aturan yang sama di seluruh aplikasi (dibulatkan ke bawah)", () => {
    expect(toSaving(baseDto).progressPercent).toBe(42);
  });

  it("kode paket tidak dikenal → packageId null, nama tetap ditampilkan", () => {
    const saving = toSaving({
      ...baseDto,
      package: { code: "grade-a", name: "Grade A" },
    });
    expect(saving.packageId).toBeNull();
    expect(saving.packageName).toBe("Grade A");
  });

  it("menolak format bulan yang rusak dari backend", () => {
    expect(() => toSaving({ ...baseDto, start_month: "Oktober" })).toThrow(
      /start_month/,
    );
  });
});

describe("toInstallment", () => {
  it("tidak mengarang tanggal jatuh tempo / tanggal bayar", () => {
    const installment = toInstallment({
      installment_no: 1,
      month: "2026-10",
      amount: 271_500,
      paid_amount: 271_500,
      remaining_amount: 0,
      status: "paid",
      is_final: false,
    });

    expect(installment).toEqual({
      installmentNo: 1,
      month: "2026-10",
      amount: 271_500,
      paidAmount: 271_500,
      remainingAmount: 0,
      status: "paid",
      isFinal: false,
    });
    expect(installment).not.toHaveProperty("paidDate");
    expect(installment).not.toHaveProperty("dueDate");
  });
});

describe("toCreateSavingRequest", () => {
  it("mengirim tenor, tapi tidak mengirim nominal setoran (backend yang menghitung)", () => {
    expect(
      toCreateSavingRequest({
        packageId: "plus",
        startMonth: "2026-12",
        tenorMonths: 5,
      }),
    ).toEqual({
      package_code: "plus",
      start_month: "2026-12",
      tenor_months: 5,
    });
  });
});
