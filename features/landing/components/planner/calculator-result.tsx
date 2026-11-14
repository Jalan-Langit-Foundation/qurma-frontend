"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { FormAlert } from "@/components/ui/form-alert";
import { SECTION_IDS } from "@/config/navigation";
import type { QurbanPackage } from "@/features/packages";
import type { InstallmentPlan } from "@/features/savings";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { PLANNER_CONTENT } from "../../lib/content/planner";
import type { SavingCta } from "../../lib/saving-cta";

interface CalculatorResultProps {
  selectedPackage: QurbanPackage;
  plan: InstallmentPlan | null;
  errorMessage: string | null;
  deadline: string;
  cta: SavingCta;
}

function NumberSkeleton({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block animate-pulse rounded-md bg-slate-200",
        className,
      )}
      aria-hidden="true"
    />
  );
}

function SummaryRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-body">{label}</dt>
      <dd className="font-heading font-semibold text-ink">{children}</dd>
    </div>
  );
}

/** Kolom kanan kalkulator: hasil simulasi dan tombol aksi. */
export function CalculatorResult({
  selectedPackage,
  plan,
  errorMessage,
  deadline,
  cta,
}: CalculatorResultProps) {
  return (
    <div className="relative z-10 flex flex-col justify-between rounded-b-2xl bg-canvas p-5 sm:p-6 lg:col-span-5 lg:rounded-r-2xl lg:rounded-bl-none lg:p-8">
      <div className="space-y-4">
        {errorMessage ? (
          <FormAlert
            variant="warning"
            title="Simulasi belum bisa dihitung"
            message={errorMessage}
          />
        ) : (
          <div
            aria-live="polite"
            className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card sm:p-6"
          >
            <div>
              <CardTitle as="h3" size="base">
                Estimasi Setoran per Bulan
              </CardTitle>
              <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
                {plan ? (
                  <span className="font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
                    {formatRupiah(plan.monthlyAmount)}
                  </span>
                ) : (
                  <NumberSkeleton className="h-8 w-40" />
                )}
                <span className="font-body text-xs font-medium text-muted sm:text-sm">
                  / bulan
                </span>
              </div>
              <p className="mt-1 font-heading text-xs font-semibold text-brand-strong">
                {plan
                  ? `Periode ${plan.tenorMonths} bulan (s/d ${deadline})`
                  : `s/d ${deadline}`}
              </p>
            </div>

            <dl className="space-y-2 border-t border-slate-100 pt-3.5 font-body text-xs sm:text-sm">
              <SummaryRow label="Target Total:">
                <span className="font-bold">
                  {formatRupiah(selectedPackage.target)}
                </span>
              </SummaryRow>
              <SummaryRow label="Setoran Terakhir:">
                {plan ? (
                  formatRupiah(plan.lastAmount)
                ) : (
                  <NumberSkeleton className="h-4 w-20" />
                )}
              </SummaryRow>
            </dl>
          </div>
        )}

        <p className="text-center font-body text-xs leading-relaxed text-body italic sm:text-sm">
          &ldquo;{PLANNER_CONTENT.calculator.encouragement}&rdquo;
        </p>
      </div>

      <div className="space-y-2 pt-6">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            href={cta.href}
            external={cta.external}
            leftIcon={
              cta.external ? (
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
              ) : undefined
            }
            className="px-6 font-bold hover:shadow-md"
          >
            {cta.label}
          </Button>
          <Button
            variant="outline"
            size="md"
            href={`#${SECTION_IDS.faq}`}
            className="px-6 font-bold"
          >
            Pelajari FAQ
          </Button>
        </div>
        <p className="text-center font-body text-[11px] text-muted sm:text-xs">
          {cta.note}
        </p>
      </div>
    </div>
  );
}
