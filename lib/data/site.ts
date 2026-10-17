import { FoundationContact } from "@/types";

export const SITE_CONFIG = {
  name: "Jalan Langit Foundation",
  legalName: "Yayasan Jalan Langit",
  tagline: "#BergandenganLangitkanKebaikan",
  url: "https://www.jalanlangitfoundation.id",
  description:
    "Kami menggerakkan kebaikan melalui program sosial, pendidikan, kemanusiaan, dan pemberdayaan untuk menghadirkan manfaat nyata bagi masyarakat.",
  legal: {
    institution: {
      title: "Legalitas Kelembagaan",
      identifier: "AHU-0024939.AH.01.04.Tahun 2022",
      authority: "Terdaftar Resmi Kemenkumham RI",
    },
    zakat: {
      title: "Kemitraan Zakat",
      identifier: "UKZ bersama IBS Foundation",
      description: "Mitra Pengelolaan Zakat Resmi",
    },
  },
  contact: {
    email: "jalanlangitfoundation@gmail.com",
    address: {
      text: "Jl. Saturnus Tengah I No. 1, Manjahlega, Kec. Rancasari, Kota Bandung, Jawa Barat 40286",
      mapsUrl: "https://maps.app.goo.gl/bPVZ75H55M8tGzzk8",
    },
    instagram: {
      handle: "@jalanlangit.official",
      url: "https://instagram.com/jalanlangit.official",
    },
    donationUrl: "https://yayasanjalanlangitpeduli.amalsholeh.com/",
  } satisfies FoundationContact,
  socialLinks: [
    {
      name: "Instagram",
      href: "https://instagram.com/jalanlangit.official",
      isExternal: true,
    },
    {
      name: "Email",
      href: "mailto:jalanlangitfoundation@gmail.com",
      isExternal: true,
    },
    {
      name: "Alamat",
      href: "https://maps.app.goo.gl/bPVZ75H55M8tGzzk8",
      isExternal: true,
    },
  ],
};
