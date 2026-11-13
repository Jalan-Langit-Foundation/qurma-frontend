import * as React from "react";

const PENDING_TEXT = "Menunggu informasi dari admin";

export interface DetailItem {
  label: string;
  /** null → ditampilkan "Menunggu informasi dari admin" */
  value: React.ReactNode | null;
}

/** Daftar label–nilai untuk detail persiapan & laporan qurban. */
export function DetailList({ items }: { items: DetailItem[] }) {
  return (
    <dl className="divide-y divide-slate-100 font-body text-sm">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
        >
          <dt className="text-muted">{item.label}</dt>
          <dd
            className={
              item.value === null
                ? "text-xs text-muted italic"
                : "font-heading font-semibold text-ink"
            }
          >
            {item.value ?? PENDING_TEXT}
          </dd>
        </div>
      ))}
    </dl>
  );
}
