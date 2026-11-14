import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import { ROUTES } from "@/config/navigation";
import { isSavingRegistrationOpen, type Saving } from "@/features/savings";

export interface DashboardMember {
  name: string;
  email: string;
}

export interface DashboardCta {
  label: string;
  href: string;
  external: boolean;
  icon: "deposit" | "track" | "chat";
}

export function buildSavingCta(
  saving: Pick<Saving, "id" | "packageName" | "status">,
  member: DashboardMember,
): DashboardCta {
  const details = {
    ...member,
    saving: { id: saving.id, packageName: saving.packageName },
  };

  switch (saving.status) {
    case "active":
    case "overdue":
      return {
        label: "Konfirmasi Setoran",
        href: buildWhatsappUrl(WHATSAPP_MESSAGES.depositConfirmation(details)),
        external: true,
        icon: "deposit",
      };
    case "completed":
      return {
        label: "Lacak Persiapan",
        href: ROUTES.qurban(saving.id),
        external: false,
        icon: "track",
      };
    case "cancelled":
      return {
        label: "Chat Admin",
        href: buildWhatsappUrl(WHATSAPP_MESSAGES.memberQuestion(details)),
        external: true,
        icon: "chat",
      };
  }
}

export function buildEmptyStateCta(
  registrationOpen: boolean = isSavingRegistrationOpen,
): DashboardCta {
  return registrationOpen
    ? {
        label: "Mulai Tabungan",
        href: ROUTES.newSaving,
        external: false,
        icon: "deposit",
      }
    : {
        label: "Daftar via WhatsApp",
        href: buildWhatsappUrl(WHATSAPP_MESSAGES.general),
        external: true,
        icon: "chat",
      };
}
