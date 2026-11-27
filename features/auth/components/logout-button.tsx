"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { logoutAction } from "../actions";

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
