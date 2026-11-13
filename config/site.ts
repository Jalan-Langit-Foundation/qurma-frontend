import { env } from "./env";

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
  programName: "QURMA 2027",
  programFullName: "Tabungan Qurban QURMA 2027",
  tagline: "#BergandenganLangitkanKebaikan",
  url: env.siteUrl,
  foundationUrl: "https://www.jalanlangitfoundation.id",
  description:
    "Qurban Nggak Harus Menunggu. Bisa Dipersiapkan dari Sekarang. Program pendampingan tabungan qurban 1448 H / 2027 M yang terencana, transparan, dan terpercaya bersama Yayasan Jalan Langit.",
  foundationSummary:
    "Menggerakkan kebaikan menjadi manfaat nyata bagi masyarakat melalui program sosial, pendidikan, kemanusiaan, dan pemberdayaan.",
  keywords: [
    "Tabungan Qurban",
    "QURMA 2027",
    "Qurban 1448 H",
    "Jalan Langit Foundation",
    "Yayasan Jalan Langit",
    "Qurban Sukabumi",
    "Simulasi Tabungan Qurban",
    "Domba Qurban 2027",
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
