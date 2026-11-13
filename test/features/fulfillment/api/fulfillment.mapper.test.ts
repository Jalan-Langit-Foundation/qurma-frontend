import { describe, expect, it } from "vitest";
import type {
  ReportDto,
  TrackingDto,
} from "@/features/fulfillment/api/fulfillment.dto";
import {
  toShohibulReport,
  toTracking,
  toWeightKg,
} from "@/features/fulfillment/api/fulfillment.mapper";

describe("toWeightKg", () => {
  it.each([
    [24, 24],
    ["24.50", 24.5],
    [null, null],
    ["", null],
    ["abc", null],
    [0, null],
  ] as const)("%s → %s", (input, expected) => {
    expect(toWeightKg(input)).toBe(expected);
  });
});

describe("toTracking", () => {
  it("memetakan contoh dari API Contract", () => {
    const dto: TrackingDto = {
      saving_id: 1,
      available: true,
      status: "waiting_execution",
      steps: [
        { key: "funds", state: "done" },
        { key: "animal", state: "done" },
        { key: "verification", state: "done" },
        { key: "execution", state: "in_progress" },
        { key: "report", state: "pending" },
      ],
      details: { animal_weight: 24, slaughter_date: null, location: null },
    };

    expect(toTracking(dto)).toEqual({
      savingId: 1,
      available: true,
      status: "waiting_execution",
      steps: dto.steps,
      animalWeightKg: 24,
      slaughterDate: null,
      location: null,
    });
  });
});

describe("toShohibulReport", () => {
  const dto: ReportDto = {
    saving_id: 1,
    program_year: 2027,
    shohibul_name: "Budi Santoso",
    package: { code: "start", name: "Start" },
    animal_weight: 24,
    location: "Karawang",
    slaughter_date: "2027-05-17",
    notes: "Alhamdulillah qurban telah ditunaikan.",
    published_at: "2027-05-19T10:00:00+07:00",
    photos: {
      // Contoh di contract memuat spasi di akhir URL
      animal: [{ id: 1, url: "https://api.example.id/storage/reports/1.jpg " }],
      slaughter: [],
      distribution: [{ id: 3, url: "   " }],
    },
  };

  it("merapikan URL foto dan membuang URL kosong", () => {
    const report = toShohibulReport(dto);
    expect(report.photos.animal).toEqual([
      { id: 1, url: "https://api.example.id/storage/reports/1.jpg" },
    ]);
    expect(report.photos.slaughter).toEqual([]);
    expect(report.photos.distribution).toEqual([]);
  });

  it("memetakan data laporan", () => {
    expect(toShohibulReport(dto)).toMatchObject({
      shohibulName: "Budi Santoso",
      packageName: "Start",
      animalWeightKg: 24,
      slaughterDate: "2027-05-17",
    });
  });
});
