import { describe, expect, it } from "vitest";
import { MEMBER_NAV_GROUPS } from "@/config/navigation";
import { buildSidebarModel } from "@/features/account/lib/sidebar-model";
import { FALLBACK_PACKAGES } from "@/features/packages";
import type { Saving } from "@/features/savings";
import { buildJourneyStepsFromStage } from "@/features/savings/lib/journey";

const user = { name: "Budi Santoso", email: "budi@mail.com" };
const features = {
  profile: false,
  transactions: false,
  dashboardSummary: true,
};

const saving = (patch: Partial<Saving> = {}): Saving => ({
  id: 7,
  packageId: "standar",
  packageName: "Domba Standar",
  programYear: 2027,
  status: "active",
  targetAmount: 1_600_000,
  totalPaid: 920_000,
  paidThisMonth: 0,
  remainingAmount: 680_000,
  progressPercent: 57,
  tenorMonths: 7,
  startMonth: "2026-11",
  endMonth: "2027-05",
  monthlyAmount: 230_000,
  lastInstallmentAmount: 220_000,
  nextInstallment: { month: "2027-03", amount: 230_000 },
  journey: buildJourneyStepsFromStage(3),
  ...patch,
});

const build = (patch: Partial<Parameters<typeof buildSidebarModel>[0]> = {}) =>
  buildSidebarModel({
    user,
    saving: saving(),
    insights: null,
    packages: FALLBACK_PACKAGES,
    navGroups: MEMBER_NAV_GROUPS,
    features,
    promoDismissed: false,
    collapsed: false,
    ...patch,
  });

const link = (model: ReturnType<typeof build>, id: string) =>
  model.sections.flatMap((section) => section.links).find((l) => l.id === id);

describe("buildSidebarModel", () => {
  it("badge Jadwal = bulan setoran berikutnya, Lacak memakai id tabungan", () => {
    const model = build();
    expect(link(model, "jadwal")?.badge).toBe("Mar");
    expect(link(model, "lacak")?.href).toBe("/qurban/7");
  });

  it("Laporan terbuka setelah tahap laporan selesai", () => {
    expect(link(build(), "laporan")?.href).toBeNull();
    expect(
      link(
        build({ saving: saving({ journey: buildJourneyStepsFromStage(7) }) }),
        "laporan",
      )?.href,
    ).toBe("/report/7");
  });

  it("Chat CS membawa identitas member & tabungan", () => {
    const href = link(build(), "chat")?.href ?? "";
    const text = new URL(href).searchParams.get("text") ?? "";
    expect(text).toContain("Nama: Budi Santoso");
    expect(text).toContain("ID tabungan #7");
  });

  it("banner upgrade tampil, hilang bila sudah ditutup di sesi ini", () => {
    expect(build().promo?.toName).toBe("Domba Medium");
    expect(build({ promoDismissed: true }).promo).toBeNull();
  });

  it("tanpa tabungan → tanpa banner, tanpa badge", () => {
    const model = build({ saving: null });
    expect(model.promo).toBeNull();
    expect(link(model, "jadwal")).toBeUndefined();
  });

  it("status ciut sidebar diteruskan dari cookie", () => {
    expect(build({ collapsed: true }).initialCollapsed).toBe(true);
  });
});
