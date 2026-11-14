import * as React from "react";
import { MemberContainer } from "@/components/layout";

const block = "animate-pulse rounded-[28px] bg-white";

export function DashboardSkeleton() {
  return (
    <MemberContainer>
      <div aria-hidden="true" className="space-y-5">
        <div className="h-10 w-3/4 animate-pulse rounded-xl bg-slate-200 sm:w-1/2" />
        <div className="h-5 w-2/3 animate-pulse rounded-lg bg-slate-200 sm:w-1/3" />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-8 w-28 animate-pulse rounded-full bg-slate-200"
            />
          ))}
        </div>
      </div>
      <div
        aria-hidden="true"
        className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <div className={`${block} h-80 lg:row-span-2 lg:h-auto`} />
        <div className={`${block} h-80`} />
        <div className={`${block} h-80`} />
        <div className={`${block} h-64`} />
        <div className={`${block} h-64`} />
      </div>
      <p className="sr-only" role="status">
        Memuat dashboard…
      </p>
    </MemberContainer>
  );
}
