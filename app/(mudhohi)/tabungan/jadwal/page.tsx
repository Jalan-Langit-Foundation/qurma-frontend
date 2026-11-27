import { Suspense } from "react";
import type { Metadata } from "next";
import { MemberPageSkeleton } from "@/components/layout";
import { SchedulePage } from "@/features/dashboard/server";

export const metadata: Metadata = {
  title: "Jadwal Setoran",
  description: "Jadwal cicilan per bulan dan riwayat setoran tabungan qurban.",
};

export default function Page() {
  return (
    <Suspense fallback={<MemberPageSkeleton />}>
      <SchedulePage />
    </Suspense>
  );
}
