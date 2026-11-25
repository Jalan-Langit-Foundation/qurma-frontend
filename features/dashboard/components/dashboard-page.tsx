import "server-only";
import * as React from "react";
import { MessageCircle } from "lucide-react";
import { MemberContainer, WhatsappLink } from "@/components/layout";
import { buttonClassName } from "@/components/ui/button-styles";
import { WHATSAPP_MESSAGES } from "@/config/contact";
import { MEMBER_SECTION_IDS } from "@/config/navigation";
import { PackageCompareList } from "@/features/packages";
import { DepositRecords, DepositTable } from "@/features/savings";
import { getSavingLedger } from "@/features/savings/server";
import { buildDashboardView, getFirstName } from "../lib/dashboard-view";
import { loadDashboard } from "../lib/load-dashboard";
import { DashboardGreeting } from "./dashboard-greeting";
import { DepositPlanCard } from "./deposit-plan-card";
import { EmptySavingState } from "./empty-saving-state";
import { JourneyCard } from "./journey-card";
import { LastDepositCard } from "./last-deposit-card";
import { MyPackageCard } from "./my-package-card";
import { ProgressGaugeCard } from "./progress-gauge-card";

function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-6 space-y-4 pt-10"
    >
      <div className="space-y-1">
        <h2
          id={`${id}-title`}
          className="font-heading text-xl font-semibold text-ink"
        >
          {title}
        </h2>
        {description && <p className="text-sm text-body">{description}</p>}
      </div>
      {children}
    </section>
  );
}

/** Halaman /dashboard (dirender di server, di dalam <Suspense>). */
export async function DashboardPage() {
  const { user, saving } = await loadDashboard();

  if (!saving) {
    return (
      <MemberContainer>
        <DashboardGreeting
          firstName={getFirstName(user.name)}
          subtitle="Selamat datang di area penabung QURMA."
        />
        <div className="mt-8">
          <EmptySavingState />
        </div>
      </MemberContainer>
    );
  }

  const ledger = await getSavingLedger(saving.id);
  const view = buildDashboardView(saving, ledger, user);
  const member = {
    name: user.name,
    email: user.email,
    saving: { id: saving.id, packageName: saving.packageName },
  };

  return (
    <MemberContainer>
      <DashboardGreeting
        firstName={view.firstName}
        subtitle={view.subtitle}
        cta={view.cta}
        chips={view.chips}
      />

      {/* Urutan kartu: ponsel → progres dulu; desktop → paket di kolom kiri. */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <MyPackageCard
          data={view.package}
          className="order-5 md:col-span-2 lg:order-1 lg:col-span-1 lg:row-span-2"
        />
        <DepositPlanCard data={view.plan} className="order-2 lg:order-2" />
        <ProgressGaugeCard data={view.gauge} className="order-1 lg:order-3" />
        <LastDepositCard
          data={view.lastDeposit}
          className="order-4 md:order-3 lg:order-4"
        />
        <JourneyCard
          data={view.journey}
          savingId={saving.id}
          className="order-3 md:order-4 lg:order-5"
        />
      </div>

      {ledger && (
        <Section
          id={MEMBER_SECTION_IDS.schedule}
          title="Jadwal & Riwayat Setoran"
          description="Setoran dicatat CS QURMA setelah bukti diterima."
        >
          <DepositTable installments={ledger.installments} />
          <h3 className="pt-2 font-heading text-base font-semibold text-ink">
            Setoran yang sudah tercatat
          </h3>
          <DepositRecords deposits={ledger.deposits} />
        </Section>
      )}

      <Section
        id={MEMBER_SECTION_IDS.packages}
        title="Bandingkan Paket"
        description="Ingin pindah paket? CS QURMA akan membantu menghitung ulang setoran Anda."
      >
        <PackageCompareList currentPackageId={saving.packageId} />
        <WhatsappLink
          message={WHATSAPP_MESSAGES.memberQuestion(member)}
          className={buttonClassName({ variant: "soft", size: "pill" })}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Tanya CS QURMA soal ganti paket
        </WhatsappLink>
      </Section>
    </MemberContainer>
  );
}
