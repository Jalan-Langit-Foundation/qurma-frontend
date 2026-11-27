import * as React from "react";
import {
  ExternalLink,
  type ExternalLinkProps,
} from "@/components/ui/external-link";
import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";

interface WhatsappLinkProps extends Omit<ExternalLinkProps, "href"> {
  message?: string;
}

export function WhatsappLink({
  message = WHATSAPP_MESSAGES.general,
  srHint = "WhatsApp, tab baru",
  ...props
}: WhatsappLinkProps) {
  return (
    <ExternalLink href={buildWhatsappUrl(message)} srHint={srHint} {...props} />
  );
}
