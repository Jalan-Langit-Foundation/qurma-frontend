import "server-only";
import * as React from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import {
  BrandLogo,
  MAIN_CONTENT_ID,
  SkipLink,
  WhatsappLink,
} from "@/components/layout";
import { buttonClassName } from "@/components/ui/button-styles";
import { ROUTES } from "@/config/navigation";
import { getCurrentUser } from "@/features/auth/server";
import { AccountMenu, AccountMenuPlaceholder } from "./account-menu";
import { MemberBottomNav, MemberTopNav } from "./member-nav";

async function AccountMenuSlot() {
  const user = await getCurrentUser();
  return <AccountMenu name={user.name} email={user.email} />;
}

export function MemberShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <SkipLink />

      <div className="mx-auto w-full max-w-[1400px] px-3 pt-3 sm:px-5 sm:pt-5">
        <header className="flex items-center justify-between gap-3 rounded-3xl bg-white px-2.5 py-2 sm:px-3">
          <Link
            href={ROUTES.dashboard}
            aria-label="Ringkasan tabungan QURMA"
            className="flex h-12 items-center rounded-2xl bg-brand-soft px-3 focus-ring"
          >
            <BrandLogo eager className="h-7" />
          </Link>

          <MemberTopNav />

          <div className="flex items-center gap-2">
            <WhatsappLink
              aria-label="Chat CS QURMA via WhatsApp (tab baru)"
              className={buttonClassName({
                variant: "subtle",
                size: "icon",
                className: "h-11 w-11",
              })}
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </WhatsappLink>
            <React.Suspense fallback={<AccountMenuPlaceholder />}>
              <AccountMenuSlot />
            </React.Suspense>
          </div>
        </header>
      </div>

      <main id={MAIN_CONTENT_ID} className="flex-1 pb-28 md:pb-10">
        {children}
      </main>

      <MemberBottomNav />
    </div>
  );
}
