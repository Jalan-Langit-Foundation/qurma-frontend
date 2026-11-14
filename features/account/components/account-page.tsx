import "server-only";
import { MemberContainer } from "@/components/layout";
import { env } from "@/config/env";
import { getCurrentUser } from "@/features/auth/server";
import { AccountSidebar } from "./account-sidebar";
import { PersonalDataCard } from "./personal-data-card";
import { SecurityCard } from "./security-card";

export async function AccountPage() {
  const user = await getCurrentUser();
  const canEdit = env.features.profile;

  return (
    <MemberContainer>
      <div className="space-y-2">
        <h1 className="font-heading text-[30px] leading-tight font-medium text-ink md:text-4xl">
          Pengaturan Akun
        </h1>
        <p className="text-sm text-body md:text-base">
          Data ini dipakai admin QURMA untuk menghubungi Anda dan mencatat
          setoran.
        </p>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[320px_1fr] lg:items-start">
        <AccountSidebar name={user.name} email={user.email} />

        <div className="space-y-4">
          <PersonalDataCard user={user} canEdit={canEdit} />
          <SecurityCard canEdit={canEdit} />
        </div>
      </div>
    </MemberContainer>
  );
}
