import { MessageCircle } from "lucide-react";
import { buttonClassName } from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";
import { WhatsappLink } from "./whatsapp-link";

export function HelpLink({ className }: { className?: string }) {
  return (
    <WhatsappLink
      aria-label="Bantuan via WhatsApp CS QURMA (tab baru)"
      className={buttonClassName({
        variant: "soft",
        size: "pill",
        className: cn("border-slate-200/80 px-3 sm:pr-5 sm:pl-4", className),
      })}
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Bantuan</span>
    </WhatsappLink>
  );
}
