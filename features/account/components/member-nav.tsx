"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { env } from "@/config/env";
import { MEMBER_NAV_ITEMS } from "@/config/navigation";
import { cn } from "@/lib/utils";
import {
  getVisibleMemberNavItems,
  isMemberNavItemActive,
} from "../lib/member-nav";
import { NavIcon } from "./nav-icon";

const VISIBLE_ITEMS = getVisibleMemberNavItems(MEMBER_NAV_ITEMS, env.features);

/** usePathname di halaman dinamis perlu <Suspense>; fallback = tampilan tanpa menu aktif. */
function withPathname(View: React.ComponentType<{ pathname: string }>) {
  function WithPathname() {
    return <View pathname={usePathname()} />;
  }
  return function PathnameAware() {
    return (
      <React.Suspense fallback={<View pathname="" />}>
        <WithPathname />
      </React.Suspense>
    );
  };
}

function TopNavView({ pathname }: { pathname: string }) {
  const pill =
    "inline-flex min-h-11 items-center rounded-full px-4 font-heading text-sm transition-colors focus-ring lg:px-5";

  return (
    <nav aria-label="Menu area penabung" className="hidden gap-1.5 md:flex">
      {VISIBLE_ITEMS.map((item) => {
        const active = isMemberNavItemActive(item, pathname);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              pill,
              active
                ? "bg-night font-semibold text-white"
                : "bg-surface font-medium text-night hover:bg-brand-soft hover:text-brand-strong",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function BottomNavView({ pathname }: { pathname: string }) {
  const item =
    "flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl font-heading text-[11px] transition-colors focus-ring";

  return (
    <nav
      aria-label="Navigasi bawah"
      className="fixed inset-x-3 bottom-3 z-40 grid auto-cols-fr grid-flow-col gap-1 rounded-3xl bg-white p-2 shadow-float md:hidden"
    >
      {VISIBLE_ITEMS.map((navItem) => {
        const active = isMemberNavItemActive(navItem, pathname);
        return (
          <Link
            key={navItem.href}
            href={navItem.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              item,
              active
                ? "bg-night font-semibold text-white"
                : "font-medium text-night",
            )}
          >
            <NavIcon name={navItem.icon} className="h-5 w-5" />
            {navItem.label}
          </Link>
        );
      })}
    </nav>
  );
}

/** Menu pil di header (tablet & desktop). */
export const MemberTopNav = withPathname(TopNavView);

/** Navigasi bawah (ponsel). */
export const MemberBottomNav = withPathname(BottomNavView);
