"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/config/navigation";
import { DEMO_NAV_ITEMS } from "../lib/navigation";
import { Code } from "./demo-section";
import { AccordionSection } from "./sections/accordion-section";
import { BaseUiSection } from "./sections/base-ui-section";
import { DepositTableSection } from "./sections/deposit-table-section";
import { JourneySection } from "./sections/journey-section";
import { PackageCardSection } from "./sections/package-card-section";
import { ProgressBarSection } from "./sections/progress-bar-section";
import { SectionStateSection } from "./sections/section-state-section";
import { StatusSection } from "./sections/status-section";
import { StickyCtaSection } from "./sections/sticky-cta-section";
import { TokensSection } from "./sections/tokens-section";
import { TypographySection } from "./sections/typography-section";
import { UpgradeBannerSection } from "./sections/upgrade-banner-section";

/**
 * Kerangka halaman design system (header, navigasi, log aksi).
 * Tiap section demo ada di ./sections dan menyimpan state-nya sendiri.
 */
export function DesignSystemPage() {
  const [lastAction, setLastAction] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-canvas pb-24 font-body text-body">
      <div className="border-b border-brand/20 bg-brand-soft px-4 py-2.5 text-center text-xs font-semibold text-brand-strong">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2">
          <Sparkles className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            Yayasan Jalan Langit — QURMA 2027 Design System & Component Library
          </span>
        </div>
      </div>

      <header className="border-b border-slate-200/80 bg-white py-8 sm:py-12">
        <Container size="2xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-2">
              <h1 className="font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Design System & Komponen QURMA
              </h1>
              <p className="text-sm leading-relaxed text-body sm:text-base">
                Playground visual komponen dari <Code>components/ui</Code> dan{" "}
                <Code>features/*</Code>, memakai token di{" "}
                <Code>globals.css</Code>.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" size="sm" href={ROUTES.home}>
                Kembali ke Beranda
              </Button>
            </div>
          </div>

          <nav
            aria-label="Navigasi komponen"
            className="mt-8 flex scrollbar-none items-center gap-2 overflow-x-auto pb-2"
          >
            {DEMO_NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-transparent bg-slate-100 px-3 py-1.5 text-xs font-semibold text-body transition-colors hover:border-brand/20 hover:bg-brand-soft hover:text-brand-strong"
              >
                <item.icon
                  className="h-3.5 w-3.5 shrink-0"
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </Container>
      </header>

      <div className="space-y-16 py-12">
        <Container size="2xl">
          {lastAction && (
            <p
              role="status"
              className="mb-6 rounded-xl border border-brand/20 bg-brand-soft px-4 py-2 text-sm text-brand-strong"
            >
              Aksi terakhir: {lastAction}
            </p>
          )}

          <TokensSection onAction={setLastAction} />
          <TypographySection />
          <BaseUiSection />
          <PackageCardSection onAction={setLastAction} />
          <ProgressBarSection />
          <JourneySection />
          <DepositTableSection onAction={setLastAction} />
          <StatusSection />
          <UpgradeBannerSection onAction={setLastAction} />
          <AccordionSection />
          <StickyCtaSection />
          <SectionStateSection />
        </Container>
      </div>
    </div>
  );
}
