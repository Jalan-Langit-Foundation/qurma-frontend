import "server-only";
import * as React from "react";
import { notFound } from "next/navigation";
import { MemberPage, PageHeader } from "@/components/layout";
import { ROUTES } from "@/config/navigation";
import { parsePositiveId } from "@/lib/params";
import { getTracking } from "../api/fulfillment.api";
import { TrackingView } from "./tracking-view";

const BACK_TO_DASHBOARD = {
  href: ROUTES.dashboard,
  label: "Kembali ke Dashboard",
};

/** Halaman /qurban/[id]: tracking persiapan hewan qurban. */
export async function TrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const savingId = parsePositiveId((await params).id);
  if (!savingId) notFound();

  const tracking = await getTracking(savingId);
  if (!tracking) notFound();

  return (
    <MemberPage>
      <PageHeader
        eyebrow="Persiapan Qurban"
        title="Lacak Hewan Qurban"
        description="Pantau tahap penyiapan domba qurban Anda hingga pelaksanaan."
        backLink={BACK_TO_DASHBOARD}
      />
      <TrackingView tracking={tracking} />
    </MemberPage>
  );
}
