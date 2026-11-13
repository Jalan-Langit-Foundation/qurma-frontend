import * as React from "react";
import { Container } from "@/components/ui/container";
import { SectionState } from "@/components/ui/section-state";
import { cn } from "@/lib/utils";

/** Kerangka halaman area mudhohi (lebar & jarak seragam). */
export function MemberPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="py-12 md:py-16">
      <Container size="lg">
        <div className={cn("flex flex-col gap-6", className)}>{children}</div>
      </Container>
    </div>
  );
}

/** Placeholder saat data halaman area mudhohi sedang dimuat dari server. */
export function MemberPageSkeleton() {
  return (
    <MemberPage>
      <div className="space-y-3" aria-hidden="true">
        <div className="h-5 w-28 animate-pulse rounded-full bg-slate-200" />
        <div className="h-8 w-2/3 animate-pulse rounded-lg bg-slate-200 sm:w-1/2" />
      </div>
      <SectionState status="loading" skeletonVariant="detail" />
      <p className="sr-only" role="status">
        Memuat data…
      </p>
    </MemberPage>
  );
}
