import { MemberContainer } from "@/components/layout";

const BLOCK = "animate-pulse rounded-[28px] bg-white";

/** Placeholder halaman Pengaturan Akun selama data akun dimuat. */
export function AccountPageSkeleton() {
  return (
    <MemberContainer>
      <div aria-hidden="true" className="space-y-3">
        <div className="h-10 w-48 animate-pulse rounded-xl bg-slate-200" />
        <div className="h-5 w-2/3 animate-pulse rounded-lg bg-slate-200 sm:w-1/3" />
      </div>
      <div
        aria-hidden="true"
        className="mt-8 grid gap-4 lg:grid-cols-[320px_1fr]"
      >
        <div className={`${BLOCK} h-40 lg:h-72`} />
        <div className="space-y-4">
          <div className={`${BLOCK} h-80`} />
          <div className={`${BLOCK} h-56`} />
        </div>
      </div>
      <p className="sr-only" role="status">
        Memuat pengaturan akun…
      </p>
    </MemberContainer>
  );
}
