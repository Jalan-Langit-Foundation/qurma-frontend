"use client";

import * as React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export interface ErrorViewProps {
  error: Error & { digest?: string };
  reset: () => void;
  secondaryAction: { label: string; href: string };
}

export function ErrorView({ error, reset, secondaryAction }: ErrorViewProps) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div role="alert" className="flex flex-1 items-center py-16 sm:py-24">
      <Container size="sm" className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <AlertTriangle className="h-6 w-6" aria-hidden="true" />
        </div>
        <h1 className="mt-4 font-heading text-2xl font-bold text-ink">
          Maaf, terjadi kendala
        </h1>
        <p className="mt-3 text-sm text-body sm:text-base">
          Halaman gagal dimuat. Silakan coba lagi. Jika masih berlanjut, hubungi
          admin QURMA melalui WhatsApp.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-muted">
            Kode referensi: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            variant="primary"
            size="md"
            onClick={reset}
            leftIcon={<RefreshCw className="h-4 w-4" aria-hidden="true" />}
          >
            Coba Lagi
          </Button>
          <Button variant="outline" size="md" href={secondaryAction.href}>
            {secondaryAction.label}
          </Button>
        </div>
      </Container>
    </div>
  );
}
