import "server-only";
import * as React from "react";
import { notFound } from "next/navigation";
import { MemberPage, PageHeader } from "@/components/layout";
import { ROUTES } from "@/config/navigation";
import { getCurrentSaving } from "@/features/savings/server";
import { parsePositiveId } from "@/lib/params";
import { getTracking } from "../api/fulfillment.api";
import { buildTrackingJourney } from "../lib/journey";
import { TrackingView } from "./tracking-view";

const BACK_TO_DASHBOARD = {
  href: ROUTES.dashboard,
  label: "Kembali ke Dashboard",
};

export async function TrackingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const savingId = parsePositiveId((await params).id);
  if (!savingId) notFound();

  const [tracking, saving] = await Promise.all([
    getTracking(savingId),
    getCurrentSaving(),
  ]);
  if (!tracking) notFound();

  return (
    <MemberPage>
      <PageHeader
        eyebrow="Perjalanan Qurban"
        title="Lacak Qurban"
        description="Enam tahap dari mulai menabung hingga laporan qurban terbit."
        backLink={BACK_TO_DASHBOARD}
      />
      <TrackingView
        tracking={tracking}
        steps={buildTrackingJourney(tracking, saving)}
      />
    </MemberPage>
  );
}
