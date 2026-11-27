import { Suspense } from "react";
import type { Metadata } from "next";
import { MemberPageSkeleton } from "@/components/layout";
import { PackagesPage } from "@/features/dashboard/server";

export const metadata: Metadata = {
  title: "Paket Qurban",
  description: "Paket tabungan qurban Anda dan pilihan naik paket.",
};

export default function Page() {
  return (
    <Suspense fallback={<MemberPageSkeleton />}>
      <PackagesPage />
    </Suspense>
  );
}
