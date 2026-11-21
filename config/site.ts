import { env } from "./env";
import { PROGRAM } from "./program";

const CONTACT = {
  email: "jalanlangitfoundation@gmail.com",
  address: {
    lines: [
      "Jl. Saturnus Tengah I No. 1, Manjahlega,",
      "Kec. Rancasari, Kota Bandung, Jawa Barat 40286",
    ],
    mapsUrl: "https://maps.app.goo.gl/bPVZ75H55M8tGzzk8",
  },
  instagramUrl: "https://instagram.com/jalanlangit.official",
  donationUrl: "https://yayasanjalanlangitpeduli.amalsholeh.com/",
} as const;

export const SITE_CONFIG = {
  name: "Jalan Langit Foundation",
  legalName: "Yayasan Jalan Langit",
  programName: PROGRAM.name,
  programFullName: PROGRAM.fullName,
  tagline: "#BergandenganLangitkanKebaikan",
  url: env.siteUrl,
  foundationUrl: "https://www.jalanlangitfoundation.id",
  description: `${PROGRAM.name} bersama Jalan Langit Foundation: Tunaikan Qurbanmu dengan bayar penuh, atau Rencanakan Qurbanmu lewat tabungan bertahap menuju Iduladha ${PROGRAM.year}.`,
  foundationSummary:
    "Menggerakkan kebaikan menjadi manfaat nyata bagi masyarakat melalui program sosial, pendidikan, kemanusiaan, dan pemberdayaan.",
  keywords: [
    "Tunaikan Qurbanmu",
    "Rencanakan Qurbanmu",
    "Tabungan Qurban",
    PROGRAM.name,
    `Qurban ${PROGRAM.hijriLabel}`,
    "Jalan Langit Foundation",
    "Yayasan Jalan Langit",
    "Qurban Sukabumi",
    "Simulasi Tabungan Qurban",
    `Domba Qurban ${PROGRAM.year}`,
  ],
  logo: {
    blue: "/images/brand/logo-biru.png",
    white: "/images/brand/logo-putih.png",
  },
  legal: {
    institution: {
      title: "Legalitas Kelembagaan",
      identifier: "AHU-0024939.AH.01.04.Tahun 2022",
    },
    zakat: {
      title: "Kemitraan Zakat",
      identifier: "UKZ bersama IBS Foundation",
    },
  },
  contact: CONTACT,

  socialLinks: [
    { label: "Instagram", href: CONTACT.instagramUrl },
    { label: "Email", href: `mailto:${CONTACT.email}` },
    { label: "Alamat", href: CONTACT.address.mapsUrl },
  ],
} as const;
