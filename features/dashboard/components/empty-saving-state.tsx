import * as React from "react";
import { MEMBER_SECTION_IDS } from "@/config/navigation";
import { PROGRAM } from "@/config/program";
import { PackageCompareList, type QurbanPackage } from "@/features/packages";
import type { SavingRegistration } from "@/features/savings/server";
import { formatTanggal } from "@/lib/format";
import { buildEmptyStateCta } from "../lib/dashboard-cta";
import { CtaButton } from "./dashboard-greeting";

function buildSteps(registrationOpen: boolean) {
  return [
    {
      title: "Pilih paket",
      text: "Tentukan bobot domba sesuai target tabungan Anda.",
    },
    {
      title: registrationOpen ? "Atur setoran" : "Daftar lewat CS QURMA",
      text: registrationOpen
        ? "Pilih bulan mulai; setoran bulanan dihitung otomatis."
        : "CS QURMA mendaftarkan tabungan dan jadwal setoran Anda.",
    },
    {
      title: "Pantau di sini",
      text: "Progres, jadwal, dan persiapan domba tampil di dashboard ini.",
    },
  ];
}

function buildIntro(registration: SavingRegistration): string {
  switch (registration.state) {
    case "open":
      return `Mulai menabung sekarang agar qurban ${PROGRAM.hijriLabel} terasa ringan.`;
    case "closed":
      return `Pendaftaran Tabungan Qurban sudah ditutup pada ${formatTanggal(registration.deadline)}. Hubungi CS QURMA bila ada pertanyaan.`;
    case "not_opened":
      return "Pendaftaran tabungan saat ini dibantu langsung oleh CS QURMA. Setelah didaftarkan, progres tabungan akan tampil di sini.";
  }
}

export function EmptySavingState({
  packages,
  registration,
}: {
  packages: readonly QurbanPackage[];
  registration: SavingRegistration;
}) {
  const registrationOpen = registration.state === "open";
  const steps = buildSteps(registrationOpen);

  return (
    <div className="space-y-4">
      <section
        aria-labelledby="empty-saving-title"
        className="grid gap-6 rounded-[28px] bg-brand p-6 text-white sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center"
      >
        <div className="space-y-4">
          <h2
            id="empty-saving-title"
            className="font-heading text-2xl font-semibold sm:text-3xl"
          >
            Anda belum memiliki tabungan qurban
          </h2>
          <p className="max-w-md text-sm text-white/85 sm:text-base">
            {buildIntro(registration)}
          </p>
          <CtaButton
            cta={buildEmptyStateCta(registrationOpen)}
            className="w-full bg-white text-brand-strong hover:bg-brand-soft sm:w-auto"
          />
        </div>

        <ol className="grid gap-3">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="flex gap-4 rounded-2xl bg-white/10 p-4"
            >
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white font-heading text-sm font-semibold text-brand-strong"
              >
                {index + 1}
              </span>
              <div>
                <p className="font-heading text-sm font-semibold">
                  {step.title}
                </p>
                <p className="text-xs text-white/80">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id={MEMBER_SECTION_IDS.packages}
        aria-labelledby="empty-packages-title"
        className="scroll-mt-6 space-y-3 pt-4"
      >
        <h2
          id="empty-packages-title"
          className="font-heading text-lg font-semibold text-ink"
        >
          Pilihan Paket {PROGRAM.name}
        </h2>
        <PackageCompareList packages={packages} />
      </section>
    </div>
  );
}
