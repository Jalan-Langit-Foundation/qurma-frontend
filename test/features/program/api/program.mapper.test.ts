import { describe, expect, it } from "vitest";
import type { ProgramDto } from "@/features/program/api/program.dto";
import { toProgramInfo } from "@/features/program/api/program.mapper";
import { FALLBACK_SCHEDULE } from "@/features/program/lib/fallback";

const dto = (patch: Partial<ProgramDto["program"]> = {}): ProgramDto => ({
  program: {
    year: 2027,
    default_tenor: 7,
    max_tenor: 12,
    rounding: 5000,
    registration_open: true,
    registration_deadline: "2027-04-30",
    idul_adha_date: "2027-05-17",
    idul_adha_is_estimate: true,
    payoff_deadline: "2027-05-07",
    last_installment_month: "2027-05",
    packages: [
      {
        code: "standar",
        name: "Domba Standar",
        price: 1_600_000,
        weight_min: 20,
        weight_max: 25,
      },
    ],
    ...patch,
  },
});

describe("toProgramInfo", () => {
  it("memetakan jadwal yang ditetapkan CS QURMA", () => {
    const info = toProgramInfo(dto());
    expect(info.source).toBe("api");
    expect(info.schedule).toEqual({
      openingMonth: FALLBACK_SCHEDULE.openingMonth,
      lastInstallmentMonth: "2027-05",
      maxTenor: 12,
      defaultTenor: 7,
      rounding: 5000,
      payoffDeadline: "2027-05-07",
      eidAlAdhaDate: "2027-05-17",
      eidAlAdhaIsEstimate: true,
    });
    expect(info.registration).toEqual({ open: true, deadline: "2027-04-30" });
    expect(info.packages[0]?.target).toBe(1_600_000);
  });

  it("memakai opening_month dari backend bila tersedia", () => {
    expect(
      toProgramInfo(dto({ opening_month: "2026-12" })).schedule.openingMonth,
    ).toBe("2026-12");
  });

  it("field rusak diganti cadangan satu per satu, sisanya tetap dari API", () => {
    const { schedule } = toProgramInfo(
      dto({
        payoff_deadline: "7 Mei 2027",
        last_installment_month: "2027-13",
        max_tenor: 0,
        rounding: -5,
      }),
    );
    expect(schedule.payoffDeadline).toBe(FALLBACK_SCHEDULE.payoffDeadline);
    expect(schedule.lastInstallmentMonth).toBe(
      FALLBACK_SCHEDULE.lastInstallmentMonth,
    );
    expect(schedule.maxTenor).toBe(FALLBACK_SCHEDULE.maxTenor);
    expect(schedule.rounding).toBe(FALLBACK_SCHEDULE.rounding);
    expect(schedule.eidAlAdhaDate).toBe("2027-05-17");
  });

  it("status pendaftaran tidak lengkap → null (dianggap tidak diketahui)", () => {
    expect(
      toProgramInfo(dto({ registration_deadline: "" })).registration,
    ).toBeNull();
  });

  it("paket kosong → katalog lokal", () => {
    expect(
      toProgramInfo(dto({ packages: [] })).packages.length,
    ).toBeGreaterThan(0);
  });
});
