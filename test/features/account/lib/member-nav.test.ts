import { describe, expect, it } from "vitest";
import {
  getVisibleMemberNavItems,
  isMemberNavItemActive,
} from "@/features/account/lib/member-nav";
import { MEMBER_NAV_ITEMS } from "@/config/navigation";

const allOff = {
  profile: false,
  transactions: false,
  dashboardSummary: false,
};

describe("getVisibleMemberNavItems", () => {
  it("fitur mati → hanya menu tanpa syarat", () => {
    expect(
      getVisibleMemberNavItems(MEMBER_NAV_ITEMS, allOff).map((i) => i.label),
    ).toEqual(["Ringkasan", "Paket", "Jadwal"]);
  });

  it("fitur dinyalakan → menunya muncul", () => {
    expect(
      getVisibleMemberNavItems(MEMBER_NAV_ITEMS, {
        ...allOff,
        profile: true,
        transactions: true,
      }).map((i) => i.label),
    ).toEqual(["Ringkasan", "Paket", "Jadwal", "Transaksi"]);
  });
});

describe("isMemberNavItemActive", () => {
  const summary = MEMBER_NAV_ITEMS[0]!;

  it.each(["/dashboard", "/qurban/3", "/report/3", "/tabungan/baru"])(
    "Ringkasan aktif di %s",
    (path) => {
      expect(isMemberNavItemActive(summary, path)).toBe(true);
    },
  );

  it("tidak aktif di halaman lain atau path yang mirip", () => {
    expect(isMemberNavItemActive(summary, "/akun")).toBe(false);
    expect(isMemberNavItemActive(summary, "/dashboard-lama")).toBe(false);
  });
});
