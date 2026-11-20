import { SECTION_IDS, sectionHref } from "@/config/navigation";
import { ALL_PACKAGES } from "@/features/packages";
import { PAYMENT_DEADLINE, SAVINGS_PROGRAM } from "@/features/savings";
import { formatRupiah } from "@/lib/format";

export interface ProgramFact {
  label: string;
  value: string;
}

export interface ProgramChoice {
  id: "tunaikan" | "rencanakan";
  /** Nama internal (Brief V1.1) — tidak ditampilkan ke publik. */
  internalName: string;
  label: string;
  title: string;
  description: string;
  facts: ProgramFact[];
  cta: { label: string; href: string };
}

const lowestPackagePrice = Math.min(...ALL_PACKAGES.map((pkg) => pkg.target));

export const PROGRAM_CHOICE_CONTENT = {
  headline: {
    line1: "Pilih Cara Berqurban",
    line2: "yang Sesuai Untukmu",
  },
  description:
    "Setiap niat baik punya cara untuk diwujudkan. Bersama QURMA, pilih cara berqurban yang sesuai dengan kesiapanmu.",
  items: [
    {
      id: "tunaikan",
      internalName: "Qurban Utuh",
      label: "Bayar penuh",
      title: "Tunaikan Qurbanmu",
      description:
        "Pilih satu ekor domba sesuai kemampuan dan tunaikan qurban melalui pembayaran penuh.",
      facts: [
        { label: "Pembayaran", value: "Penuh, sekali bayar" },
        {
          label: "Mulai dari",
          value: `${formatRupiah(lowestPackagePrice)} / ekor`,
        },
        { label: "Langkah berikutnya", value: "Konsultasi CS via WhatsApp" },
      ],
      cta: {
        label: "Lihat Pilihan Domba",
        href: sectionHref(SECTION_IDS.fullPayment),
      },
    },
    {
      id: "rencanakan",
      internalName: "Tabungan Qurban",
      label: "Setoran bertahap",
      title: "Rencanakan Qurbanmu",
      description:
        "Persiapkan dana qurban secara bertahap melalui pilihan paket dan simulasi setoran yang terencana.",
      facts: [
        { label: "Pembayaran", value: "Bertahap, sesuai kemampuan" },
        {
          label: "Setoran mulai",
          value: formatRupiah(SAVINGS_PROGRAM.minDepositAmount),
        },
        {
          label: "Lunas paling lambat",
          value: PAYMENT_DEADLINE.relativeLabel,
        },
      ],
      cta: {
        label: "Simulasi Tabungan",
        href: sectionHref(SECTION_IDS.simulation),
      },
    },
  ] satisfies ProgramChoice[],
} as const;
