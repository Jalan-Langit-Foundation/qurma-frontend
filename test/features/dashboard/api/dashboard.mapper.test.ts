import { describe, expect, it } from "vitest";
import { toDashboardData } from "@/features/dashboard/api/dashboard.mapper";
import type { DashboardDto } from "@/features/dashboard/api/dashboard.dto";

const user = {
  id: 1,
  name: "Budi Santoso",
  email: "budi@mail.com",
  phone: "081234567890",
  role: "user" as const,
};

describe("toDashboardData", () => {
  it("belum punya tabungan → saving null, transaksi kosong", () => {
    const dto: DashboardDto = { user, saving: null, recent_transactions: [] };
    expect(toDashboardData(dto)).toEqual({
      user,
      saving: null,
      recentTransactions: [],
    });
  });

  it("memetakan tabungan & transaksi dengan mapper fitur masing-masing", () => {
    const data = toDashboardData({
      user,
      saving: {
        id: 7,
        package: { code: "standar", name: "Standar" },
        program_year: 2027,
        status: "active",
        target_amount: 1_900_000,
        total_paid: 271_500,
        remaining_amount: 1_628_500,
        progress_percent: 14,
        tenor_months: 7,
        start_month: "2026-10",
        end_month: "2027-04",
        monthly_amount: 271_500,
        last_installment_amount: 271_000,
        next_installment: { month: "2026-11", amount: 271_500 },
        journey: {
          target_selected: true,
          saving_started: true,
          half_reached: false,
          target_reached: false,
          animal_prepared: false,
          qurban_done: false,
          report_received: false,
        },
      },
      recent_transactions: [
        {
          id: 1,
          saving_id: 7,
          package: { code: "standar", name: "Standar" },
          amount: 271_500,
          paid_at: "2026-10-05",
          note: null,
          receipt_number: null,
          created_at: "2026-10-05T09:00:00+07:00",
        },
      ],
    });

    expect(data.saving?.packageName).toBe("Standar");
    expect(data.saving?.startMonth).toBe("2026-10");
    expect(data.recentTransactions[0]).toMatchObject({
      savingId: 7,
      hasReceipt: false,
    });
  });
});
