import {
  formatWeightRange,
  getPackageById,
  type QurbanPackage,
} from "@/features/packages";
import {
  buildJourneyTimeline,
  formatMonthShort,
  formatYearMonth,
  formatYearMonthShort,
  getSavingStatus,
  SAVINGS_PROGRAM,
  type InstallmentStatus,
  type JourneyTimelineStep,
  type DepositRecord,
  type Saving,
  type SavingLedger,
  type SavingStatusTone,
} from "@/features/savings";
import { formatRupiah, formatTanggal } from "@/lib/format";
import {
  buildSavingCta,
  type DashboardCta,
  type DashboardMember,
} from "./dashboard-cta";

export interface DashboardChip {
  icon: "moon" | "calendar" | "status";
  label: string;
  tone?: SavingStatusTone;
}

export interface PlanBar {
  key: "paid" | "next" | "remaining";
  label: string;
  amount: number;
  height: number;
  badge?: string;
}

export interface GaugeSegment {
  key: "collected" | "next" | "remaining";
  label: string;
  amount: number;
  ratio: number;
}

export interface MonthBar {
  label: string;
  fullLabel: string;
  amount: number;
  paidAmount: number;
  fill: number;
  status: InstallmentStatus;
}

export interface DashboardView {
  firstName: string;
  subtitle: string;
  cta: DashboardCta;
  chips: DashboardChip[];
  package: {
    name: string;
    weightLabel: string | null;
    idLabel: string;
    target: number;
    collected: number;
    remaining: number;

    deposits: { id: number; dateLabel: string; amount: number }[] | null;
  };
  plan: {
    monthlyAmount: number;
    note: string | null;
    bars: PlanBar[];
  };
  gauge: {
    percent: number;
    collected: number;
    segments: GaugeSegment[];
  };
  lastDeposit: {
    amount: number;
    dateLabel: string;
    paidCount: number;
    totalCount: number;
    months: MonthBar[];
  } | null;
  journey: {
    completed: number;
    total: number;
    steps: JourneyTimelineStep[];
  };
}

const ratio = (part: number, whole: number) =>
  whole > 0 ? Math.min(1, Math.max(0, part / whole)) : 0;

export function getFirstName(name: string): string {
  return name.trim().split(/\s+/)[0] || "Sahabat";
}

/** "#0001": ID tabungan sebagai nomor kartu. */
export function formatSavingId(id: number): string {
  return `#${String(id).padStart(4, "0")}`;
}

function buildSubtitle(saving: Saving): string {
  switch (saving.status) {
    case "active":
      return saving.nextInstallment
        ? `Setoran berikutnya ${formatYearMonth(saving.nextInstallment.month)} sebesar ${formatRupiah(saving.nextInstallment.amount)}.`
        : "Tabungan Anda berjalan sesuai rencana.";
    case "overdue":
      return "Ada setoran yang terlambat. Konfirmasikan ke CS QURMA agar progres tetap aman.";
    case "completed":
      return "Alhamdulillah, tabungan Anda sudah lunas. Pantau persiapan domba di sini.";
    case "cancelled":
      return "Tabungan ini dibatalkan. Hubungi CS QURMA bila ada pertanyaan.";
  }
}

function buildPlan(saving: Saving, ledger: SavingLedger | null) {
  const next = saving.nextInstallment;
  const nextAmount = next?.amount ?? 0;
  const afterNext = Math.max(0, saving.remainingAmount - nextAmount);
  const monthsAfterNext = ledger
    ? ledger.installments.filter(
        (item) => item.status === "scheduled" && item.month !== next?.month,
      ).length
    : 0;

  const raw: Omit<PlanBar, "height">[] = [
    { key: "paid", label: "Sudah disetor", amount: saving.totalPaid },
  ];
  if (next) {
    raw.push({
      key: "next",
      label: formatYearMonthShort(next.month),
      amount: nextAmount,
      badge: "Berikutnya",
    });
  }
  raw.push({
    key: "remaining",
    label:
      next && monthsAfterNext > 0
        ? `Setelah ${formatYearMonthShort(next.month)} · ${monthsAfterNext} bulan`
        : "Sisa",
    amount: afterNext,
  });

  const tallest = Math.max(...raw.map((bar) => bar.amount), 1);
  const bars = raw.map((bar) => ({
    ...bar,
    height: ratio(bar.amount, tallest),
  }));

  const note =
    saving.lastInstallmentAmount > 0 &&
    saving.lastInstallmentAmount !== saving.monthlyAmount
      ? `Setoran terakhir ${formatRupiah(saving.lastInstallmentAmount)} (${formatYearMonth(saving.endMonth)})`
      : null;

  return { monthlyAmount: saving.monthlyAmount, note, bars };
}

function buildGauge(saving: Saving) {
  const target = saving.targetAmount;
  const collected = Math.min(saving.totalPaid, target);
  const next = Math.min(
    saving.nextInstallment?.amount ?? 0,
    target - collected,
  );
  const remaining = Math.max(0, target - collected - next);

  const segments: GaugeSegment[] = [
    {
      key: "collected",
      label: "Terkumpul",
      amount: collected,
      ratio: ratio(collected, target),
    },
    {
      key: "next",
      label: "Bulan depan",
      amount: next,
      ratio: ratio(next, target),
    },
    {
      key: "remaining",
      label: "Sisa",
      amount: remaining,
      ratio: ratio(remaining, target),
    },
  ];

  return {
    percent: saving.progressPercent,
    collected: saving.totalPaid,
    segments,
  };
}

export function toGaugeArcs(
  segments: readonly GaugeSegment[],
  gap: number,
): { key: GaugeSegment["key"]; start: number; length: number }[] {
  const visible = segments.filter((segment) => segment.ratio > 0);
  return visible.map((segment, index) => {
    const start = visible
      .slice(0, index)
      .reduce((sum, previous) => sum + previous.ratio * 100, 0);
    const isLast = index === visible.length - 1;
    return {
      key: segment.key,
      start,
      length: Math.max(0, segment.ratio * 100 - (isLast ? 0 : gap)),
    };
  });
}

function buildLastDeposit(ledger: SavingLedger | null) {
  if (!ledger || ledger.deposits.length === 0) return null;

  const sorted = [...ledger.deposits].sort((a, b) =>
    a.paidAt.localeCompare(b.paidAt),
  );
  const last = sorted.at(-1)!;

  return {
    amount: last.amount,
    dateLabel: formatTanggal(last.paidAt),
    paidCount: ledger.installments.filter((item) => item.status === "paid")
      .length,
    totalCount: ledger.installments.length,
    months: ledger.installments.map((item) => ({
      label: formatMonthShort(item.month),
      fullLabel: formatYearMonth(item.month),
      amount: item.amount,
      paidAmount: item.paidAmount,
      fill: ratio(item.paidAmount, item.amount),
      status: item.status,
    })),
  };
}

function buildJourney(saving: Saving): DashboardView["journey"] {
  const steps = buildJourneyTimeline({
    journey: saving.journey,
    targetAmount: saving.targetAmount,
    totalPaid: saving.totalPaid,
    startMonth: saving.startMonth,
  });
  return {
    completed: steps.filter((step) => step.state === "done").length,
    total: steps.length,
    steps,
  };
}

export function buildPackageView(
  saving: Saving,
  packages: readonly QurbanPackage[],
  deposits: readonly DepositRecord[] | null,
): DashboardView["package"] {
  const pkg = saving.packageId
    ? getPackageById(packages, saving.packageId)
    : undefined;

  return {
    name: saving.packageName,
    weightLabel: pkg ? `Target bobot ${formatWeightRange(pkg)}` : null,
    idLabel: formatSavingId(saving.id),
    target: saving.targetAmount,
    collected: saving.totalPaid,
    remaining: saving.remainingAmount,
    deposits:
      deposits?.map((deposit) => ({
        id: deposit.id,
        dateLabel: formatTanggal(deposit.paidAt),
        amount: deposit.amount,
      })) ?? null,
  };
}

export function buildDashboardView(
  saving: Saving,
  ledger: SavingLedger | null,
  member: DashboardMember,
  packages: readonly QurbanPackage[],
): DashboardView {
  const status = getSavingStatus(saving.status);

  return {
    firstName: getFirstName(member.name),
    subtitle: buildSubtitle(saving),
    cta: buildSavingCta(saving, member),
    chips: [
      { icon: "moon", label: `Qurban ${SAVINGS_PROGRAM.hijriLabel}` },
      {
        icon: "calendar",
        label: `${formatYearMonthShort(saving.startMonth)} – ${formatYearMonthShort(saving.endMonth)}`,
      },
      { icon: "status", label: status.label, tone: status.tone },
    ],
    package: buildPackageView(saving, packages, ledger?.deposits ?? []),
    plan: buildPlan(saving, ledger),
    gauge: buildGauge(saving),
    lastDeposit: buildLastDeposit(ledger),
    journey: buildJourney(saving),
  };
}
