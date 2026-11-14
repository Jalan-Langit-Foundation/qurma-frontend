import { Suspense } from "react";
import type { Metadata } from "next";
import { DashboardPage, DashboardSkeleton } from "@/features/dashboard/server";

export const metadata: Metadata = {
  title: "Dashboard Tabungan Qurban",
  description:
    "Pantau progres tabungan qurban, jadwal setoran, dan persiapan hewan qurban Anda.",
};

export default function Page() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardPage />
    </Suspense>
  );
}
