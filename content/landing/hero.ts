export interface HeroSlide {
  id: string;
  src: string;
  alt: string;
}

export interface HeroContent {
  badge: string;
  headline: {
    line1: string;
    line2: string;
    highlight: string;
  };
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  slides: HeroSlide[];
  intervalMs: number;
}

export const HERO_SLIDES: HeroSlide[] = [
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
];

export const HERO_CONTENT: HeroContent = {
  badge: "QURMA 1448 H / 2027 M",
  headline: {
    line1: "Tabungan Qurban Terencana,",
    line2: "Ibadah Tenang",
    highlight: "Penuh Kepastian.",
  },
  description:
    "Bersiap menyambut Idul Adha 2027 dengan setoran bulanan yang ringan, transparan, dan teratur. Bebas rasa cemas dari pengeluaran mendadak dengan pendampingan amanah dari Yayasan Jalan Langit.",
  primaryCtaText: "Mulai Rencana Qurban",
  secondaryCtaText: "Simulasi Tabungan",
  slides: HERO_SLIDES,
  intervalMs: 5000,
};

export const HERO_CONFIG = {
  intervalMs: HERO_CONTENT.intervalMs,
  slides: HERO_CONTENT.slides,
};
