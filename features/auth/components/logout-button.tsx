"use client";

import * as React from "react";
import { useFormStatus } from "react-dom";
import { LogOut } from "lucide-react";
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

/** Tombol keluar. Memakai <form action>, jadi tetap berfungsi tanpa JavaScript. */
export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <SubmitButton />
    </form>
  );
}
