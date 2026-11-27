"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, PanelLeft, Sparkles, X } from "lucide-react";
import { BrandLogo } from "@/components/layout";
import { ExternalLink } from "@/components/ui/external-link";
import { ROUTES } from "@/config/navigation";
import { closeOnBackdropClick, useModalDialog } from "@/hooks/use-modal-dialog";
import { cn } from "@/lib/utils";
import { dismissUpgradePromoAction } from "../actions";
import {
  isMemberNavLinkActive,
  type MemberNavLink,
  type MemberNavSection,
} from "../lib/member-nav";
import { sidebarCookieValue } from "../lib/sidebar";
import type { SidebarModel } from "../lib/sidebar-model";
import { Avatar, DrawerAccountPanel, SidebarAccountMenu } from "./account-menu";
import { NavIcon } from "./nav-icon";
import { UpgradePromoCard } from "./upgrade-promo-card";

function SidebarTooltip({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-[calc(100%+12px)] z-50 hidden -translate-y-1/2 rounded-lg bg-night px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-white group-hover/nav:block group-focus-visible/nav:block"
    >
      {children}
    </span>
  );
}

const linkBase =
  "group/nav relative flex min-h-11 items-center gap-3 rounded-xl px-3 font-heading text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand";

function NavItem({
  link,
  active,
  collapsed,
  onNavigate,
}: {
  link: MemberNavLink;
  active: boolean;
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const locked = link.href === null;
  const className = cn(
    linkBase,
    collapsed && "justify-center px-0",
    active
      ? "bg-night font-semibold text-white"
      : locked
        ? "cursor-default font-medium text-muted"
        : "font-medium text-night hover:bg-surface",
  );
  const content = (
    <>
      <NavIcon
        name={link.icon}
        className={cn(
          "h-5 w-5 shrink-0",
          active ? "text-brand-frost" : "text-slate-500",
        )}
      />
      {collapsed ? (
        // Nama menu dibacakan lewat aria-label; tooltip hanya untuk mata
        <SidebarTooltip>
          {link.label}
          {link.lockedHint && ` · ${link.lockedHint.toLowerCase()}`}
        </SidebarTooltip>
      ) : (
        <>
          <span className="min-w-0 flex-1">
            <span className="block truncate">{link.label}</span>
            {link.lockedHint && (
              <span className="block text-[11px] leading-tight font-normal text-muted">
                {link.lockedHint}
              </span>
            )}
          </span>
          {link.badge && (
            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[11px] font-semibold text-brand-ink">
              <span className="sr-only">Setoran berikutnya: </span>
              {link.badge}
            </span>
          )}
        </>
      )}
    </>
  );

  if (locked) {
    return (
      <span
        aria-disabled="true"
        aria-label={collapsed ? link.label : undefined}
        tabIndex={collapsed ? 0 : undefined}
        className={className}
      >
        {content}
      </span>
    );
  }

  if (link.external) {
    return (
      <ExternalLink
        href={link.href!}
        srHint="WhatsApp, tab baru"
        aria-label={
          collapsed ? `${link.label} (WhatsApp, tab baru)` : undefined
        }
        className={className}
      >
        {content}
      </ExternalLink>
    );
  }

  return (
    <Link
      href={link.href!}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      aria-label={collapsed ? link.label : undefined}
      className={className}
    >
      {content}
    </Link>
  );
}

function NavSections({
  sections,
  pathname,
  collapsed = false,
  onNavigate,
}: {
  sections: MemberNavSection[];
  pathname: string;
  collapsed?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Menu penabung" className="flex flex-col gap-3.5">
      {sections.map((section) => (
        <div key={section.label} className="flex flex-col gap-0.5">
          {collapsed ? (
            <hr className="mx-2.5 my-1 border-slate-200 first:hidden" />
          ) : (
            <p className="mb-1.5 px-3 font-heading text-[11px] font-semibold tracking-[0.08em] text-muted uppercase">
              {section.label}
            </p>
          )}
          <ul className="flex flex-col gap-0.5">
            {section.links.map((link) => (
              <li key={link.id}>
                <NavItem
                  link={link}
                  active={isMemberNavLinkActive(link, pathname)}
                  collapsed={collapsed}
                  onNavigate={onNavigate}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function BrandMark() {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-brand font-heading font-bold text-white"
    >
      Q
    </span>
  );
}

function MobileDrawer({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const dialogRef = useModalDialog(open);

  return (
    <dialog
      ref={dialogRef}
      aria-label="Menu penabung"
      onClose={onClose}
      onClick={closeOnBackdropClick(onClose)}
      className="m-0 h-dvh max-h-dvh w-[min(312px,calc(100vw-48px))] max-w-none rounded-r-3xl bg-white p-0 shadow-pop backdrop:bg-night/45 open:animate-drawer-in lg:hidden"
    >
      {children}
    </dialog>
  );
}

/** Sidebar area penabung: bisa diciutkan di desktop, jadi drawer di ponsel. */
export function MemberSidebar({
  user,
  sections,
  promo,
  initialCollapsed,
}: SidebarModel) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(initialCollapsed);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [promoVisible, setPromoVisible] = React.useState(promo !== null);
  const [, startTransition] = React.useTransition();
  const sidebarId = React.useId();

  // Pindah halaman → drawer tertutup
  const [lastPathname, setLastPathname] = React.useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setDrawerOpen(false);
  }

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    document.cookie = sidebarCookieValue(next);
  };

  const dismissPromo = () => {
    setPromoVisible(false);
    startTransition(() => dismissUpgradePromoAction());
  };

  const closeDrawer = () => setDrawerOpen(false);
  const showPromo = promo !== null && promoVisible;
  // Di ponsel banner juga tampil di halaman Ringkasan, bukan hanya di drawer
  const showMobilePromo = showPromo && pathname === ROUTES.dashboard;

  return (
    <>
      {/* Ponsel & tablet: bar atas + drawer */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-line bg-white pr-3 pl-2 lg:hidden">
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-label="Buka menu"
          aria-expanded={drawerOpen}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-night hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
        <Link
          href={ROUTES.dashboard}
          aria-label="Ringkasan tabungan QURMA"
          className="flex h-11 flex-1 items-center rounded-xl focus-ring"
        >
          <BrandLogo eager className="h-7" />
        </Link>
        <Link
          href={ROUTES.account}
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          {/* Teks sr-only, bukan aria-label: inisial yang terlihat tidak dibacakan */}
          <span className="sr-only">Pengaturan akun {user.name}</span>
          <Avatar name={user.name} className="h-9 w-9 text-[13px]" />
        </Link>
      </header>

      {showMobilePromo && (
        <div className="px-3 pt-4 sm:px-5 lg:hidden">
          <UpgradePromoCard promo={promo} onDismiss={dismissPromo} compact />
        </div>
      )}

      <MobileDrawer open={drawerOpen} onClose={closeDrawer}>
        <div className="flex h-full flex-col gap-5 px-4 pt-4 pb-7">
          <div className="flex items-center justify-between">
            <BrandLogo className="h-7" />
            <button
              type="button"
              onClick={closeDrawer}
              aria-label="Tutup menu"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-surface text-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <NavSections
            sections={sections}
            pathname={pathname}
            onNavigate={closeDrawer}
          />
          <div className="mt-auto flex flex-col gap-3">
            {showPromo && (
              <UpgradePromoCard
                promo={promo}
                onDismiss={dismissPromo}
                compact
              />
            )}
            <DrawerAccountPanel
              name={user.name}
              email={user.email}
              onNavigate={closeDrawer}
            />
          </div>
        </div>
      </MobileDrawer>

      {/* Desktop: sidebar tetap di kiri */}
      <aside
        id={sidebarId}
        aria-label="Sidebar"
        className={cn(
          "sticky top-4 z-20 m-4 mr-0 hidden h-[calc(100dvh-2rem)] shrink-0 flex-col gap-[18px] rounded-3xl border border-slate-200/70 bg-white px-3 py-4 transition-[width] duration-200 lg:flex",
          collapsed ? "w-[84px]" : "w-[272px]",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-2",
            collapsed && "flex-col",
          )}
        >
          <Link
            href={ROUTES.dashboard}
            aria-label="Ringkasan tabungan QURMA"
            className="flex items-center rounded-xl p-1 focus-ring"
          >
            {collapsed ? <BrandMark /> : <BrandLogo eager className="h-8" />}
          </Link>
          <button
            type="button"
            onClick={toggleCollapsed}
            aria-expanded={!collapsed}
            aria-controls={sidebarId}
            aria-label={collapsed ? "Buka sidebar" : "Ciutkan sidebar"}
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-surface text-night transition-colors hover:bg-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <PanelLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div
          className={cn(
            "-mx-1 min-h-0 flex-1 px-1",
            !collapsed && "overflow-y-auto",
          )}
        >
          <NavSections
            sections={sections}
            pathname={pathname}
            collapsed={collapsed}
          />
        </div>

        <div className="flex flex-col gap-3">
          {showPromo &&
            (collapsed ? (
              <button
                type="button"
                onClick={toggleCollapsed}
                aria-label={`Penawaran: naik ke ${promo.toName}. Buka sidebar untuk melihat`}
                className="group/nav relative mx-auto flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-night text-brand-frost transition-colors hover:bg-night/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                <span
                  aria-hidden="true"
                  className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-brand"
                />
                <SidebarTooltip>Naik ke {promo.toName}</SidebarTooltip>
              </button>
            ) : (
              <UpgradePromoCard promo={promo} onDismiss={dismissPromo} />
            ))}
          <hr className="border-slate-100" />
          <SidebarAccountMenu
            name={user.name}
            email={user.email}
            collapsed={collapsed}
          />
        </div>
      </aside>
    </>
  );
}
