import { ROUTES } from "@/config/navigation";
import { TERMS } from "@/features/legal";
import { PAYMENT_DEADLINE, SAVINGS_PROGRAM } from "@/features/savings";
import { formatRupiah } from "@/lib/format";

export const TERMS_SUMMARY_CONTENT = {
  label: "Syarat & Ketentuan",
  headline: "Ketentuan penting, secara ringkas.",
  status: TERMS.isDraft ? "Draf, menunggu pengesahan" : null,
  points: [
    "Website ini sarana informasi dan simulasi. Pembayaran tidak dilakukan di website.",
    `Setoran tabungan fleksibel, minimal ${formatRupiah(SAVINGS_PROGRAM.minDepositAmount)} per setoran.`,
    `Pelunasan paling lambat ${PAYMENT_DEADLINE.label}.`,
    "Informasi saldo disampaikan CS QURMA melalui WhatsApp setelah pembayaran diverifikasi.",
    "Ketentuan pembatalan dan pengalihan saldo mengikuti S&K yang telah disahkan.",
  ],
  link: { label: "Baca Syarat & Ketentuan lengkap", href: ROUTES.terms },
} as const;
