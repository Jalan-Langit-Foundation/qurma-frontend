import type { FeatureName } from "./env";
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
  account: "/akun",
  terms: "/syarat-ketentuan",
  transactions: "/transaksi",
  receipt: (transactionId: number | string) => `/kwitansi/${transactionId}`,
} as const;

export const PROTECTED_ROUTE_PREFIXES = [
  ROUTES.dashboard,
  "/tabungan",
  "/qurban",
  "/report",
  ROUTES.account,
  ROUTES.transactions,
  "/kwitansi",
] as const;

export const GUEST_ONLY_ROUTES = [ROUTES.login, ROUTES.register] as const;

export const SECTION_IDS = {
  hero: "hero",
  programChoice: "pilih-cara-berqurban",
  fullPayment: "tunaikan-qurbanmu",
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

export const NAVBAR_MEMBER_CTA: NavLink = {
  label: "Dashboard",
  href: ROUTES.dashboard,
};

export const MEMBER_SECTION_IDS = {
  packages: "paket",
  schedule: "jadwal",
} as const;

export type MemberNavIcon = "home" | "package" | "calendar" | "receipt";

export interface MemberNavItem {
  label: string;
  href: string;
  icon: MemberNavIcon;
  feature?: FeatureName;
  activePrefixes?: readonly string[];
}

export const MEMBER_NAV_ITEMS: readonly MemberNavItem[] = [
  {
    label: "Ringkasan",
    href: ROUTES.dashboard,
    icon: "home",
    activePrefixes: ["/tabungan", "/qurban", "/report"],
  },
  {
    label: "Paket",
    href: `${ROUTES.dashboard}#${MEMBER_SECTION_IDS.packages}`,
    icon: "package",
  },
  {
    label: "Jadwal",
    href: `${ROUTES.dashboard}#${MEMBER_SECTION_IDS.schedule}`,
    icon: "calendar",
  },
  {
    label: "Transaksi",
    href: ROUTES.transactions,
    icon: "receipt",
    feature: "transactions",
  },
];

export const ACCOUNT_SECTION_IDS = {
  personal: "data-pribadi",
  security: "keamanan",
} as const;

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
  { label: "Syarat & Ketentuan", href: ROUTES.terms },
];
