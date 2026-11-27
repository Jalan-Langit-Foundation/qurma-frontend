import { ROUTES } from "@/config/navigation";
import { TERMS_META } from "@/features/legal";
import type { PaymentDeadline } from "@/features/program";
import { SAVINGS_PROGRAM } from "@/features/savings";
import { formatRupiah } from "@/lib/format";

/** Ringkasan S&K di beranda; batas pelunasan mengikuti jadwal dari CS QURMA. */
export function buildTermsSummaryContent(paymentDeadline: PaymentDeadline) {
  return {
    label: "Syarat & Ketentuan",
    headline: "Ketentuan penting, secara ringkas.",
    status: TERMS_META.isDraft ? "Draf, menunggu pengesahan" : null,
    points: [
      "Website ini sarana informasi dan simulasi. Pembayaran tidak dilakukan di website.",
      `Setoran tabungan fleksibel, minimal ${formatRupiah(SAVINGS_PROGRAM.minDepositAmount)} per setoran.`,
      `Pelunasan paling lambat ${paymentDeadline.label}.`,
      "Informasi saldo disampaikan CS QURMA melalui WhatsApp setelah pembayaran diverifikasi.",
      "Ketentuan pembatalan dan pengalihan saldo mengikuti S&K yang telah disahkan.",
    ],
    link: { label: "Baca Syarat & Ketentuan lengkap", href: ROUTES.terms },
  } as const;
}
