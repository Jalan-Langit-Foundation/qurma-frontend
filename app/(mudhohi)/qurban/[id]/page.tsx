import { Suspense } from "react";
import type { Metadata } from "next";
import { MemberPageSkeleton } from "@/components/layout";
import { TrackingPage } from "@/features/fulfillment/server";

export const metadata: Metadata = {
  title: "Lacak Hewan Qurban",
  description: "Pantau tahap persiapan hewan qurban Anda.",
};

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<MemberPageSkeleton />}>
      <TrackingPage params={params} />
    </Suspense>
  );
}
