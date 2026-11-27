import * as React from "react";
import { Container } from "@/components/ui/container";
import { SectionState } from "@/components/ui/section-state";
import { cn } from "@/lib/utils";

export function MemberPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="py-8 md:py-12">
      <Container size="lg">
        <div className={cn("flex flex-col gap-6", className)}>{children}</div>
      </Container>
    </div>
  );
}

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
