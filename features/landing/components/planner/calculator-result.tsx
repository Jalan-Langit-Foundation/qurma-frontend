"use client";

import * as React from "react";
import { ArrowRight, Info, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/config/navigation";
import type { QurbanPackage } from "@/features/packages";
import type { DepositPlan } from "@/features/savings";
import { formatRupiah, formatRupiahSingkat } from "@/lib/format";
import { cn } from "@/lib/utils";
import { PLANNER_CONTENT } from "../../lib/content/planner";
import type { SavingCta } from "../../lib/saving-cta";
import { Eyebrow } from "../section-intro";

interface CalculatorResultProps {
  selectedPackage: QurbanPackage;
  plan: DepositPlan | null;
  cta: SavingCta;
}

function scheduleSummary(plan: DepositPlan) {
  return plan.depositAmount === plan.lastAmount
    ? `${plan.depositCount} × ${formatRupiah(plan.depositAmount)}`
    : `${plan.depositCount - 1} × ${formatRupiah(plan.depositAmount)} + ${formatRupiah(plan.lastAmount)}`;
}

function DepositBars({ plan }: { plan: DepositPlan }) {
  return (
    <ol aria-label="Rincian setoran" className="flex gap-1.5 sm:gap-2">
      {plan.deposits.map((amount, index) => {
        const isLast = index === plan.deposits.length - 1;
        return (
          <li key={index} className="min-w-0 flex-1">
            <span
              aria-hidden="true"
              className={cn(
                "block h-1.5 rounded-full",
                isLast ? "bg-brand-sky" : "bg-white",
              )}
            />
            <span className="mt-2 block font-body text-[10px] text-white/70 sm:text-xs">
              <span className="sr-only">Setoran </span>
              {index + 1}
            </span>
            <span className="block truncate font-heading text-[11px] font-semibold text-white sm:text-sm">
              <span className="sr-only">{formatRupiah(amount)}</span>
              <span aria-hidden="true">
                {formatRupiahSingkat(amount, { compact: true })}
              </span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function CalculatorResult({
  selectedPackage,
  plan,
  cta,
}: CalculatorResultProps) {
  const content = PLANNER_CONTENT.calculator;

  return (
    <div className="flex flex-col justify-between gap-10 rounded-[28px] bg-brand-ink p-6 text-white sm:p-8 lg:p-10">
      <div aria-live="polite">
        <Eyebrow className="text-white/70">{content.resultLabel}</Eyebrow>
        <p className="mt-3 font-heading text-[44px] leading-none font-extrabold tracking-tight tabular-nums sm:text-6xl">
          {plan ? formatRupiah(plan.depositAmount) : "–"}
        </p>
        {plan && (
          <p className="mt-3 font-body text-sm text-white/80 sm:text-base">
            {scheduleSummary(plan)}
          </p>
        )}

        {plan && (
          <div className="mt-8">
            <DepositBars plan={plan} />
          </div>
        )}

        <dl className="mt-8 divide-y divide-white/15 border-y border-white/15 font-body text-sm">
          <div className="flex items-baseline justify-between gap-4 py-3">
            <dt className="text-white/70">Paket {selectedPackage.name}</dt>
            <dd className="font-heading font-semibold">
              {formatRupiah(selectedPackage.target)}
            </dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 py-3">
            <dt className="text-white/70">Lunas paling lambat</dt>
            <dd className="text-right">
              <span className="block font-heading font-semibold">
                {content.deadline}
              </span>
              <span className="block font-body text-xs text-white/70">
                {content.deadlineDate}
              </span>
            </dd>
          </div>
        </dl>

        <p className="mt-5 flex gap-2.5 font-body text-xs leading-relaxed text-white/80 sm:text-sm">
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {content.disclaimer}
        </p>
      </div>

      <div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            variant="white"
            size="lg"
            href={cta.href}
            external={cta.external}
            srHint={cta.external ? "WhatsApp, tab baru" : undefined}
            leftIcon={
              cta.external ? (
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              ) : undefined
            }
            rightIcon={
              cta.external ? undefined : (
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              )
            }
            className="w-full sm:w-auto"
          >
            {cta.label}
          </Button>
          <a
            href={`#${SECTION_IDS.faq}`}
            className="rounded-full px-2 py-2 text-center font-heading text-sm font-semibold text-white/80 underline-offset-4 transition-colors focus-ring hover:text-white hover:underline"
          >
            Pelajari FAQ
          </a>
        </div>
        <p className="mt-3 font-body text-xs text-white/70">{cta.note}</p>
      </div>
    </div>
  );
}
