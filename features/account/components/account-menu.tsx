"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronUp, LogOut, UserRound } from "lucide-react";
import { ROUTES } from "@/config/navigation";
import { LogoutDialog } from "@/features/auth";
import { cn } from "@/lib/utils";
import { getInitials } from "../lib/initials";

interface AccountIdentity {
  name: string;
  email: string;
}

const itemClass =
  "flex min-h-11 w-full cursor-pointer items-center gap-2.5 rounded-[10px] px-3 font-heading text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand";

export function Avatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-brand font-heading font-semibold text-white",
        className ?? "h-10 w-10 text-sm",
      )}
    >
      {getInitials(name)}
    </span>
  );
}

export function SidebarAccountMenu({
  name,
  email,
  collapsed,
}: AccountIdentity & { collapsed: boolean }) {
  const [open, setOpen] = React.useState(false);
  const [confirmLogout, setConfirmLogout] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuId = React.useId();

  React.useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      {open && (
        <div
          id={menuId}
          className={cn(
            "absolute z-50 animate-pop-in rounded-2xl border border-slate-100 bg-white p-1.5 shadow-pop",
            collapsed
              ? "bottom-0 left-[calc(100%+12px)] w-56"
              : "inset-x-0 bottom-[calc(100%+8px)]",
          )}
        >
          {collapsed && (
            <div className="border-b border-slate-100 px-3 pt-2 pb-2.5">
              <p className="truncate font-heading text-sm font-semibold text-ink">
                {name}
              </p>
              <p className="truncate text-xs text-muted">{email}</p>
            </div>
          )}
          <Link
            href={ROUTES.account}
            onClick={() => setOpen(false)}
            className={cn(itemClass, "text-night hover:bg-surface")}
          >
            <UserRound className="h-[18px] w-[18px]" aria-hidden="true" />
            Pengaturan akun
          </Link>
          <hr className="my-1 border-slate-100" />
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setConfirmLogout(true);
            }}
            className={cn(itemClass, "text-red-700 hover:bg-red-50")}
          >
            <LogOut className="h-[18px] w-[18px]" aria-hidden="true" />
            Keluar
          </button>
        </div>
      )}

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex w-full cursor-pointer items-center gap-2.5 rounded-[14px] p-1.5 text-left transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
          open && "bg-surface",
          collapsed && "justify-center",
        )}
      >
        <span className="sr-only">
          {collapsed ? `Menu akun ${name}` : "Menu akun:"}
        </span>
        <Avatar name={name} />
        {!collapsed && (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-heading text-sm font-semibold text-ink">
                {name}
              </span>
              <span className="block truncate text-xs text-muted">{email}</span>
            </span>
            <ChevronUp
              aria-hidden="true"
              className={cn(
                "h-[18px] w-[18px] shrink-0 text-slate-500 transition-transform",
                !open && "rotate-180",
              )}
            />
          </>
        )}
      </button>

      <LogoutDialog
        open={confirmLogout}
        onClose={() => setConfirmLogout(false)}
      />
    </div>
  );
}

export function DrawerAccountPanel({
  name,
  email,
  onNavigate,
}: AccountIdentity & { onNavigate: () => void }) {
  const [confirmLogout, setConfirmLogout] = React.useState(false);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 rounded-2xl bg-surface p-3">
        <Avatar name={name} />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-heading text-sm font-semibold text-ink">
            {name}
          </span>
          <span className="block truncate text-xs text-muted">{email}</span>
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Link
          href={ROUTES.account}
          onClick={onNavigate}
          className="flex min-h-11 items-center justify-center rounded-full border border-line font-heading text-[13px] font-semibold text-night transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
        >
          Pengaturan akun
        </Link>
        <button
          type="button"
          onClick={() => setConfirmLogout(true)}
          className="min-h-11 cursor-pointer rounded-full border border-red-200 bg-red-50 font-heading text-[13px] font-semibold text-red-700 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        >
          Keluar
        </button>
      </div>
      <LogoutDialog
        open={confirmLogout}
        onClose={() => setConfirmLogout(false)}
      />
    </div>
  );
}
