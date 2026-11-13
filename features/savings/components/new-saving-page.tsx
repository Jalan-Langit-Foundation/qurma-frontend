import "server-only";
import * as React from "react";
import { MemberPage, PageHeader, PagePlaceholder } from "@/components/layout";
import { ROUTES } from "@/config/navigation";
import { getCurrentSaving } from "../api/savings.api";
import { isSavingInProgress } from "../lib/saving-status";
import { NewSavingForm } from "./new-saving-form";

/** Halaman /tabungan/baru. Pengguna dengan tabungan berjalan diarahkan ke dashboard. */
export async function NewSavingPage() {
  const current = await getCurrentSaving();

  if (current && isSavingInProgress(current.status)) {
    return (
      <PagePlaceholder
        eyebrow="Tabungan Qurban"
        title="Buat Tabungan Baru"
        heading="Tabungan Anda Masih Berjalan"
        description={`Anda sudah memiliki tabungan Paket ${current.packageName} yang sedang berjalan. Satu akun hanya dapat memiliki satu tabungan aktif.`}
        backLink={{ href: ROUTES.dashboard, label: "Kembali ke Dashboard" }}
        actions={[{ label: "Lihat Dashboard", href: ROUTES.dashboard }]}
      />
    );
  }

  return (
    <MemberPage>
      <PageHeader
        eyebrow="Tabungan Qurban"
        title="Buat Tabungan Baru"
        description="Pilih paket dan bulan mulai menabung. Tabungan akan berakhir tepat di batas pelunasan program."
        backLink={{ href: ROUTES.dashboard, label: "Kembali ke Dashboard" }}
      />
      <NewSavingForm />
    </MemberPage>
  );
}
