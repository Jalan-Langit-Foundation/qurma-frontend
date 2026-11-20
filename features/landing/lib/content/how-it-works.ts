import { ALL_PACKAGES } from "@/features/packages";
import type { FeatureCardItem } from "../../components/feature-card";

const PACKAGE_NAMES = new Intl.ListFormat("id-ID", {
  type: "disjunction",
}).format(ALL_PACKAGES.map((pkg) => pkg.name));

export const HOW_IT_WORKS_CONTENT = {
  headline: {
    line1: "6 Langkah Mudah Menuju",
    line2: "Ibadah Qurban Sempurna",
  },
  description:
    "Alur terstruktur dari pemilihan paket hingga laporan dokumentasi pelaksanaan qurban.",
  steps: [
    {
      id: "pilih-target",
      step: 1,
      title: "Pilih Target Qurban",
      description: `Pilih paket domba yang sesuai (${PACKAGE_NAMES}).`,
      hashtag: "#PilihPaket",
    },
    {
      id: "simulasi",
      step: 2,
      title: "Simulasi & Rencana",
      description:
        "Atur rencana jumlah setoran dan lihat perkiraan nominalnya hingga batas pelunasan.",
      hashtag: "#SimulasiTerjangkau",
    },
    {
      id: "pendaftaran",
      step: 3,
      title: "Konsultasi & Daftar",
      description:
        "Hubungi CS QURMA untuk konfirmasi paket, pendaftaran, dan instruksi setoran resmi.",
      hashtag: "#PendaftaranMudah",
    },
    {
      id: "setor",
      step: 4,
      title: "Setor Bertahap",
      description:
        "Setor sesuai rencanamu. Saldo dikonfirmasi CS melalui WhatsApp setelah setoran diverifikasi.",
      hashtag: "#SetoranFleksibel",
    },
    {
      id: "domba-disiapkan",
      step: 5,
      title: "Domba Dipersiapkan",
      description:
        "Setelah target 100%, tim JLF memverifikasi bobot dan kesehatan hewan qurban.",
      hashtag: "#VerifikasiKesehatan",
    },
    {
      id: "pelaksanaan",
      step: 6,
      title: "Pelaksanaan & Laporan",
      description:
        "Penyembelihan syar'i dilaksanakan dan laporan dokumentasi dikirimkan ke Anda.",
      hashtag: "#LaporanDokumentasi",
    },
  ] satisfies FeatureCardItem[],
} as const;
