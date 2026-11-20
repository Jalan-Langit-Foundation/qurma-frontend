import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import { ROUTES } from "@/config/navigation";
import type { QurbanPackage } from "@/features/packages";
import { isSavingRegistrationOpen, type DepositPlan } from "@/features/savings";
import { formatRupiah } from "@/lib/format";

export interface SavingCta {
  href: string;
  external: boolean;
  label: string;
  shortLabel: string;
  note: string;
}

export function getSavingCta(
  pkg: QurbanPackage,
  plan: DepositPlan | null,
): SavingCta {
  if (isSavingRegistrationOpen) {
    const next = `${ROUTES.newSaving}?paket=${pkg.id}`;
    return {
      href: `${ROUTES.register}?next=${encodeURIComponent(next)}`,
      external: false,
      label: "Mulai Tabungan",
      shortLabel: "Mulai Tabungan",
      note: "Buat akun gratis, lalu lanjutkan pendaftaran tabungan.",
    };
  }

  const message = WHATSAPP_MESSAGES.savingPlan({
    packageName: pkg.name,
    target: formatRupiah(pkg.target),
    depositCount: plan?.depositCount,
    depositAmount: plan ? formatRupiah(plan.depositAmount) : undefined,
    lastAmount: plan ? formatRupiah(plan.lastAmount) : undefined,
  });

  return {
    href: buildWhatsappUrl(message),
    external: true,
    label: "Konsultasi via WhatsApp",
    shortLabel: "Konsultasi",
    note: "Pendaftaran dan instruksi setoran dibantu langsung oleh CS QURMA.",
  };
}
