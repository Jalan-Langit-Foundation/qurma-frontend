import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { MEMBER_NAV_GROUPS, type MemberNavGroup } from "@/config/navigation";
import {
  buildMemberNav,
  isMemberNavLinkActive,
  type MemberNavContext,
} from "@/features/account/lib/member-nav";

const allOff = {
  profile: false,
  transactions: false,
  dashboardSummary: false,
};

const withSaving: MemberNavContext = {
  savingId: 7,
  nextMonthLabel: "Mar",
  reportReady: false,
  helpHref: "https://wa.me/6281234567890",
};

const links = (ctx: MemberNavContext, groups = MEMBER_NAV_GROUPS) =>
  buildMemberNav(groups, ctx, allOff).flatMap((section) => section.links);

describe("buildMemberNav", () => {
  it("punya tabungan → menu lengkap + badge bulan setoran berikutnya", () => {
    const result = links(withSaving);
    expect(result.map((link) => link.label)).toEqual([
      "Ringkasan",
      "Jadwal setoran",
      "Paket qurban",
      "Lacak qurban",
      "Laporan qurban",
      "Chat CS QURMA",
    ]);
    expect(result.find((link) => link.id === "jadwal")?.badge).toBe("Mar");
    expect(result.find((link) => link.id === "lacak")?.href).toBe("/qurban/7");
  });

  it("laporan terkunci sampai Shohibul Report terbit", () => {
    const locked = links(withSaving).find((link) => link.id === "laporan");
    expect(locked).toMatchObject({
      href: null,
      lockedHint: "Setelah Iduladha",
    });

    const ready = links({ ...withSaving, reportReady: true }).find(
      (link) => link.id === "laporan",
    );
    expect(ready).toMatchObject({ href: "/report/7" });
    expect(ready?.lockedHint).toBeUndefined();
  });

  it("belum punya tabungan → tanpa Jadwal & Lacak, laporan terkunci", () => {
    const result = links({
      ...withSaving,
      savingId: null,
      nextMonthLabel: null,
    });
    expect(result.map((link) => link.id)).toEqual([
      "ringkasan",
      "paket",
      "laporan",
      "chat",
    ]);
    expect(result.find((link) => link.id === "laporan")?.href).toBeNull();
  });

  it("grup Bantuan berisi tautan WhatsApp CS", () => {
    const sections = buildMemberNav(MEMBER_NAV_GROUPS, withSaving, allOff);
    expect(sections.map((section) => section.label)).toEqual([
      "Tabungan",
      "Bantuan",
    ]);
    expect(sections[1]?.links[0]).toMatchObject({
      external: true,
      href: withSaving.helpHref,
    });
  });

  it("menu dengan saklar fitur hanya tampil bila fiturnya menyala", () => {
    const groups: MemberNavGroup[] = [
      {
        label: "Tabungan",
        items: [
          {
            id: "baru",
            label: "Baru",
            href: "/dashboard",
            icon: "receipt",
            feature: "profile",
          },
        ],
      },
    ];
    expect(links(withSaving, groups).map((link) => link.id)).toEqual(["chat"]);
    expect(
      buildMemberNav(groups, withSaving, { ...allOff, profile: true })[0]
        ?.links,
    ).toHaveLength(1);
  });
});

describe("isMemberNavLinkActive", () => {
  const all = links({ ...withSaving, reportReady: true });
  const byId = (id: string) => all.find((link) => link.id === id)!;

  it.each(["/dashboard", "/tabungan/baru"])("Ringkasan aktif di %s", (path) => {
    expect(isMemberNavLinkActive(byId("ringkasan"), path)).toBe(true);
  });

  it("Lacak & Laporan aktif di halamannya masing-masing", () => {
    expect(isMemberNavLinkActive(byId("lacak"), "/qurban/7")).toBe(true);
    expect(isMemberNavLinkActive(byId("laporan"), "/report/7")).toBe(true);
    expect(isMemberNavLinkActive(byId("ringkasan"), "/qurban/7")).toBe(false);
  });

  it("Jadwal & Paket punya halaman sendiri dan aktif di sana", () => {
    expect(byId("jadwal").href).toBe("/tabungan/jadwal");
    expect(byId("paket").href).toBe("/tabungan/paket");
    expect(isMemberNavLinkActive(byId("jadwal"), "/tabungan/jadwal")).toBe(
      true,
    );
    expect(isMemberNavLinkActive(byId("paket"), "/tabungan/paket")).toBe(true);
    expect(isMemberNavLinkActive(byId("ringkasan"), "/tabungan/jadwal")).toBe(
      false,
    );
  });

  it("tidak aktif di path yang mirip", () => {
    expect(isMemberNavLinkActive(byId("ringkasan"), "/dashboard-lama")).toBe(
      false,
    );
  });
});

/** Cari page.tsx untuk sebuah path, melewati route group "(nama)" & segmen [id]. */
function hasPage(dir: string, segments: string[]): boolean {
  if (segments.length === 0) return existsSync(join(dir, "page.tsx"));
  const [head, ...rest] = segments;
  return readdirSync(dir, { withFileTypes: true }).some(
    (entry) =>
      entry.isDirectory() &&
      (((entry.name === head || /^\[.+\]$/.test(entry.name)) &&
        hasPage(join(dir, entry.name), rest)) ||
        (/^\(.+\)$/.test(entry.name) &&
          hasPage(join(dir, entry.name), segments))),
  );
}

describe("menu member tidak berujung 404", () => {
  const internal = links({ ...withSaving, reportReady: true }).filter(
    (link) => link.href && !link.external,
  );

  it.each(internal.map((link) => [link.label, link.href!]))(
    "%s → %s punya halaman",
    (_, href) => {
      const segments = (href.split("#")[0] ?? "").split("/").filter(Boolean);
      expect(hasPage(join(process.cwd(), "app"), segments)).toBe(true);
    },
  );
});
