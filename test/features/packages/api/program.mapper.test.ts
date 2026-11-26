import { describe, expect, it } from "vitest";
import type { ProgramPackageDto } from "@/features/packages/api/program.dto";
import { toQurbanPackages } from "@/features/packages/api/program.mapper";
import { FALLBACK_PACKAGES } from "@/features/packages/lib/catalog";

// Contoh dari API Contract bagian 2 (GET /program)
const API_PACKAGES: ProgramPackageDto[] = [
  {
    code: "standar",
    name: "Domba Standar",
    price: 1_600_000,
    weight_min: 20,
    weight_max: 25,
  },
  {
    code: "medium",
    name: "Domba Medium",
    price: 2_200_000,
    weight_min: 26,
    weight_max: 29,
  },
  {
    code: "premium",
    name: "Domba Premium",
    price: 2_990_000,
    weight_min: 30,
    weight_max: 35,
  },
];

describe("toQurbanPackages (GET /program)", () => {
  it("nama, harga & bobot dari API; teks pemasaran dari katalog lokal", () => {
    const [standar] = toQurbanPackages([
      { ...API_PACKAGES[0]!, price: 1_750_000, weight_min: 21 },
    ]);
    const local = FALLBACK_PACKAGES[0];
    expect(standar).toEqual({
      ...local,
      name: "Domba Standar",
      shortName: "Standar",
      target: 1_750_000,
      weightMinKg: 21,
      weightMaxKg: 25,
    });
  });

  it("contoh kontrak menghasilkan data yang sama dengan katalog lokal", () => {
    expect(toQurbanPackages(API_PACKAGES)).toEqual(FALLBACK_PACKAGES);
  });

  it("urut dari harga terendah walau API mengirim acak", () => {
    const ids = toQurbanPackages([...API_PACKAGES].reverse()).map(
      (pkg) => pkg.id,
    );
    expect(ids).toEqual(["standar", "medium", "premium"]);
  });

  it("hanya paket yang dikirim API yang tampil", () => {
    const ids = toQurbanPackages(API_PACKAGES.slice(0, 2)).map((pkg) => pkg.id);
    expect(ids).toEqual(["standar", "medium"]);
  });

  it("nama tanpa awalan Domba tetap dipakai apa adanya", () => {
    const [pkg] = toQurbanPackages([{ ...API_PACKAGES[1]!, name: "Medium" }]);
    expect(pkg).toMatchObject({ name: "Medium", shortName: "Medium" });
  });

  it("kode tidak dikenal atau data rusak dilewati", () => {
    const ids = toQurbanPackages([
      { ...API_PACKAGES[0]!, code: "sapi" },
      { ...API_PACKAGES[1]!, price: 0 },
      { ...API_PACKAGES[2]!, weight_min: 40 },
      API_PACKAGES[0]!,
    ]).map((pkg) => pkg.id);
    expect(ids).toEqual(["standar"]);
  });

  it("tidak ada paket yang valid → katalog lokal", () => {
    expect(toQurbanPackages([])).toBe(FALLBACK_PACKAGES);
    expect(toQurbanPackages([{ ...API_PACKAGES[0]!, code: "sapi" }])).toBe(
      FALLBACK_PACKAGES,
    );
  });
});
