"use client";

import { ErrorView, MAIN_CONTENT_ID } from "@/components/layout";
import { ROUTES } from "@/config/navigation";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id={MAIN_CONTENT_ID} className="flex flex-1">
      <ErrorView
        error={error}
        reset={reset}
        secondaryAction={{ label: "Kembali ke Beranda", href: ROUTES.home }}
      />
    </main>
  );
}
