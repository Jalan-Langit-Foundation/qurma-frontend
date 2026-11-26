"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { logoutAction } from "../actions";

export function LogoutMenuItem({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left font-heading text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus-visible:bg-red-50 focus-visible:outline-none"
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50"
      >
        <LogOut className="h-4 w-4" />
      </span>
      Keluar
    </button>
  );
}

function ConfirmLogoutButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="destructive"
      size="pill"
      className="w-full"
      isLoading={pending}
      leftIcon={<LogOut className="h-4 w-4" aria-hidden="true" />}
    >
      {pending ? "Keluar…" : "Ya, Keluar"}
    </Button>
  );
}

/** Konfirmasi sebelum keluar dari akun. */
export function LogoutDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <ConfirmDialog
      open={open}
      onClose={onClose}
      icon={<LogOut className="h-5 w-5" />}
      title="Keluar dari akun?"
      description="Anda perlu masuk lagi untuk melihat tabungan dan jadwal setoran."
    >
      <form action={logoutAction} className="w-full sm:w-auto">
        <ConfirmLogoutButton />
      </form>
    </ConfirmDialog>
  );
}
