"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { CardTitle, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { Select } from "@/components/ui/select";
import { ROUTES } from "@/config/navigation";
import {
  ALL_PACKAGES,
  formatWeightRange,
  PackagePicker,
  resolvePackage,
  type QurbanPackage,
} from "@/features/packages";
import { formatRupiah } from "@/lib/format";
import { createSavingAction, type CreateSavingActionError } from "../actions";
import { useSavingSimulation } from "../hooks/use-saving-simulation";
import { SAVINGS_PROGRAM } from "../lib/program";
import { formatYearMonth } from "../lib/year-month";

const PACKAGE_LABEL_ID = "new-saving-package-label";
const START_MONTH_ID = "new-saving-start-month";
const NETWORK_ERROR =
  "Terjadi kendala jaringan. Silakan coba beberapa saat lagi.";

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
  const [selectedPackage, setSelectedPackage] = React.useState(initialPackage);
  const [requestedStartMonth, setRequestedStartMonth] =
    React.useState(initialStartMonth);
  const [error, setError] = React.useState<CreateSavingActionError | null>(
    null,
  );
  const [isPending, startTransition] = React.useTransition();

  const simulation = useSavingSimulation({
    target: selectedPackage.target,
    requestedStartMonth,
  });

  const deadline = formatYearMonth(SAVINGS_PROGRAM.finalPaymentMonth);
  const hasOptions =
    simulation.status === "ready" || simulation.status === "error";
  const startMonth = hasOptions ? simulation.startMonth : undefined;
  const activeOption = hasOptions
    ? simulation.startMonthOptions.find((option) => option.value === startMonth)
    : undefined;

  const monthOptions = hasOptions
    ? simulation.startMonthOptions.map((option) => ({
        value: option.value,
        label: `${option.label} (${option.tenorMonths} bulan s/d ${deadline})`,
      }))
    : [];

  const submit = () => {
    if (!startMonth) return;
    setError(null);
    startTransition(async () => {
      try {
        const result = await createSavingAction({
          packageId: selectedPackage.id,
          startMonth,
        });
        if (result) setError(result);
      } catch {
        setError({ ok: false, message: NETWORK_ERROR });
      }
    });
  };

  if (simulation.status === "closed") {
    return (
      <FormAlert
        variant="info"
        title="Periode pendaftaran telah berakhir"
        message={`Batas pelunasan program (${deadline}) sudah terlewati. Hubungi admin QURMA untuk informasi program berikutnya.`}
      />
    );
  }

  return (
    <Card className="space-y-6 p-5 shadow-card hover:shadow-card sm:p-8">
      {error && (
        <FormAlert
          variant={error.hasActiveSaving ? "info" : "error"}
          message={error.message}
          onDismiss={() => setError(null)}
        >
          {error.hasActiveSaving && (
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

      <div className="space-y-2.5">
        <CardTitle as="p" size="base" id={PACKAGE_LABEL_ID}>
          Paket Qurban
        </CardTitle>
        <PackagePicker
          packages={ALL_PACKAGES}
          selectedPackageId={selectedPackage.id}
          onSelect={setSelectedPackage}
          labelledBy={PACKAGE_LABEL_ID}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2.5">
        <CardTitle
          as="label"
          htmlFor={START_MONTH_ID}
          size="base"
          className="block cursor-pointer"
        >
          Mulai Menabung
        </CardTitle>
        <Select
          id={START_MONTH_ID}
          value={startMonth}
          onChange={setRequestedStartMonth}
          options={monthOptions}
          placeholder="Memuat pilihan bulan…"
          disabled={!hasOptions || isPending}
        />
      </div>

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
        dashboard setelah tabungan dibuat. Setoran dilakukan langsung ke admin
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
  return (
    <NewSavingFormView
      initialPackage={resolvePackage(searchParams.get("paket"))}
      initialStartMonth={searchParams.get("mulai")}
    />
  );
}

export function NewSavingForm() {
  return (
    <React.Suspense
      fallback={
        <NewSavingFormView
          initialPackage={resolvePackage(null)}
          initialStartMonth={null}
        />
      }
    >
      <NewSavingFormWithParams />
    </React.Suspense>
  );
}
