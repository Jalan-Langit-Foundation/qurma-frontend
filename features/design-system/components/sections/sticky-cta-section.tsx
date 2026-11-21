import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getDefaultPackage } from "@/features/packages";
import { calculateDepositPlan, SAVINGS_PROGRAM } from "@/features/savings";
import { formatRupiahSingkat } from "@/lib/format";
import { DemoSection } from "../demo-section";

export function StickyCtaSection() {
  const pkg = getDefaultPackage();
  const depositCount = SAVINGS_PROGRAM.defaultDepositCount;
  const depositAmount =
    calculateDepositPlan(pkg.target, depositCount)?.depositAmount ?? 0;

  return (
    <DemoSection
      id="sticky-cta"
      eyebrow="features/landing"
      title="StickyCta"
      description="Hanya tampil di layar HP (< md) dan aman dari area gesture iOS/Android."
    >
      <Card className="p-6">
        <div className="mx-auto max-w-sm space-y-6 rounded-3xl border-2 border-slate-300 bg-slate-50 p-4 shadow-sm">
          <p className="text-center font-mono text-xs text-slate-500">
            [Layar Mobile 390px]
          </p>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-body">
            Konten halaman landing, kalkulator, atau pilihan paket...
          </div>
          <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-md backdrop-blur-md">
            <div className="flex min-w-0 flex-col">
              <span className="truncate font-heading text-xs font-bold text-ink">
                Paket {pkg.name} ({formatRupiahSingkat(pkg.target)})
              </span>
              <span className="text-[11px] font-medium text-brand-strong">
                {depositCount}× setoran ·{" "}
                {formatRupiahSingkat(depositAmount, { approx: true })}
              </span>
            </div>
            <Button variant="primary" size="sm" className="px-3 text-xs">
              Daftar via WA
            </Button>
          </div>
        </div>
      </Card>
    </DemoSection>
  );
}
