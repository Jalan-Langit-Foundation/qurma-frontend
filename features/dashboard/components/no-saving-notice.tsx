import * as React from "react";
import Link from "next/link";
import { PiggyBank } from "lucide-react";
import { buttonClassName } from "@/components/ui/button-styles";
import { ROUTES } from "@/config/navigation";

/** Halaman tabungan dibuka sebelum punya tabungan. */
export function NoSavingNotice({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-[28px] bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
          <PiggyBank className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h2 className="font-heading text-base font-semibold text-ink">
            Belum ada tabungan
          </h2>
          <p className="mt-1 text-sm text-body">{text}</p>
        </div>
      </div>
      <Link
        href={ROUTES.dashboard}
        className={buttonClassName({ variant: "primary", size: "pill" })}
      >
        Ke Ringkasan
      </Link>
    </div>
  );
}
