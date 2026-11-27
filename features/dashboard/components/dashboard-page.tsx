import "server-only";
import * as React from "react";
import { MemberContainer } from "@/components/layout";
import { getProgram, getSavingRegistration } from "@/features/program/server";
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

export async function DashboardPage() {
  const [{ user, saving }, { packages }] = await Promise.all([
    loadDashboard(),
    getProgram(),
  ]);

  if (!saving) {
    const registration = await getSavingRegistration();
    return (
      <MemberContainer>
        <DashboardGreeting
          firstName={getFirstName(user.name)}
          subtitle="Selamat datang di area penabung QURMA."
        />
        <div className="mt-8">
          <EmptySavingState packages={packages} registration={registration} />
        </div>
      </MemberContainer>
    );
  }

  const ledger = await getSavingLedger(saving.id);
  const view = buildDashboardView(saving, ledger, user, packages);

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
    </MemberContainer>
  );
}
