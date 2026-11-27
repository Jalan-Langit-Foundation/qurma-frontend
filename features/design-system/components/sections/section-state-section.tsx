"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  SectionState,
  type SectionStateType,
} from "@/components/ui/section-state";
import { DemoSection, PillGroup } from "../demo-section";

const STATE_OPTIONS = (["loading", "empty", "error", "success"] as const).map(
  (state) => ({ value: state, label: state }),
);

export function SectionStateSection() {
  const [state, setState] = React.useState<SectionStateType>("success");

  return (
    <DemoSection
      id="section-state"
      eyebrow="components/ui"
      title="SectionState"
      description="4 kondisi untuk section yang memuat data: loading, kosong, error + retry, sukses."
      controls={
        <PillGroup
          label="Kondisi"
          options={STATE_OPTIONS}
          value={state}
          onChange={setState}
          className="rounded-full bg-slate-100 p-1"
          pillClassName="capitalize"
        />
      }
    >
      <Card className="p-6">
        <SectionState
          status={state}
          onRetry={() => setState("success")}
          emptyTitle="Belum Ada Data Penabung"
          emptyDescription="Data penabung akan muncul setelah pendaftaran pertama dicatat CS QURMA."
          errorMessage="Koneksi server gagal merespons. Silakan periksa jaringan dan coba lagi."
        >
          <div className="space-y-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
            </div>
            <p className="font-heading text-base font-bold text-emerald-900">
              Konten berhasil dimuat
            </p>
            <p className="text-xs text-emerald-800">
              Slot children tampil saat status &quot;success&quot;.
            </p>
          </div>
        </SectionState>
      </Card>
    </DemoSection>
  );
}
