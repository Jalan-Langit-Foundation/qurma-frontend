import { MessageCircle } from "lucide-react";
import { WhatsappLink } from "@/components/layout";
import { buttonClassName } from "@/components/ui/button-styles";

export function AdminHelp({
  text,
  message,
  label,
}: {
  text: string;
  message: string;
  label: string;
}) {
  return (
    <div className="mt-5 flex flex-col gap-3 rounded-2xl bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-body">{text}</p>
      <WhatsappLink
        message={message}
        className={buttonClassName({
          variant: "soft",
          size: "pill",
          className: "shrink-0",
        })}
      >
        <MessageCircle className="h-4 w-4" aria-hidden="true" />
        {label}
      </WhatsappLink>
    </div>
  );
}
