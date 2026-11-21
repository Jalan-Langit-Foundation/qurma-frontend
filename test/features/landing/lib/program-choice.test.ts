import { describe, expect, it } from "vitest";
import { ROUTES, SECTION_IDS, sectionHref } from "@/config/navigation";
import { PROGRAM_CHOICE_CONTENT } from "@/features/landing/lib/content/program-choice";

describe("pilihan program (Brief V1.1 bagian B & C.2)", () => {
  const items = PROGRAM_CHOICE_CONTENT.items;

  it("dua pilihan dengan nama tampilan sesuai brief", () => {
    expect(items.map((item) => [item.title, item.internalName])).toEqual([
      ["Tunaikan Qurbanmu", "Qurban Utuh"],
      ["Rencanakan Qurbanmu", "Tabungan Qurban"],
    ]);
  });

  it("tombol mengarah ke section yang ada di beranda", () => {
    expect(items.map((item) => [item.cta.label, item.cta.href])).toEqual([
      ["Lihat Pilihan Domba", ROUTES.fullPayment],
      ["Simulasi Tabungan", sectionHref(SECTION_IDS.simulation)],
    ]);
  });

  it("ringkasan angka diambil dari katalog & aturan tabungan", () => {
    const byId = (id: string) => {
      const item = items.find((entry) => entry.id === id);
      if (!item) throw new Error(`pilihan ${id} tidak ditemukan`);
      return item;
    };
    const tunaikan = byId("tunaikan");
    const rencanakan = byId("rencanakan");
    expect(tunaikan.facts.map((fact) => fact.value)).toContain(
      "Rp1.600.000 / ekor",
    );
    expect(rencanakan.facts.map((fact) => fact.value)).toContain("Rp100.000");
    expect(tunaikan.facts).toHaveLength(rencanakan.facts.length);
  });

  it("istilah internal tidak tampil di teks publik", () => {
    for (const item of items) {
      const publicText = [
        item.label,
        item.title,
        item.description,
        ...item.facts.flatMap((fact) => [fact.label, fact.value]),
      ].join(" ");
      expect(publicText).not.toContain("Qurban Utuh");
      expect(publicText).not.toContain("Tabungan Qurban");
    }
  });
});
