import type { FeatureName } from "./env";
import type { NavLink } from "@/types/navigation";
import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "./contact";
import { SITE_CONFIG } from "./site";

export const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  dashboard: "/dashboard",
  newSaving: "/tabungan/baru",
  savingSchedule: "/tabungan/jadwal",
  savingPackages: "/tabungan/paket",
  sessionExpired: "/session/expired",
  qurban: (id: number | string) => `/qurban/${id}`,
  report: (id: number | string) => `/report/${id}`,
  account: "/akun",
  terms: "/syarat-ketentuan",
  fullPayment: "/tunaikan-qurbanmu",
  transactions: "/transaksi",
} as const;

export const PROTECTED_ROUTE_PREFIXES = [
  ROUTES.dashboard,
  "/tabungan",
  "/qurban",
  "/report",
  ROUTES.account,
  ROUTES.transactions,
] as const;

export const GUEST_ONLY_ROUTES = [ROUTES.login, ROUTES.register] as const;

export const SECTION_IDS = {
  hero: "hero",
  programChoice: "pilih-cara-berqurban",
  whyQurma: "mengapa-qurma",
  testimonials: "testimoni",
  packages: "paket",
  simulation: "simulasi",
  registrationFlow: "alur-pendaftaran",
  documentation: "dokumentasi",
  termsSummary: "ringkasan-ketentuan",
  faq: "faq",
  contact: "kontak",
  legal: "legalitas",
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

export const sectionHref = (id: SectionId) => `/#${id}`;

export const NAVBAR_LINKS: NavLink[] = [
  { label: "Mengapa QURMA", href: sectionHref(SECTION_IDS.whyQurma) },
  { label: "Paket", href: sectionHref(SECTION_IDS.packages) },
  { label: "Simulasi", href: sectionHref(SECTION_IDS.simulation) },
  { label: "Alur Daftar", href: sectionHref(SECTION_IDS.registrationFlow) },
  { label: "FAQ", href: sectionHref(SECTION_IDS.faq) },
];

export const NAVBAR_CTA: NavLink = {
  label: "Konsultasi",
  href: buildWhatsappUrl(WHATSAPP_MESSAGES.consultation),
  external: true,
};

export const NAVBAR_MEMBER_CTA: NavLink = {
  label: "Dashboard",
  href: ROUTES.dashboard,
};

/** Anchor di dashboard saat belum punya tabungan (daftar paket). */
export const MEMBER_SECTION_IDS = {
  packages: "paket",
} as const;

export type MemberNavIcon =
  "home" | "calendar" | "package" | "track" | "report" | "receipt" | "chat";

/** "saving": butuh tabungan; "report": terkunci sampai Shohibul Report terbit */
export type MemberNavRequirement = "saving" | "report";

export interface MemberNavItem {
  id: string;
  label: string;
  icon: MemberNavIcon;
  /** Fungsi untuk halaman per tabungan, mis. /qurban/[id] */
  href: string | ((savingId: number) => string);
  requires?: MemberNavRequirement;
  /** Teks kecil saat menu terkunci */
  lockedHint?: string;
  /** Badge bulan setoran berikutnya */
  showNextMonth?: boolean;
  feature?: FeatureName;
  activePrefixes?: readonly string[];
}

export interface MemberNavGroup {
  label: string;
  items: readonly MemberNavItem[];
}

export const MEMBER_NAV_GROUPS: readonly MemberNavGroup[] = [
  {
    label: "Tabungan",
    items: [
      {
        id: "ringkasan",
        label: "Ringkasan",
        href: ROUTES.dashboard,
        icon: "home",
        activePrefixes: ["/tabungan/baru"],
      },
      {
        id: "jadwal",
        label: "Jadwal setoran",
        href: ROUTES.savingSchedule,
        icon: "calendar",
        requires: "saving",
        showNextMonth: true,
      },
      {
        id: "paket",
        label: "Paket qurban",
        href: ROUTES.savingPackages,
        icon: "package",
      },
      {
        id: "lacak",
        label: "Lacak qurban",
        href: ROUTES.qurban,
        icon: "track",
        requires: "saving",
        activePrefixes: ["/qurban"],
      },
      {
        id: "laporan",
        label: "Laporan qurban",
        href: ROUTES.report,
        icon: "report",
        requires: "report",
        lockedHint: "Setelah Iduladha",
        activePrefixes: ["/report"],
      },
    ],
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
