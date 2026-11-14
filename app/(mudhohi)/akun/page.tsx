import { Suspense } from "react";
import type { Metadata } from "next";
import { AccountPage, AccountPageSkeleton } from "@/features/account/server";

export const metadata: Metadata = {
  title: "Pengaturan Akun",
  description: "Data pribadi dan keamanan akun penabung QURMA.",
};

export default function Page() {
  return (
    <Suspense fallback={<AccountPageSkeleton />}>
      <AccountPage />
    </Suspense>
  );
}
