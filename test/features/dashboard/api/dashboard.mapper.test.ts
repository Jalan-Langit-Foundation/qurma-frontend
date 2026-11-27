import { describe, expect, it } from "vitest";
import { toDashboardData } from "@/features/dashboard/api/dashboard.mapper";
import type {
  DashboardDto,
  DashboardInsightsDto,
} from "@/features/dashboard/api/dashboard.dto";
import type { SavingSummaryDto } from "@/features/savings/api/savings.dto";

const user = {
  id: 1,
  name: "Budi Santoso",
  email: "budi@mail.com",
  phone: "081234567890",
  role: "user" as const,
};

const saving: SavingSummaryDto = {
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

// Contoh persis dari API Contract bagian 7
const insights: DashboardInsightsDto = {
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
  daily_estimate: 7667,
  schedule_position: { status: "on_track", amount_behind: 0, months_ahead: 0 },
  upgrade_suggestion: {
    from: { code: "standar", name: "Domba Standar", price: 1_600_000 },
    to: { code: "medium", name: "Domba Medium", price: 2_200_000 },
    additional_amount: 600_000,
  },
};

describe("toDashboardData (API Contract bagian 7)", () => {
  it("belum punya tabungan → saving & insights null", () => {
    const dto: DashboardDto = {
      savings_count: 0,
      has_saving: false,
      saving: null,
      insights: null,
    };
    expect(toDashboardData(dto, user)).toEqual({
      user,
      savingsCount: 0,
      saving: null,
      insights: null,
    });
  });

  it("memetakan tabungan dan insights", () => {
    const data = toDashboardData(
      {
        savings_count: 1,
        has_saving: true,
        saving,
        insights,
      },
      user,
    );

    expect(data.savingsCount).toBe(1);
    expect(data.saving).toMatchObject({
      packageName: "Domba Standar",
      paidThisMonth: 230_000,
      startMonth: "2026-11",
    });
    expect(data.insights).toEqual({
      monthSummary: {
        month: "2027-02",
        installment: {
          amount: 230_000,
          paidAmount: 230_000,
          remainingAmount: 0,
          status: "paid",
        },
        deposited: 230_000,
      },
      dailyEstimate: 7667,
      schedulePosition: { status: "on_track", amountBehind: 0, monthsAhead: 0 },
      upgradeSuggestion: {
        from: { packageId: "standar", name: "Domba Standar", price: 1_600_000 },
        to: { packageId: "medium", name: "Domba Medium", price: 2_200_000 },
        additionalAmount: 600_000,
      },
    });
  });

  it("cicilan bulan ini di luar jadwal & tanpa saran upgrade → null", () => {
    const data = toDashboardData(
      {
        savings_count: 1,
        has_saving: true,
        saving,
        insights: {
          ...insights,
          month_summary: { ...insights.month_summary, installment: null },
          upgrade_suggestion: null,
        },
      },
      user,
    );
    expect(data.insights?.monthSummary.installment).toBeNull();
    expect(data.insights?.upgradeSuggestion).toBeNull();
  });

  it("has_saving false → isi saving/insights dari backend diabaikan", () => {
    const data = toDashboardData(
      {
        savings_count: 2,
        has_saving: false,
        saving,
        insights,
      },
      user,
    );
    expect(data.saving).toBeNull();
    expect(data.insights).toBeNull();
  });
});
