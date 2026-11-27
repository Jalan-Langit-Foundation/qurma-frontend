import { describe, expect, it } from "vitest";
import {
  savingDepositsDtoSchema,
  savingResponseDtoSchema,
} from "@/features/savings/api/savings.dto";

const savingSummaryFixture = {
  id: 1,
  package: { code: "standar", name: "Domba Standar" },
  program_year: 2027,
  status: "active",
  target_amount: 1_600_000,
  total_paid: 920_000,
  paid_this_month: 230_000,
  remaining_amount: 680_000,
  progress_percent: 57.5,
  tenor_months: 7,
  start_month: "2026-11",
  end_month: "2027-05",
  monthly_amount: 230_000,
  last_installment_amount: 220_000,
  next_installment: { month: "2027-03", amount: 230_000 },
  journey: {
    target_selected: true,
    saving_started: true,
    half_reached: true,
    target_reached: false,
    animal_prepared: false,
    qurban_done: false,
    report_received: false,
  },
};

describe("savingResponseDtoSchema (GET /savings/current)", () => {
  it("contoh API Contract lolos", () => {
    expect(
      savingResponseDtoSchema.safeParse({ saving: savingSummaryFixture })
        .success,
    ).toBe(true);
  });

  it("nominal string dari Laravel diubah ke number", () => {
    const parsed = savingResponseDtoSchema.parse({
      saving: { ...savingSummaryFixture, target_amount: "1600000.00" },
    });
    expect(parsed.saving.target_amount).toBe(1_600_000);
  });

  it.each([
    ["status di luar kontrak", { status: "paused" }],
    ["bulan bukan YYYY-MM", { start_month: "November 2026" }],
    ["nominal kosong", { total_paid: null }],
    ["journey hilang", { journey: undefined }],
  ])("ditolak: %s", (_, patch) => {
    expect(
      savingResponseDtoSchema.safeParse({
        saving: { ...savingSummaryFixture, ...patch },
      }).success,
    ).toBe(false);
  });

  it("field tambahan dari backend diabaikan, bukan error", () => {
    const parsed = savingResponseDtoSchema.parse({
      saving: { ...savingSummaryFixture, created_at: "2026-11-01" },
    });
    expect(parsed.saving).not.toHaveProperty("created_at");
  });
});

describe("savingDepositsDtoSchema (GET /savings/{id}/deposits)", () => {
  const deposits = {
    saving_id: 1,
    target_amount: 1_600_000,
    total_paid: 230_000,
    schedule: [
      {
        installment_no: 1,
        month: "2026-11",
        amount: 230_000,
        paid_amount: 230_000,
        remaining_amount: 0,
        status: "paid",
        is_final: false,
      },
    ],
    deposits: [
      { id: 1, amount: "230000.00", paid_at: "2026-11-05", note: null },
    ],
  };

  it("contoh lolos, nominal setoran string diterima", () => {
    const parsed = savingDepositsDtoSchema.parse(deposits);
    expect(parsed.deposits[0]?.amount).toBe(230_000);
  });

  it("status jadwal di luar kontrak ditolak", () => {
    expect(
      savingDepositsDtoSchema.safeParse({
        ...deposits,
        schedule: [{ ...deposits.schedule[0], status: "late" }],
      }).success,
    ).toBe(false);
  });
});
