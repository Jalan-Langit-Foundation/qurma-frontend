import { Suspense } from "react";
import type { Metadata } from "next";
import { MemberPageSkeleton } from "@/components/layout";
import { DashboardPage } from "@/features/dashboard/server";

export const metadata: Metadata = {
  title: "Dashboard Tabungan Qurban",
  description:
    "Pantau progres tabungan qurban, jadwal setoran, dan persiapan hewan qurban Anda.",
};

export default function Page() {
  return (
    <Suspense fallback={<MemberPageSkeleton />}>
      <DashboardPage />
    </Suspense>
  );
}
