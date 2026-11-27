import type { StaticImageData } from "next/image";
import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import {
  formatWeightRange,
  type PackageId,
  type QurbanPackage,
} from "@/features/packages";
import { formatRupiah } from "@/lib/format";
import dombaMedium from "@/public/images/programs/qurban/domba-medium.webp";
import dombaPremium from "@/public/images/programs/qurban/domba-premium.webp";
import dombaStandar from "@/public/images/programs/qurban/domba-standar.webp";

export interface DombaOption {
  id: string;
  name: string;
  badge: string;
  weightLabel: string;
  priceLabel: string;
  photo: { src: StaticImageData; alt: string };
  whatsappUrl: string;
}

interface TunaikanStep {
  title: string;
  description: string;
}

const DOMBA_PHOTOS: Record<PackageId, { src: StaticImageData; alt: string }> = {
  standar: {
    src: dombaStandar,
    alt: "Domba tanpa tanduk berdiri di kandang bambu",
  },
  medium: {
    src: dombaMedium,
    alt: "Domba bertanduk melingkar dilihat dari samping",
  },
  premium: {
    src: dombaPremium,
    alt: "Domba putih bertanduk besar di bawah tenda",
  },
};

export const buildDombaOptions = (
  packages: readonly QurbanPackage[],
): DombaOption[] =>
  packages.map((pkg) => {
    const { name } = pkg;
    const weight = formatWeightRange(pkg);
    const price = formatRupiah(pkg.target);

    return {
      id: pkg.id,
      name,
      badge: pkg.note,
      weightLabel: `Target bobot ${weight}`,
      priceLabel: price,
      photo: DOMBA_PHOTOS[pkg.id],
      whatsappUrl: buildWhatsappUrl(
        WHATSAPP_MESSAGES.fullPayment({ packageName: name, weight, price }),
      ),
    };
  });

export const TUNAIKAN_CONTENT = {
  label: "Bayar penuh",
  title: "Tunaikan Qurbanmu",
  tagline: "Qurbanmu, kebahagiaan bagi sesama.",
  intro:
    "Pilih satu ekor domba sesuai kemampuan, lalu konsultasikan dengan CS QURMA untuk pembayaran penuh.",
  paragraphs: [
    "Berqurban dapat dipersiapkan sesuai kemampuan. Bersama QURMA (Qurban Untuk Sesama), wujudkan niat ibadahmu melalui pilihan paket domba dengan tetap mengutamakan kesehatan dan kelayakan hewan sesuai syariat.",
    "Pilih satu ekor domba sesuai kebutuhan dan tunaikan pembayarannya. Jalan Langit Foundation akan membantu proses pengadaan, penyembelihan, hingga penyaluran manfaat qurban kepada masyarakat di wilayah yang membutuhkan.",
  ],
  optionsLabel: "Pilihan domba",
  priceUnit: "/ ekor",
  photoNote: "Foto ilustrasi",
  ctaLabel: "Konsultasi",
  footnote:
    "Foto merupakan ilustrasi dari dokumentasi JLF. Harga dan ketersediaan domba dikonfirmasi oleh CS QURMA sebelum pembayaran. Bobot merupakan target spesifikasi, bukan jaminan angka tepat.",
  aboutLabel: "Tentang Tunaikan Qurbanmu",
  stepsLabel: "Langkahnya",
  steps: [
    {
      title: "Pilih domba",
      description: "Tentukan Domba Standar, Medium, atau Premium.",
    },
    {
      title: "Konsultasi CS",
      description:
        "WhatsApp terbuka dengan pesan berisi domba pilihanmu, tinggal kirim.",
    },
    {
      title: "Konfirmasi & bayar",
      description:
        "CS mengonfirmasi produk dan memberi instruksi pembayaran resmi.",
    },
  ] satisfies TunaikanStep[],
} as const;
