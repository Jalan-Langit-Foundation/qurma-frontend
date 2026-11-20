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

  it("tiga paket Brief V1.1: Standar, Medium, Premium (Grade A/B/C)", () => {
    expect(
      ALL_PACKAGES.map((pkg) => [
        pkg.name,
        pkg.grade,
        pkg.target,
        pkg.weightMinKg,
        pkg.weightMaxKg,
      ]),
    ).toEqual([
      ["Standar", "A", 1_600_000, 20, 25],
      ["Medium", "B", 2_200_000, 26, 29],
      ["Premium", "C", 2_990_000, 30, 35],
    ]);
  });

  it("paket default ada di katalog", () => {
    expect(getPackageById(DEFAULT_PACKAGE_ID)).toBeDefined();
  });

  it("data paket masuk akal dan berurutan dari harga terendah", () => {
    for (const pkg of ALL_PACKAGES) {
      expect(pkg.target).toBeGreaterThan(0);
      expect(pkg.weightMinKg).toBeLessThanOrEqual(pkg.weightMaxKg);
    }
    const targets = ALL_PACKAGES.map((pkg) => pkg.target);
    expect(targets).toEqual([...targets].sort((a, b) => a - b));
  });

  it("tidak menjanjikan dashboard (Brief V1.1 bagian G.2)", () => {
    const perks = ALL_PACKAGES.flatMap((pkg) => pkg.perks).join(" ");
    expect(perks.toLowerCase()).not.toContain("dashboard");
  });
});

describe("isPackageId & resolvePackage", () => {
  it("mengenali ID valid saja; kode lama tidak dikenali lagi", () => {
    expect(isPackageId("standar")).toBe(true);
    expect(isPackageId("premium")).toBe(true);
    expect(isPackageId("start")).toBe(false);
    expect(isPackageId("loyalty")).toBe(false);
    expect(isPackageId(undefined)).toBe(false);
  });

  it("nilai tidak dikenal dari URL → paket default", () => {
    expect(resolvePackage("medium").id).toBe("medium");
    expect(resolvePackage("plus").id).toBe(DEFAULT_PACKAGE_ID);
    expect(resolvePackage("<script>").id).toBe(DEFAULT_PACKAGE_ID);
    expect(resolvePackage(null).id).toBe(DEFAULT_PACKAGE_ID);
  });
});

describe("upgrade", () => {
  it("hanya paket lebih tinggi, urut dari terdekat", () => {
    expect(getUpgradeOptions("standar").map((pkg) => pkg.id)).toEqual([
      "medium",
      "premium",
    ]);
    expect(getUpgradeOptions("medium").map((pkg) => pkg.id)).toEqual([
      "premium",
    ]);
    expect(getUpgradeOptions("premium")).toEqual([]);
    expect(getUpgradeOptions("tidak-ada")).toEqual([]);
  });

  it("selisih target", () => {
    expect(getUpgradeDifference("standar", "medium")).toBe(600_000);
    expect(getUpgradeDifference("medium", "premium")).toBe(790_000);
    expect(getUpgradeDifference("medium", "standar")).toBeNull();
  });
});

describe("getPackageFeatures", () => {
  const standar = resolvePackage("standar");

  it("baris bobot ditulis sebagai target, baris setoran dari data", () => {
    expect(getPackageFeatures(standar, 229_000).slice(0, 2)).toEqual([
      "Target bobot 20–25 kg",
      "Setoran ringan ±Rp229 rb/bln",
    ]);
  });

  it("baris setoran disembunyikan bila estimasi tidak tersedia", () => {
    const features = getPackageFeatures(standar, null);
    expect(features[0]).toBe("Target bobot 20–25 kg");
    expect(features.some((feature) => feature.startsWith("Setoran"))).toBe(
      false,
    );
  });
});
