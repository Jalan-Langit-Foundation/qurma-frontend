"use client";

import { ErrorView } from "@/components/layout/error-view/error-view";
import { ROUTES } from "@/config/navigation";

export default function MudhohiError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorView
      error={error}
      reset={reset}
      secondaryAction={{
        label: "Kembali ke Dashboard",
        href: ROUTES.dashboard,
      }}
    />
  );
}
