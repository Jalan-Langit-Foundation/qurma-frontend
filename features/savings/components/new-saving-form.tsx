"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormAlert } from "@/components/ui/form-alert";
import { ROUTES } from "@/config/navigation";
import {
  formatWeightRange,
  resolvePackage,
  usePackages,
  type QurbanPackage,
} from "@/features/packages";
import { getPaymentDeadline, useProgramSchedule } from "@/features/program";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import { formatRupiah } from "@/lib/format";
import { createSavingAction } from "../actions";
import { useSavingSimulation } from "../hooks/use-saving-simulation";
import { toStartMonthSelectOptions } from "../lib/start-months";
import { formatYearMonth } from "../lib/year-month";
import { PlanInputs } from "./plan-inputs";

function SummaryRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-heading font-semibold text-ink">
        {children}
      </dd>
    </div>
  );
}

interface NewSavingFormViewProps {
  initialPackage: QurbanPackage;
  initialStartMonth: string | null;
}

function NewSavingFormView({
  initialPackage,
  initialStartMonth,
}: NewSavingFormViewProps) {
  const packages = usePackages();
  const [selectedPackage, setSelectedPackage] = React.useState(initialPackage);
  const [requestedStartMonth, setRequestedStartMonth] =
    React.useState(initialStartMonth);
  const { feedback, clearFeedback, run } = useActionFeedback();
  const [isPending, startTransition] = React.useTransition();

  const simulation = useSavingSimulation({
    target: selectedPackage.target,
    requestedStartMonth,
  });

  const schedule = useProgramSchedule();
  const paymentDeadline = getPaymentDeadline(schedule);
  const deadline = `${paymentDeadline.isEstimate ? "±" : ""}${paymentDeadline.dateLabel}`;
  const lastMonth = formatYearMonth(schedule.lastInstallmentMonth);
  const hasOptions =
    simulation.status === "ready" || simulation.status === "error";
  const startMonth = hasOptions ? simulation.startMonth : undefined;
  const activeOption = hasOptions
    ? simulation.startMonthOptions.find((option) => option.value === startMonth)
    : undefined;

  const monthOptions = hasOptions
    ? toStartMonthSelectOptions(simulation.startMonthOptions, lastMonth)
    : [];

  const submit = () => {
    if (!startMonth) return;
    startTransition(() =>
      run(
        () => createSavingAction({ packageId: selectedPackage.id, startMonth }),
        {
          toFeedback: ({ message, hasActiveSaving }) => ({
            variant: hasActiveSaving ? "info" : "error",
            message,
          }),
        },
      ),
    );
  };

  if (simulation.status === "closed") {
    return (
      <FormAlert
        variant="info"
        title="Periode pendaftaran telah berakhir"
        message={`Batas pelunasan program (${deadline}) sudah terlewati. Hubungi CS QURMA untuk informasi program berikutnya.`}
      />
    );
  }

  return (
    <Card className="space-y-6 p-5 shadow-card hover:shadow-card sm:p-8">
      {feedback && (
        <FormAlert
          variant={feedback.variant}
          message={feedback.message}
          onDismiss={clearFeedback}
        >
          {feedback.variant === "info" && (
            <Button
              href={ROUTES.dashboard}
              variant="outline"
              size="sm"
              className="mt-3"
            >
              Lihat Dashboard
            </Button>
          )}
        </FormAlert>
      )}

      <PlanInputs
        idPrefix="new-saving"
        packages={packages}
        selectedPackage={selectedPackage}
        startMonth={startMonth}
        monthOptions={monthOptions}
        onSelectPackage={setSelectedPackage}
        onSelectStartMonth={setRequestedStartMonth}
        disabled={isPending}
      />

      <dl className="space-y-2.5 rounded-xl border border-slate-100 bg-canvas p-4 font-body text-xs sm:text-sm">
        <SummaryRow label="Target dana">
          {formatRupiah(selectedPackage.target)}
        </SummaryRow>
        <SummaryRow label="Target bobot">
          {formatWeightRange(selectedPackage)}
        </SummaryRow>
        <SummaryRow label="Lama menabung">
          {activeOption ? `${activeOption.tenorMonths} bulan` : "—"}
        </SummaryRow>
        <SummaryRow label="Batas pelunasan">{deadline}</SummaryRow>
      </dl>

      <p className="font-body text-xs leading-relaxed text-muted sm:text-sm">
        Nominal setoran per bulan dihitung otomatis oleh sistem dan tampil di
        dashboard setelah tabungan dibuat. Setoran dilakukan langsung ke CS
        QURMA.
      </p>

      <Button
        type="button"
        variant="primary"
        size="md"
        className="w-full justify-center sm:w-auto"
        isLoading={isPending}
        disabled={!startMonth}
        onClick={submit}
      >
        Buat Tabungan
      </Button>
    </Card>
  );
}

function NewSavingFormWithParams() {
  const searchParams = useSearchParams();
  const packages = usePackages();
  return (
    <NewSavingFormView
      initialPackage={resolvePackage(packages, searchParams.get("paket"))}
      initialStartMonth={searchParams.get("mulai")}
    />
  );
}

export function NewSavingForm() {
  const packages = usePackages();
  return (
    <React.Suspense
      fallback={
        <NewSavingFormView
          initialPackage={resolvePackage(packages, null)}
          initialStartMonth={null}
        />
      }
    >
      <NewSavingFormWithParams />
    </React.Suspense>
  );
}
