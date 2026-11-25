import { describe, expect, it } from "vitest";
import {
  buildDashboardView,
  formatSavingId,
  toGaugeArcs,
  getFirstName,
} from "@/features/dashboard/lib/dashboard-view";
import { buildJourneyStepsFromStage } from "@/features/savings";
import type { Saving, SavingLedger } from "@/features/savings";

const member = { name: "Budi Santoso", email: "budi@mail.com" };

function makeSaving(overrides: Partial<Saving> = {}): Saving {
  return {
    id: 1,
    packageId: "standar",
    packageName: "Standar",
    programYear: 2027,
    status: "active",
    targetAmount: 1_900_000,
    totalPaid: 550_000,
    paidThisMonth: 0,
    remainingAmount: 1_350_000,
    progressPercent: 28,
    tenorMonths: 7,
    startMonth: "2026-10",
    endMonth: "2027-04",
    monthlyAmount: 275_000,
    lastInstallmentAmount: 250_000,
    nextInstallment: { month: "2026-12", amount: 275_000 },
    journey: buildJourneyStepsFromStage(3),
    ...overrides,
  };
}

const ledger: SavingLedger = {
  savingId: 1,
  targetAmount: 1_900_000,
  totalPaid: 550_000,
  installments: [
    ["2026-10", "paid"],
    ["2026-11", "paid"],
    ["2026-12", "next"],
    ["2027-01", "scheduled"],
    ["2027-02", "scheduled"],
    ["2027-03", "scheduled"],
    ["2027-04", "scheduled"],
  ].map(([month, status], index) => ({
    installmentNo: index + 1,
    month: month as Saving["startMonth"],
    amount: index === 6 ? 250_000 : 275_000,
    paidAmount: status === "paid" ? 275_000 : 0,
    remainingAmount: status === "paid" ? 0 : 275_000,
    status: status as "paid" | "next" | "scheduled",
    isFinal: index === 6,
  })),
  deposits: [
    { id: 2, amount: 275_000, paidAt: "2026-11-04", note: null },
    { id: 1, amount: 275_000, paidAt: "2026-10-03", note: null },
  ],
};

describe("helper kecil", () => {
  it("getFirstName & formatSavingId", () => {
    expect(getFirstName("  Budi Santoso")).toBe("Budi");
    expect(getFirstName("")).toBe("Sahabat");
    expect(formatSavingId(1)).toBe("#0001");
    expect(formatSavingId(12345)).toBe("#12345");
  });
});

describe("buildDashboardView", () => {
  const view = buildDashboardView(makeSaving(), ledger, member);

  it("salam, chip program, periode & status", () => {
    expect(view.firstName).toBe("Budi");
    expect(view.chips.map((chip) => chip.label)).toEqual([
      "Qurban 1448 H / 2027 M",
      "Okt 2026 – Apr 2027",
      "Berjalan",
    ]);
    expect(view.subtitle).toContain("Desember 2026");
  });

  it("tabungan berjalan → CTA konfirmasi setoran via WhatsApp", () => {
    expect(view.cta).toMatchObject({
      label: "Konfirmasi Setoran",
      external: true,
      icon: "deposit",
    });
    expect(view.cta.href).toMatch(/^https:\/\/wa\.me\//);
  });

  it("kartu paket: target bobot dari katalog, ID, rincian setoran", () => {
    expect(view.package.weightLabel).toBe("Target bobot 20–25 kg");
    expect(view.package.idLabel).toBe("#0001");
    expect(view.package.deposits).toHaveLength(2);
  });

  it("rencana setoran: 3 batang dan catatan setoran terakhir berbeda", () => {
    expect(
      view.plan.bars.map((bar) => [bar.key, bar.amount, bar.label]),
    ).toEqual([
      ["paid", 550_000, "Sudah disetor"],
      ["next", 275_000, "Des 2026"],
      ["remaining", 1_075_000, "Sisa 4 bulan"],
    ]);
    expect(Math.max(...view.plan.bars.map((bar) => bar.height))).toBe(1);
    expect(view.plan.note).toContain("Rp250.000");
  });

  it("gauge: porsi terkumpul + bulan depan + sisa = 1", () => {
    const total = view.gauge.segments.reduce((sum, s) => sum + s.ratio, 0);
    expect(total).toBeCloseTo(1);
    expect(view.gauge.percent).toBe(28);
  });

  it("setoran terakhir diambil dari tanggal paling baru + tren kumulatif", () => {
    expect(view.lastDeposit).toMatchObject({
      amount: 275_000,
      paidCount: 2,
      totalCount: 7,
      trend: [0, 275_000, 550_000],
    });
    expect(view.lastDeposit?.dateLabel).toBe("4 November 2026");
  });

  it("perjalanan: tahap aktif & kekurangan menuju 50%", () => {
    expect(view.journey.step).toBe(3);
    expect(view.journey.total).toBe(7);
    expect(view.journey.title).toBe("50% Tercapai");
    expect(view.journey.milestone).toEqual({
      label: "menuju 50% terkumpul",
      shortfall: 400_000,
    });
    expect(view.journey.steps.map((s) => s.state)).toEqual([
      "done",
      "done",
      "current",
      "upcoming",
      "upcoming",
      "upcoming",
      "upcoming",
    ]);
  });

  it("lunas → CTA lacak persiapan, tanpa kekurangan", () => {
    const done = buildDashboardView(
      makeSaving({
        status: "completed",
        totalPaid: 1_900_000,
        remainingAmount: 0,
        progressPercent: 100,
        nextInstallment: null,
        journey: buildJourneyStepsFromStage(5),
      }),
      ledger,
      member,
    );
    expect(done.cta).toMatchObject({
      label: "Lacak Persiapan",
      href: "/qurban/1",
    });
    expect(done.journey.milestone).toBeNull();
    expect(done.plan.bars.map((bar) => bar.key)).toEqual(["paid", "remaining"]);
  });

  it("dibatalkan → CTA chat CS QURMA; tanpa ledger → setoran terakhir null", () => {
    const cancelled = buildDashboardView(
      makeSaving({ status: "cancelled" }),
      null,
      member,
    );
    expect(cancelled.cta.label).toBe("Chat CS QURMA");
    expect(cancelled.lastDeposit).toBeNull();
    expect(cancelled.journey.milestone).toBeNull();
  });
});

describe("toGaugeArcs", () => {
  it("segmen berurutan, celah di antaranya, segmen kosong dilewati", () => {
    expect(
      toGaugeArcs(
        [
          { key: "collected", label: "", amount: 0, ratio: 0.3 },
          { key: "next", label: "", amount: 0, ratio: 0 },
          { key: "remaining", label: "", amount: 0, ratio: 0.7 },
        ],
        2,
      ),
    ).toEqual([
      { key: "collected", start: 0, length: 28 },
      { key: "remaining", start: 30, length: 70 },
    ]);
  });
});
