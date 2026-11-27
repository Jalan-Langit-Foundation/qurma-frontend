import { describe, expect, it } from "vitest";
import { TESTIMONIALS_CONTENT } from "@/features/landing/lib/content/testimonials";

const wordCount = (text: string) => text.trim().split(/\s+/).length;

describe("testimoni (Brief V1.1 bagian M)", () => {
  const { items } = TESTIMONIALS_CONTENT;

  it("tepat dua kartu: penerima manfaat dan mudhohi", () => {
    expect(TESTIMONIALS_CONTENT.headline).toBe("Cerita Kebaikan yang Sampai");
    expect(items.map((item) => item.id)).toEqual([
      "penerima-manfaat",
      "mudhohi",
    ]);
  });

  it("kutipan hanya boleh diisi bila nama & bukti izin sudah ada", () => {
    for (const item of items) {
      if (item.quote === null) continue;
      expect(item.name, `${item.id}: nama/inisial`).toBeTruthy();
      expect(item.consentRef, `${item.id}: bukti izin`).toBeTruthy();
    }
  });

  it("kutipan ringkas (maksimal ±50 kata)", () => {
    for (const item of items) {
      if (item.quote === null) continue;
      expect(wordCount(item.quote)).toBeLessThanOrEqual(55);
    }
  });
});
