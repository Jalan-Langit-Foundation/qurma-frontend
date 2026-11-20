import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import { ALL_PACKAGES, formatWeightRange } from "@/features/packages";
import { formatRupiah } from "@/lib/format";

export interface DombaOption {
  id: string;
  name: string;
  weightLabel: string;
  priceLabel: string;
  whatsappUrl: string;
}

interface TunaikanStep {
  title: string;
  description: string;
}

const DOMBA_OPTIONS: DombaOption[] = ALL_PACKAGES.map((pkg) => {
  const name = `Domba ${pkg.name}`;
  const weight = formatWeightRange(pkg);
  const price = formatRupiah(pkg.target);

  return {
    id: pkg.id,
    name,
    weightLabel: `Target bobot ${weight}`,
    priceLabel: price,
    whatsappUrl: buildWhatsappUrl(
      WHATSAPP_MESSAGES.fullPayment({ packageName: name, weight, price }),
    ),
  };
});

export const TUNAIKAN_CONTENT = {
  label: "Bayar penuh",
  title: "Tunaikan Qurbanmu",
  tagline: "Qurbanmu, kebahagiaan bagi sesama.",
  paragraphs: [
    "Berqurban dapat dipersiapkan sesuai kemampuan. Bersama QURMA (Qurban Untuk Sesama), wujudkan niat ibadahmu melalui pilihan paket domba dengan tetap mengutamakan kesehatan dan kelayakan hewan sesuai syariat.",
    "Pilih satu ekor domba sesuai kebutuhan dan tunaikan pembayarannya. Jalan Langit Foundation akan membantu proses pengadaan, penyembelihan, hingga penyaluran manfaat qurban kepada masyarakat di wilayah yang membutuhkan.",
  ],
  optionsLabel: "Pilihan domba",
  options: DOMBA_OPTIONS,
  ctaLabel: "Konsultasi",
  footnote:
    "Harga dan ketersediaan domba dikonfirmasi oleh CS QURMA sebelum pembayaran. Bobot merupakan target spesifikasi, bukan jaminan angka tepat.",
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
