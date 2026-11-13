import "server-only";
import * as React from "react";
import { FileClock } from "lucide-react";
import { notFound } from "next/navigation";
import { MemberPage, PageHeader, PagePlaceholder } from "@/components/layout";
import { ROUTES } from "@/config/navigation";
import { parsePositiveId } from "@/lib/params";
import { getShohibulReport } from "../api/fulfillment.api";
import { ReportView } from "./report-view";

const BACK_TO_DASHBOARD = {
  href: ROUTES.dashboard,
  label: "Kembali ke Dashboard",
};

/** Halaman /report/[id]: Shohibul Report setelah dipublikasikan admin. */
export async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const savingId = parsePositiveId((await params).id);
  if (!savingId) notFound();

  const report = await getShohibulReport(savingId);

  // Backend memakai 404 yang sama untuk "belum terbit" dan "bukan milik Anda"
  if (!report) {
    return (
      <PagePlaceholder
        eyebrow="Shohibul Report"
        title="Laporan Qurban"
        heading="Laporan Belum Tersedia"
        icon={<FileClock className="h-6 w-6" aria-hidden="true" />}
        description="Shohibul Report akan tampil di sini setelah qurban dilaksanakan dan laporan dipublikasikan oleh admin QURMA."
        backLink={BACK_TO_DASHBOARD}
        actions={[
          {
            label: "Kembali ke Dashboard",
            href: ROUTES.dashboard,
            variant: "outline",
          },
        ]}
      />
    );
  }

  return (
    <MemberPage>
      <PageHeader
        eyebrow="Shohibul Report"
        title={`Laporan Qurban ${report.programYear}`}
        description={`Dokumentasi pelaksanaan qurban atas nama ${report.shohibulName}.`}
        backLink={BACK_TO_DASHBOARD}
      />
      <ReportView report={report} />
    </MemberPage>
  );
}
