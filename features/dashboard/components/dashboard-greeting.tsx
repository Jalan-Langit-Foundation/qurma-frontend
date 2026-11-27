import * as React from "react";
import {
  CalendarDays,
  MessageCircle,
  MoonStar,
  PackageSearch,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { buttonClassName } from "@/components/ui/button-styles";
import { ExternalLink } from "@/components/ui/external-link";
import { cn } from "@/lib/utils";
import type { DashboardCta } from "../lib/dashboard-cta";
import type { DashboardChip } from "../lib/dashboard-view";

const CHIP_TONES = {
  info: "bg-emerald-50 text-emerald-700",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-800",
  neutral: "bg-slate-100 text-slate-600",
} as const;

const CTA_ICONS = {
  deposit: Plus,
  track: PackageSearch,
  chat: MessageCircle,
} as const;

function Chip({ chip }: { chip: DashboardChip }) {
  if (chip.icon === "status") {
    return (
      <li
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold",
          CHIP_TONES[chip.tone ?? "neutral"],
        )}
      >
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-current" />
        <span className="sr-only">Status: </span>
        {chip.label}
      </li>
    );
  }

  const Icon = chip.icon === "moon" ? MoonStar : CalendarDays;
  return (
    <li className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-medium text-night">
      <Icon className="h-4 w-4 text-brand-strong" aria-hidden="true" />
      {chip.label}
    </li>
  );
}

export function CtaButton({
  cta,
  className,
}: {
  cta: DashboardCta;
  className?: string;
}) {
  const Icon = CTA_ICONS[cta.icon];
  const classes = buttonClassName({
    size: "pill-lg",
    className: cn("text-sm focus-visible:ring-offset-surface", className),
  });
  const content = (
    <>
      <Icon className="h-4 w-4" aria-hidden="true" />
      {cta.label}
    </>
  );

  return cta.external ? (
    <ExternalLink
      href={cta.href}
      srHint="WhatsApp, tab baru"
      className={classes}
    >
      {content}
    </ExternalLink>
  ) : (
    <Link href={cta.href} className={classes}>
      {content}
    </Link>
  );
}

interface DashboardGreetingProps {
  firstName: string;
  subtitle: string;
  cta?: DashboardCta;
  chips?: DashboardChip[];
}

export function DashboardGreeting({
  firstName,
  subtitle,
  cta,
  chips = [],
}: DashboardGreetingProps) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="font-heading text-[30px] leading-tight font-medium text-ink md:text-4xl lg:text-[44px]">
            Assalamualaikum, {firstName}!
          </h1>
          <p className="max-w-xl text-sm text-body md:text-base">{subtitle}</p>
        </div>
        {cta && <CtaButton cta={cta} className="w-full md:w-auto" />}
      </div>
      {chips.length > 0 && (
        <ul aria-label="Info tabungan" className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <Chip key={chip.label} chip={chip} />
          ))}
        </ul>
      )}
    </div>
  );
}
