"use client";

import { ErrorView } from "@/components/layout/error-view/error-view";
import { ROUTES } from "@/config/navigation";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="konten-utama" className="flex flex-1">
      <ErrorView
        error={error}
        reset={reset}
        secondaryAction={{ label: "Kembali ke Beranda", href: ROUTES.home }}
      />
    </main>
  );
}
