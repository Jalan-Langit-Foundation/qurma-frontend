import { SECTION_IDS, sectionHref } from "@/config/navigation";
import { PROGRAM } from "@/config/program";
import heroPhoto from "@/public/images/programs/qurban/hero-qurma-2027.webp";

/** Hero beranda (Brief Revisi V1.1, bagian C.1). */
export const HERO_CONTENT = {
  badge: `${PROGRAM.name} • Jalan Langit Foundation`,
  headline: ["Awali Niat Baikmu.", "Persiapkan Qurbanmu."],
  description:
    "Qurban bukan hanya tentang menunaikan ibadah, tetapi juga tentang menghadirkan manfaat bagi sesama. Mari persiapkan qurbanmu bersama Jalan Langit Foundation.",
  primaryCta: {
    label: "Lihat Paket Qurban",
    href: sectionHref(SECTION_IDS.packages),
  },
  secondaryCta: {
    label: "Pelajari Tabungan",
    href: sectionHref(SECTION_IDS.simulation),
  },
  /**
   * Foto dokumentasi asli JLF. Diimpor statis agar ukuran asli terbaca saat
   * build: foto tampil utuh (width 100%, height auto) tanpa dipotong.
   */
  photo: {
    src: heroPhoto,
    alt: "Dokumentasi kegiatan qurban Jalan Langit Foundation",
  },
} as const;
