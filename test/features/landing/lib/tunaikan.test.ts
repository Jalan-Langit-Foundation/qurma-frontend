import { describe, expect, it } from "vitest";
import { TUNAIKAN_CONTENT } from "@/features/landing/lib/content/tunaikan";

function decodedMessage(url: string) {
  const text = new URL(url).searchParams.get("text");
  if (text === null) throw new Error("URL WhatsApp tanpa pesan");
  return text;
}

describe("jalur Tunaikan Qurbanmu (Brief V1.1 bagian D & G.1)", () => {
  const { options } = TUNAIKAN_CONTENT;

  it("tiga pilihan domba publik, urut dari Standar", () => {
    expect(options.map((option) => option.name)).toEqual([
      "Domba Standar",
      "Domba Medium",
      "Domba Premium",
    ]);
  });

  it("bobot ditulis sebagai target, harga dari katalog", () => {
    const [standar] = options;
    expect(standar?.weightLabel).toBe("Target bobot 20–25 kg");
    expect(standar?.priceLabel).toBe("Rp1.600.000");
  });

  it("tombol membuka WhatsApp dengan pesan berisi domba pilihan", () => {
    for (const option of options) {
      expect(option.whatsappUrl).toMatch(/^https:\/\/wa\.me\/\d*\?text=/);
      const message = decodedMessage(option.whatsappUrl);
      expect(message).toContain("pembayaran penuh");
      expect(message).not.toContain("Tabungan");
      expect(message).toContain(`Pilihan domba: ${option.name}`);
      expect(message).toContain(`Harga paket: ${option.priceLabel}`);
    }
  });

  it("setiap domba punya foto ilustrasi beralt dan penanda dari katalog", () => {
    for (const option of options) {
      expect(option.photo.src).toBeDefined();
      expect(option.photo.alt.length).toBeGreaterThan(10);
      expect(option.badge.length).toBeGreaterThan(0);
    }
    expect(TUNAIKAN_CONTENT.footnote).toContain("ilustrasi");
  });

  it("kode grade internal tidak tampil ke publik", () => {
    for (const option of options) {
      const publicText = [
        option.name,
        option.weightLabel,
        option.badge,
        option.photo.alt,
        decodedMessage(option.whatsappUrl),
      ].join(" ");
      expect(publicText).not.toMatch(/grade/i);
    }
  });
});
