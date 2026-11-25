import { ArrowUpRight } from "lucide-react";
import { WhatsappLink } from "@/components/layout";
import { buttonClassName } from "@/components/ui/button-styles";
import { WHATSAPP_MESSAGES, type MemberMessageDetails } from "@/config/contact";
import { formatRupiah } from "@/lib/format";
import type { UpgradeSuggestion } from "../lib/types";

export function UpgradeSuggestionCard({
  suggestion,
  member,
}: {
  suggestion: UpgradeSuggestion;
  member: MemberMessageDetails;
}) {
  const additional = formatRupiah(suggestion.additionalAmount);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-brand-line bg-brand-soft p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-heading text-base font-semibold text-brand-ink">
          Progres Anda sudah lebih dari separuh
        </p>
        <p className="mt-1 text-sm text-brand-ink-soft">
          Ingin naik dari {suggestion.from.name} ke {suggestion.to.name}?
          Tambahannya {additional}, sisa setoran dihitung ulang oleh CS QURMA.
        </p>
      </div>
      <WhatsappLink
        message={WHATSAPP_MESSAGES.upgradeRequest(member, {
          fromPackage: suggestion.from.name,
          toPackage: suggestion.to.name,
          additionalAmount: additional,
        })}
        className={buttonClassName({
          variant: "primary",
          size: "pill",
          className: "shrink-0",
        })}
      >
        Ajukan ke CS QURMA
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </WhatsappLink>
    </div>
  );
}
