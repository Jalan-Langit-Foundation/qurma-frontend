import "server-only";
import * as React from "react";
import { MemberContainer, PageHeader } from "@/components/layout";
import { getProgram } from "@/features/program/server";
import { DepositRecords, DepositTable } from "@/features/savings";
import { getSavingLedger } from "@/features/savings/server";
import { buildDashboardView } from "../lib/dashboard-view";
import { loadDashboard } from "../lib/load-dashboard";
import { CtaButton } from "./dashboard-greeting";
import { DepositPlanCard } from "./deposit-plan-card";
import { LastDepositCard } from "./last-deposit-card";
import { NoSavingNotice } from "./no-saving-notice";

const HEADER = {
  eyebrow: "Tabungan",
  title: "Jadwal Setoran",
  description: "Setoran dicatat CS QURMA setelah bukti pembayaran diterima.",
} as const;

/** Halaman /tabungan/jadwal: rencana, jadwal per bulan, dan riwayat setoran. */
export async function SchedulePage() {
  const [{ user, saving }, { packages }] = await Promise.all([
    loadDashboard(),
    getProgram(),
  ]);

  if (!saving) {
    return (
      <MemberContainer>
        <div className="flex flex-col gap-6">
          <PageHeader {...HEADER} />
          <NoSavingNotice text="Jadwal setoran tampil di sini setelah tabungan Anda didaftarkan." />
        </div>
      </MemberContainer>
    );
  }

  const ledger = await getSavingLedger(saving.id);
  const view = buildDashboardView(saving, ledger, user, packages);

  return (
    <MemberContainer>
      <div className="flex flex-col gap-6">
        <PageHeader {...HEADER} actions={<CtaButton cta={view.cta} />} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <DepositPlanCard data={view.plan} showScheduleLink={false} />
          <LastDepositCard data={view.lastDeposit} />
        </div>

        {ledger ? (
          <>
            <section aria-labelledby="jadwal-bulanan" className="space-y-4">
              <h2
                id="jadwal-bulanan"
                className="font-heading text-xl font-semibold text-ink"
              >
                Jadwal per bulan
              </h2>
              <DepositTable installments={ledger.installments} />
            </section>
            <section aria-labelledby="riwayat-setoran" className="space-y-4">
              <h2
                id="riwayat-setoran"
                className="font-heading text-xl font-semibold text-ink"
              >
                Setoran yang sudah tercatat
              </h2>
              <DepositRecords deposits={ledger.deposits} />
            </section>
          </>
        ) : (
          <p
            role="status"
            className="rounded-2xl bg-white p-5 text-sm text-body"
          >
            Jadwal setoran belum bisa dimuat. Coba muat ulang halaman beberapa
            saat lagi.
          </p>
        )}
      </div>
    </MemberContainer>
  );
}
