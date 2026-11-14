"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { Loader2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="outline"
      size="sm"
      isLoading={pending}
      leftIcon={<LogOut className="h-3.5 w-3.5" aria-hidden="true" />}
    >
      Keluar
    </Button>
  );
}

function MenuItemButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left font-heading text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:bg-red-50 focus-visible:outline-none disabled:cursor-wait disabled:opacity-60"
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50"
      >
        {pending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <LogOut className="h-4 w-4" />
        )}
      </span>
      {pending ? "Keluar…" : "Keluar"}
    </button>
  );
}

interface LogoutButtonProps {
  /** "button" = tombol outline; "menu" = baris di menu akun */
  variant?: "button" | "menu";
}

/** Tombol keluar. Memakai <form action>, jadi tetap berfungsi tanpa JavaScript. */
export function LogoutButton({ variant = "button" }: LogoutButtonProps) {
  return (
    <form action={logoutAction}>
      {variant === "menu" ? <MenuItemButton /> : <SubmitButton />}
    </form>
  );
}
