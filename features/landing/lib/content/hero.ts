import { SECTION_IDS } from "@/config/navigation";
import { PROGRAM } from "@/config/program";

export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
}

export const HERO_CONTENT = {
  badge: `${PROGRAM.name} • Jalan Langit Foundation`,
  headline: ["Qurban Tanpa Beban,", "Siapkan dari Sekarang"],
  description: `Tunaikan niat mulia berqurban ${PROGRAM.periodLabel} tanpa beban finansial mendadak. Kumpulkan dana secara bertahap, pantau pertumbuhan hewan secara transparan, dan raih keberkahan bersama Yayasan Jalan Langit.`,
  primaryCta: {
    label: "Mulai Tabungan Qurban",
    href: `#${SECTION_IDS.packages}`,
  },
  secondaryCta: {
    label: "Hitung Simulasi Saya",
    href: `#${SECTION_IDS.simulation}`,
  },
  intervalMs: 5000,
  slides: [
    {
      id: "slide-1",
      src: "/images/programs/qurban/qurban-01.webp",
      alt: "Penyaluran dan dokumentasi qurban berkah Yayasan Jalan Langit",
    },
    {
      id: "slide-2",
      src: "/images/programs/qurban/qurban-02.webp",
      alt: "Pemberdayaan dan kebersamaan program qurban bagi masyarakat dan santri",
    },
    {
      id: "slide-3",
      src: "/images/programs/qurban/qurban-03.webp",
      alt: "Amanah penyaluran hewan qurban sehat bersama Yayasan Jalan Langit",
    },
    {
      id: "slide-4",
      src: "/images/programs/qurban/qurban-04.webp",
      alt: "Peternak binaan dan hewan qurban terawat sesuai syariat",
    },
    {
      id: "slide-5",
      src: "/images/programs/qurban/qurban-05.webp",
      alt: "Keceriaan dan keberkahan Idul Adha bersama Shohibul Qurban",
    },
  ] satisfies HeroSlide[],
} as const;
