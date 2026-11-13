import { describe, expect, it } from "vitest";
import { PACKAGE_IDS } from "@/features/packages/lib/catalog";
import { getPackageFeatures } from "@/features/packages/lib/package-features";
import {
  ALL_PACKAGES,
  DEFAULT_PACKAGE_ID,
  getPackageById,
  getUpgradeDifference,
  getUpgradeOptions,
  isPackageId,
  resolvePackage,
} from "@/features/packages/lib/packages";

describe("katalog paket", () => {
  it("setiap ID di PACKAGE_IDS punya data, dan sebaliknya", () => {
    expect(ALL_PACKAGES.map((pkg) => pkg.id).sort()).toEqual(
      [...PACKAGE_IDS].sort(),
    );
  });

  it("paket default ada di katalog", () => {
    expect(getPackageById(DEFAULT_PACKAGE_ID)).toBeDefined();
  });

  it("data paket masuk akal", () => {
    for (const pkg of ALL_PACKAGES) {
      expect(pkg.target).toBeGreaterThan(0);
      expect(pkg.weightMinKg).toBeLessThanOrEqual(pkg.weightMaxKg);
    }
  });
});

describe("isPackageId & resolvePackage", () => {
  it("mengenali ID valid saja", () => {
    expect(isPackageId("start")).toBe(true);
    expect(isPackageId("gold")).toBe(false);
    expect(isPackageId(undefined)).toBe(false);
  });

  it("nilai tidak dikenal dari URL → paket default", () => {
    expect(resolvePackage("plus").id).toBe("plus");
    expect(resolvePackage("<script>").id).toBe(DEFAULT_PACKAGE_ID);
    expect(resolvePackage(null).id).toBe(DEFAULT_PACKAGE_ID);
  });
});

describe("upgrade", () => {
  it("hanya paket lebih tinggi & bukan loyalty, urut dari terdekat", () => {
    expect(getUpgradeOptions("loyalty").map((pkg) => pkg.id)).toEqual([
      "start",
      "plus",
      "premium",
    ]);
    expect(getUpgradeOptions("start").map((pkg) => pkg.id)).toEqual([
      "plus",
      "premium",
    ]);
    expect(getUpgradeOptions("premium")).toEqual([]);
    expect(getUpgradeOptions("tidak-ada")).toEqual([]);
  });

  it("selisih target", () => {
    expect(getUpgradeDifference("start", "plus")).toBe(600_000);
    expect(getUpgradeDifference("plus", "start")).toBeNull();
  });
});

describe("getPackageFeatures", () => {
  const start = resolvePackage("start");

  it("baris bobot & setoran dihitung dari data", () => {
    expect(getPackageFeatures(start, 271_500).slice(0, 2)).toEqual([
      "Estimasi bobot 23–25 kg",
      "Setoran ringan ±Rp271 rb/bln",
    ]);
  });

  it("baris setoran disembunyikan bila estimasi tidak tersedia", () => {
    const features = getPackageFeatures(start, null);
    expect(features[0]).toBe("Estimasi bobot 23–25 kg");
    expect(features.some((feature) => feature.startsWith("Setoran"))).toBe(
      false,
    );
  });
});
