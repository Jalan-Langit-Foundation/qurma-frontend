import { describe, expect, it } from "vitest";
import { WHY_QURMA_CONTENT } from "@/features/landing/lib/content/why-qurma";

describe("Mengapa QURMA Hadir? (Brief V1.1 bagian L)", () => {
  it("headline dan narasi utama sesuai brief", () => {
    expect(WHY_QURMA_CONTENT.headline).toBe(
      "Agar manfaat qurban menjangkau lebih banyak keluarga.",
    );
    expect(WHY_QURMA_CONTENT.description).toMatch(
      /^Tidak semua keluarga berkesempatan menerima daging qurban/,
    );
  });

  it("angka dampak diklaim sebagai capaian QURMA 2026, bukan target 2027", () => {
    const { impact } = WHY_QURMA_CONTENT;
    expect(impact.value).toBe(669);
    expect(impact.label).toBe("penerima manfaat QURMA 2026");
    expect(impact.locations).toEqual(["Cimaung", "Pangalengan", "Ciwidey"]);
    expect(impact.note).toContain("QURMA 2026");
  });

  it("cerita lengkap tersedia untuk panel buka-tutup", () => {
    const { story } = WHY_QURMA_CONTENT;
    expect(story.toggleLabel).toBe("Baca cerita QURMA selengkapnya");
    expect(story.chapters).toHaveLength(4);
    for (const chapter of story.chapters) {
      expect(chapter.body.length).toBeGreaterThan(0);
    }
  });
});
