import { describe, expect, it } from "vitest";
import { dashboardDtoSchema } from "@/features/dashboard/api/dashboard.dto";

const dashboard = {
  user: { name: "Budi Santoso", email: "budi@mail.com" },
  savings_count: 1,
  has_saving: true,
  saving: {
    id: 1,
    package: { code: "standar", name: "Domba Standar" },
    program_year: 2027,
    status: "active",
    target_amount: 1_600_000,
    total_paid: 920_000,
    paid_this_month: 230_000,
    remaining_amount: 680_000,
    progress_percent: 57,
    tenor_months: 7,
    start_month: "2026-11",
    end_month: "2027-05",
    monthly_amount: 230_000,
    last_installment_amount: 220_000,
    next_installment: null,
    journey: {
      target_selected: true,
      saving_started: true,
      half_reached: true,
      target_reached: false,
      animal_prepared: false,
      qurban_done: false,
      report_received: false,
    },
  },
  insights: {
    month_summary: {
      month: "2027-02",
      installment: {
        amount: 230_000,
        paid_amount: 230_000,
        remaining_amount: 0,
        status: "paid",
      },
      deposited: 230_000,
    },
    daily_estimate: 7_667,
    schedule_position: {
      status: "on_track",
      amount_behind: 0,
      months_ahead: 0,
    },
    upgrade_suggestion: {
      from: { code: "standar", name: "Domba Standar", price: 1_600_000 },
      to: { code: "medium", name: "Domba Medium", price: "2200000.00" },
      additional_amount: 600_000,
    },
  },
};

describe("dashboardDtoSchema (GET /user/dashboard)", () => {
  it("contoh API Contract lolos, harga string diubah ke number", () => {
    const parsed = dashboardDtoSchema.parse(dashboard);
    expect(parsed.insights?.upgrade_suggestion?.to.price).toBe(2_200_000);
  });

  it("belum punya tabungan → saving & insights null tetap sah", () => {
    expect(
      dashboardDtoSchema.safeParse({
        ...dashboard,
        has_saving: false,
        saving: null,
        insights: null,
      }).success,
    ).toBe(true);
  });

  it("user ringkas / tanpa user tetap lolos (user lengkap dari /auth/me)", () => {
    expect(
      dashboardDtoSchema.safeParse({ ...dashboard, user: undefined }).success,
    ).toBe(true);
    expect(
      dashboardDtoSchema.safeParse({ ...dashboard, user: { name: "Budi" } })
        .success,
    ).toBe(true);
  });

  it.each([
    [
      "posisi jadwal di luar kontrak",
      {
        insights: {
          ...dashboard.insights,
          schedule_position: {
            status: "late",
            amount_behind: 0,
            months_ahead: 0,
          },
        },
      },
    ],
    ["saving rusak", { saving: { ...dashboard.saving, total_paid: "banyak" } }],
  ])("ditolak: %s", (_, patch) => {
    expect(
      dashboardDtoSchema.safeParse({ ...dashboard, ...patch }).success,
    ).toBe(false);
  });
});
