import type { NavLink } from "@/types/navigation";
import { SITE_CONFIG } from "./site";

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  newSaving: "/tabungan/baru",
  sessionExpired: "/session/expired",
  qurban: (id: number | string) => `/qurban/${id}`,
  report: (id: number | string) => `/report/${id}`,
} as const;

export const PROTECTED_ROUTE_PREFIXES = [
  ROUTES.dashboard,
  "/tabungan",
  "/qurban",
  "/report",
] as const;

export const GUEST_ONLY_ROUTES = [ROUTES.login, ROUTES.register] as const;

export const SECTION_IDS = {
  hero: "hero",
  problem: "problem",
  valueProps: "nilai-tambah",
  howItWorks: "cara-kerja",
  packages: "paket",
  simulation: "simulasi",
  dailyCost: "sehari-cuma",
  testimonials: "testimoni",
  faq: "faq",
  contact: "kontak",
  legal: "legalitas",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const sectionHref = (id: SectionId) => `/#${id}`;

export const NAVBAR_LINKS: NavLink[] = [
  { label: "Cara Kerja", href: sectionHref(SECTION_IDS.howItWorks) },
  { label: "Paket Qurban", href: sectionHref(SECTION_IDS.packages) },
  { label: "Simulasi", href: sectionHref(SECTION_IDS.simulation) },
  { label: "FAQ", href: sectionHref(SECTION_IDS.faq) },
];

export const NAVBAR_CTA: NavLink = {
  label: "Mulai Menabung",
  href: sectionHref(SECTION_IDS.packages),
};

const foundation = (hash: string) => `${SITE_CONFIG.foundationUrl}/#${hash}`;

export const FOOTER_PROGRAM_LINKS: NavLink[] = [
  { label: "Langit Box", href: foundation("program"), external: true },
  { label: "Langit Scholarship", href: foundation("program"), external: true },
  { label: "SERASI", href: foundation("program"), external: true },
  { label: "Hadiah Kebahagiaan", href: foundation("program"), external: true },
  { label: "Zakat", href: foundation("program"), external: true },
  {
    label: "Jalan Langit Peduli",
    href: SITE_CONFIG.contact.donationUrl,
    external: true,
  },
];

export const FOOTER_ORGANIZATION_LINKS: NavLink[] = [
  { label: "Tentang Kami", href: foundation("tentang-kami"), external: true },
  { label: "Cerita Dampak", href: foundation("cerita-dampak"), external: true },
  {
    label: "Kolaborasi Kebaikan",
    href: foundation("kolaborasi"),
    external: true,
  },
  { label: "Berita & Kabar", href: foundation("berita"), external: true },
  { label: "Kontak Kami", href: sectionHref(SECTION_IDS.contact) },
  { label: "Legalitas Resmi", href: `#${SECTION_IDS.legal}` },
];
