import { SECTION_IDS, sectionHref } from "@/config/navigation";
import { PROGRAM } from "@/config/program";
import { SAVINGS_PROGRAM } from "@/features/savings";
import { formatRupiah } from "@/lib/format";
import heroPhoto from "@/public/images/programs/qurban/hero-qurma-2027.webp";

export const HERO_CONTENT = {
  badge: `${PROGRAM.name} • Jalan Langit Foundation`,
  headline: ["Qurbanmu,", "Kebahagiaan bagi Sesama."],
  description:
    "Bantu hadirkan daging qurban bagi keluarga yang jarang mendapatkannya. Pilih paket domba untuk ditunaikan secara penuh atau persiapkan dananya bertahap bersama QURMA.",

  savingsHighlight: {
    title: `Mulai Tabungan Qurban dari ${formatRupiah(SAVINGS_PROGRAM.minDepositAmount)} per setoran`,
    description:
      "Belum siap membayar sekaligus? Kumpulkan dana sesuai kemampuan hingga mencapai harga paket pilihanmu.",
  },

  footnote: `${formatRupiah(SAVINGS_PROGRAM.minDepositAmount)} adalah nominal setoran tabungan, bukan harga paket domba. Kalkulator menampilkan estimasi, bukan jadwal tagihan otomatis.`,
  primaryCta: {
    label: "Lihat Paket Qurban",
    href: sectionHref(SECTION_IDS.packages),
  },
  secondaryCta: {
    label: "Pelajari Tabungan",
    href: sectionHref(SECTION_IDS.simulation),
  },

  photo: {
    src: heroPhoto,
    alt: "Dokumentasi kegiatan qurban Jalan Langit Foundation",
  },
} as const;
