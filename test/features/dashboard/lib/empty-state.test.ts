import { describe, expect, it } from "vitest";
import {
  buildEmptyStateIntro,
  buildEmptyStateSteps,
} from "@/features/dashboard/lib/empty-state";

describe("buildEmptyStateSteps", () => {
  it("pendaftaran dibuka → langkah kedua mengatur setoran sendiri", () => {
    const steps = buildEmptyStateSteps(true);
    expect(steps).toHaveLength(3);
    expect(steps[1]?.title).toBe("Atur setoran");
  });

  it("pendaftaran belum dibuka/ditutup → langkah kedua lewat CS QURMA", () => {
    expect(buildEmptyStateSteps(false)[1]?.title).toBe("Daftar lewat CS QURMA");
  });
});

describe("buildEmptyStateIntro", () => {
  it("ditutup → menyebut tanggal batas pendaftaran dari admin", () => {
    expect(
      buildEmptyStateIntro({ state: "closed", deadline: "2027-04-30" }),
    ).toContain("30 April 2027");
  });

  it("dibuka → ajakan mulai menabung", () => {
    expect(buildEmptyStateIntro({ state: "open" })).toMatch(/Mulai menabung/);
  });

  it("belum dibuka → dibantu CS QURMA", () => {
    expect(buildEmptyStateIntro({ state: "not_opened" })).toMatch(/CS QURMA/);
  });
});
