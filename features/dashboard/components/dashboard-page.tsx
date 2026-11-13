import "server-only";
import * as React from "react";
import { FileText, PackageSearch } from "lucide-react";
import { MemberPage, PageHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { ROUTES } from "@/config/navigation";
import { LogoutButton } from "@/features/auth";
import { getCurrentUser } from "@/features/auth/server";
import {
  DepositRecords,
  DepositTable,
  JourneyChecklist,
  SavingSummaryCard,
  type Saving,
} from "@/features/savings";
import { getCurrentSaving, getSavingLedger } from "@/features/savings/server";
import { EmptySavingState } from "./empty-saving-state";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-label={title} className="space-y-3">
      <h2 className="font-heading text-lg font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}

function JourneyCard({ saving }: { saving: Saving }) {
  const reportPublished = saving.journey.at(-1)?.completed ?? false;

  return (
    <Card className="h-fit space-y-6 p-5 shadow-card hover:shadow-card sm:p-6">
      <CardTitle as="h2" size="lg">
        Perjalanan Qurban
      </CardTitle>
      <JourneyChecklist steps={saving.journey} />
      <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-5">
        <Button
          href={ROUTES.qurban(saving.id)}
          variant="outline"
          size="sm"
          leftIcon={
            <PackageSearch className="h-3.5 w-3.5" aria-hidden="true" />
          }
        >
          Lacak Persiapan Qurban
        </Button>
        {reportPublished && (
          <Button
            href={ROUTES.report(saving.id)}
            variant="primary"
            size="sm"
            leftIcon={<FileText className="h-3.5 w-3.5" aria-hidden="true" />}
          >
            Lihat Shohibul Report
          </Button>
        )}
      </div>
    </Card>
  );
}

/** Halaman /dashboard (dirender di server, di dalam <Suspense>). */
export async function DashboardPage() {
  const [user, saving] = await Promise.all([
    getCurrentUser(),
    getCurrentSaving(),
  ]);
  const ledger = saving ? await getSavingLedger(saving.id) : null;
  const firstName = user.name.trim().split(/\s+/)[0];

  return (
    <MemberPage className="gap-8">
      <PageHeader
        eyebrow="Area Mudhohi"
        title={`Assalamualaikum, ${firstName}`}
        description="Pantau progres tabungan dan persiapan qurban Anda."
        actions={<LogoutButton />}
      />

      {!saving ? (
        <EmptySavingState />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <SavingSummaryCard saving={saving} />
            </div>
            <JourneyCard saving={saving} />
          </div>

          {ledger && (
            <>
              <Section title="Jadwal Setoran">
                <DepositTable installments={ledger.installments} />
              </Section>
              <Section title="Riwayat Setoran">
                <DepositRecords deposits={ledger.deposits} />
              </Section>
            </>
          )}
        </>
      )}
    </MemberPage>
  );
}
