import type { MemberMessageDetails } from "@/config/contact";
import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import type { UpgradeSuggestion } from "@/features/dashboard/lib/types";
import type { PackageId } from "@/features/packages";
import { formatRupiah } from "@/lib/format";

/** Isi banner "naik paket" di sidebar (data biasa untuk komponen client). */
export interface UpgradePromo {
  toPackageId: PackageId | null;
  fromName: string;
  fromPrice: number;
  toName: string;
  toPrice: number;
  additionalAmount: number;
  /** Upgrade dikerjakan CS QURMA di panel admin → tombol membuka WhatsApp */
  whatsappHref: string;
}

export function toUpgradePromo(
  suggestion: UpgradeSuggestion,
  member: MemberMessageDetails,
): UpgradePromo {
  return {
    toPackageId: suggestion.to.packageId,
    fromName: suggestion.from.name,
    fromPrice: suggestion.from.price,
    toName: suggestion.to.name,
    toPrice: suggestion.to.price,
    additionalAmount: suggestion.additionalAmount,
    whatsappHref: buildWhatsappUrl(
      WHATSAPP_MESSAGES.upgradeRequest(member, {
        fromPackage: suggestion.from.name,
        toPackage: suggestion.to.name,
        additionalAmount: formatRupiah(suggestion.additionalAmount),
      }),
    ),
  };
}
