import { Suspense } from "react";
import type { Metadata } from "next";
import { MemberPageSkeleton } from "@/components/layout";
import { ReportPage } from "@/features/fulfillment/server";

export const metadata: Metadata = {
  title: "Shohibul Report",
  description: "Laporan dan dokumentasi pelaksanaan qurban Anda.",
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<MemberPageSkeleton />}>
      <ReportPage params={params} />
    </Suspense>
  );
}
