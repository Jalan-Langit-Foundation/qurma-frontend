import * as React from "react";
import { cn } from "@/lib/utils";

/** Callback untuk menampilkan "Aksi terakhir" di atas halaman. */
export type DemoActionHandler = (message: string) => void;

interface DemoSectionProps {
  id: string;
  eyebrow: string;
  title: string;
  description: React.ReactNode;
  controls?: React.ReactNode;
  children: React.ReactNode;
}

/** Kerangka satu blok demo: eyebrow, judul, deskripsi, kontrol, isi. */
export function DemoSection({
  id,
  eyebrow,
  title,
  description,
  controls,
  children,
}: DemoSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 space-y-6 pt-10 first:pt-0"
    >
      <div className="flex flex-col justify-between gap-2 border-b border-slate-200 pb-3 sm:flex-row sm:items-end">
        <div>
          <p className="font-heading text-xs font-bold tracking-wider text-brand-strong uppercase">
            {eyebrow}
          </p>
          <h2
            id={`${id}-title`}
            className="font-heading text-2xl font-bold text-ink"
          >
            {title}
          </h2>
          <p className="mt-1 text-xs text-body sm:text-sm">{description}</p>
        </div>
        {controls}
      </div>
      {children}
    </section>
  );
}

export function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-brand-strong">
      {children}
    </code>
  );
}

/** Judul kecil di dalam kartu demo. */
export function DemoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-heading text-xs font-bold tracking-wider text-brand-strong uppercase">
      {children}
    </p>
  );
}

interface PillGroupProps<T extends string | number> {
  label: string;
  options: readonly { value: T; label: React.ReactNode }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  pillClassName?: string;
}

/**
 * Deretan tombol pilihan (aria-pressed).
 * Sebelumnya pola yang sama ditulis ulang 3 kali di halaman ini.
 */
export function PillGroup<T extends string | number>({
  label,
  options,
  value,
  onChange,
  className,
  pillClassName,
}: PillGroupProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn("flex items-center gap-1.5", className)}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={String(option.value)}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "cursor-pointer rounded-full px-3 py-1 text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
              active
                ? "bg-brand text-white shadow-xs"
                : "bg-slate-100 text-body hover:bg-slate-200",
              pillClassName,
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
