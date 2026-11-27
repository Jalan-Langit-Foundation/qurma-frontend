import { describe, expect, it } from "vitest";
import {
  FALLBACK_PACKAGES,
  PACKAGE_IDS,
} from "@/features/packages/lib/catalog";
import { getPackageFeatures } from "@/features/packages/lib/package-features";
import {
  DEFAULT_PACKAGE_ID,
  getDefaultPackage,
  getPackageById,
  getUpgradeOptions,
  isPackageId,
  resolvePackage,
} from "@/features/packages/lib/packages";

const packages = FALLBACK_PACKAGES;

describe("katalog lokal (cadangan bila GET /program gagal)", () => {
  it("setiap ID di PACKAGE_IDS punya data, dan sebaliknya", () => {
    expect(packages.map((pkg) => pkg.id).sort()).toEqual(
      [...PACKAGE_IDS].sort(),
    );
  });

  it("tiga paket sesuai API Contract: Domba Standar, Medium, Premium", () => {
    expect(
      packages.map((pkg) => [
        pkg.name,
        pkg.shortName,
        pkg.grade,
        pkg.target,
        pkg.weightMinKg,
        pkg.weightMaxKg,
      ]),
    ).toEqual([
      ["Domba Standar", "Standar", "A", 1_600_000, 20, 25],
      ["Domba Medium", "Medium", "B", 2_200_000, 26, 29],
      ["Domba Premium", "Premium", "C", 2_990_000, 30, 35],
    ]);
  });

  it("paket default ada di katalog", () => {
    expect(getPackageById(packages, DEFAULT_PACKAGE_ID)).toBeDefined();
  });

  it("data paket masuk akal dan berurutan dari harga terendah", () => {
    for (const pkg of packages) {
      expect(pkg.target).toBeGreaterThan(0);
      expect(pkg.weightMinKg).toBeLessThanOrEqual(pkg.weightMaxKg);
    }
    const targets = packages.map((pkg) => pkg.target);
    expect(targets).toEqual([...targets].sort((a, b) => a - b));
  });

  it("tidak menjanjikan dashboard (Brief V1.1 bagian G.2)", () => {
    const perks = packages.flatMap((pkg) => pkg.perks).join(" ");
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
    expect(resolvePackage(packages, "medium").id).toBe("medium");
    expect(resolvePackage(packages, "plus").id).toBe(DEFAULT_PACKAGE_ID);
    expect(resolvePackage(packages, "<script>").id).toBe(DEFAULT_PACKAGE_ID);
    expect(resolvePackage(packages, null).id).toBe(DEFAULT_PACKAGE_ID);
  });

  it("paket default tidak ada di data API → paket pertama", () => {
    const withoutStandar = packages.filter((pkg) => pkg.id !== "standar");
    expect(getDefaultPackage(withoutStandar).id).toBe("medium");
    expect(() => getDefaultPackage([])).toThrow(/kosong/);
  });
});

describe("getUpgradeOptions", () => {
  it("hanya paket lebih tinggi, urut dari terdekat", () => {
    const ids = (id: string) =>
      getUpgradeOptions(packages, id).map((pkg) => pkg.id);
    expect(ids("standar")).toEqual(["medium", "premium"]);
    expect(ids("medium")).toEqual(["premium"]);
    expect(ids("premium")).toEqual([]);
    expect(ids("tidak-ada")).toEqual([]);
  });
});

describe("getPackageFeatures", () => {
  const standar = resolvePackage(packages, "standar");

  it("baris bobot ditulis sebagai target, baris setoran dari data", () => {
    expect(getPackageFeatures(standar, 229_000).slice(0, 2)).toEqual([
      "Target bobot 20–25 kg",
      "Setoran ringan ±Rp229 rb/setoran",
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
