"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, ChevronRight, Settings } from "lucide-react";
import { ROUTES } from "@/config/navigation";
import { LogoutDialog, LogoutMenuItem } from "@/features/auth";
import { cn } from "@/lib/utils";
import { getInitials } from "../lib/initials";

interface AccountMenuProps {
  name: string;
  email: string;
}

/** Avatar + menu akun: identitas, Pengaturan Akun, dan Keluar. */
export function AccountMenu({ name, email }: AccountMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [confirmLogout, setConfirmLogout] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const menuId = React.useId();
  const initials = getInitials(name);

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
      <button
        ref={buttonRef}
        type="button"
        aria-label={`Menu akun ${name}`}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "group flex h-11 cursor-pointer items-center gap-1 rounded-full p-0.5 pr-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
          open ? "bg-surface" : "hover:bg-surface",
        )}
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-heading text-sm font-semibold text-white">
          {initials}
        </span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "h-4 w-4 text-muted transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          id={menuId}
          className="absolute top-full right-0 z-50 mt-3 w-[min(20rem,calc(100vw-1.5rem))] origin-top-right animate-pop-in overflow-hidden rounded-3xl bg-white p-2 shadow-pop ring-1 ring-slate-900/5"
        >
          <div className="flex items-center gap-3 rounded-2xl bg-surface p-3">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand font-heading text-base font-semibold text-white ring-4 ring-white"
            >
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate font-heading text-sm font-semibold text-ink">
                {name}
              </p>
              <p className="truncate text-xs text-muted">{email}</p>
            </div>
          </div>

          <Link
            href={ROUTES.account}
            onClick={() => setOpen(false)}
            className="group/item mt-2 flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-none"
          >
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong"
            >
              <Settings className="h-4 w-4" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-heading text-sm font-medium text-ink">
                Pengaturan Akun
              </span>
              <span className="block text-xs text-muted">
                Data pribadi & kata sandi
              </span>
            </span>
            <ChevronRight
              aria-hidden="true"
              className="h-4 w-4 text-muted transition-transform group-hover/item:translate-x-0.5"
            />
          </Link>

          <div className="mt-2 border-t border-slate-100 pt-2">
            <LogoutMenuItem
              onClick={() => {
                setOpen(false);
                setConfirmLogout(true);
              }}
            />
          </div>
        </div>
      )}

      <LogoutDialog
        open={confirmLogout}
        onClose={() => setConfirmLogout(false)}
      />
    </div>
  );
}

/** Placeholder avatar selama data akun dimuat. */
export function AccountMenuPlaceholder() {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-11 w-16 animate-pulse rounded-full bg-slate-200"
    />
  );
}
