import "server-only";
import * as React from "react";
import { MAIN_CONTENT_ID, SkipLink } from "@/components/layout";
import { getSidebarModel } from "../api/sidebar.api";
import { MemberSidebar } from "./member-sidebar";

async function SidebarSlot() {
  return <MemberSidebar {...await getSidebarModel()} />;
}

function SidebarFallback() {
  return (
    <>
      <div
        aria-hidden="true"
        className="sticky top-0 z-30 h-16 border-b border-line bg-white lg:hidden"
      />
      <div
        aria-hidden="true"
        className="sticky top-4 m-4 mr-0 hidden h-[calc(100dvh-2rem)] w-[272px] shrink-0 flex-col gap-3 rounded-3xl border border-slate-200/70 bg-white px-3 py-4 lg:flex"
      >
        <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-100" />
        {Array.from({ length: 5 }, (_, index) => (
          <div
            key={index}
            className="h-11 animate-pulse rounded-xl bg-slate-100"
          />
        ))}
      </div>
    </>
  );
}

export function MemberShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface lg:flex lg:items-start">
      <SkipLink />
      <React.Suspense fallback={<SidebarFallback />}>
        <SidebarSlot />
      </React.Suspense>
      <main id={MAIN_CONTENT_ID} className="min-w-0 flex-1 pb-12">
        {children}
      </main>
    </div>
  );
}
