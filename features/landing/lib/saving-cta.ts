import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import { ROUTES } from "@/config/navigation";
import type { QurbanPackage } from "@/features/packages";
import {
  formatYearMonth,
  isSavingRegistrationOpen,
  type InstallmentPlan,
  type YearMonth,
} from "@/features/savings";
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
  startMonth: YearMonth | null,
  plan: InstallmentPlan | null,
): SavingCta {
  if (isSavingRegistrationOpen && startMonth) {
    const next = `${ROUTES.newSaving}?paket=${pkg.id}&mulai=${startMonth}`;
    return {
      href: `${ROUTES.register}?next=${encodeURIComponent(next)}`,
      external: false,
      label: "Mulai Tabungan",
      shortLabel: "Mulai Tabungan",
      note: "Buat akun gratis, lalu pantau progres tabungan di dashboard.",
    };
  }

  const message = WHATSAPP_MESSAGES.savingPlan({
    packageName: pkg.name,
    target: formatRupiah(pkg.target),
    startMonth: startMonth ? formatYearMonth(startMonth) : undefined,
    monthlyAmount: plan ? formatRupiah(plan.monthlyAmount) : undefined,
    tenorMonths: plan?.tenorMonths,
  });

  return {
    href: buildWhatsappUrl(message),
    external: true,
    label: "Daftar via WhatsApp",
    shortLabel: "Daftar via WA",
    note: "Pendaftaran dibantu langsung oleh admin QURMA melalui WhatsApp.",
  };
}
