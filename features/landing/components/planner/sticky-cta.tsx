"use client";

import * as React from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { QurbanPackage } from "@/features/packages";
import type { DepositPlan } from "@/features/savings";
import { formatRupiah, formatRupiahSingkat } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { SavingCta } from "../../lib/saving-cta";

interface StickyCtaProps {
  selectedPackage: QurbanPackage;
  plan: DepositPlan | null;
  cta: SavingCta;
  className?: string;
}

export function StickyCta({
  selectedPackage,
  plan,
  cta,
  className,
}: StickyCtaProps) {
  return (
    <aside
      aria-label="Aksi cepat tabungan qurban"
      className={cn(
        "fixed right-0 bottom-0 left-0 z-40 md:hidden",
        "border-t border-slate-200/90 bg-white/95 shadow-dock backdrop-blur-md",
        "px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 flex-col">
          <div className="flex items-center gap-1.5">
            <span className="truncate font-heading text-xs font-bold text-ink">
              {selectedPackage.name}
            </span>
            <span className="text-[11px] font-bold text-brand-strong">
              {formatRupiah(selectedPackage.target)}
            </span>
          </div>
          <span className="truncate text-[11px] font-medium text-body">
            {plan
              ? `${plan.depositCount}× setoran · ${formatRupiahSingkat(plan.depositAmount, { approx: true })}`
              : "Hitung simulasi tabungan"}
          </span>
        </div>

        <div className="shrink-0">
          <Button
            variant="primary"
            size="sm"
            href={cta.href}
            external={cta.external}
            leftIcon={
              cta.external ? (
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              ) : undefined
            }
            rightIcon={
              cta.external ? undefined : (
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              )
            }
            className="px-4 shadow-xs"
          >
            {cta.shortLabel}
          </Button>
        </div>
      </div>
    </aside>
  );
}

export function StickyCtaSpacer({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none h-20 md:hidden", className)}
    />
  );
}
