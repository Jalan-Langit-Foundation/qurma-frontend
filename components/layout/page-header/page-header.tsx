import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: React.ReactNode;
  backLink?: { href: string; label: string };
  /** Elemen di sisi kanan judul (mis. tombol Keluar) */
  actions?: React.ReactNode;
}

/** Judul halaman area mudhohi: tautan kembali, badge kecil, judul, deskripsi. */
export function PageHeader({
  eyebrow,
  title,
  description,
  backLink,
  actions,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-6">
      {backLink && (
        <div>
          <Link
            href={backLink.href}
            className="inline-flex items-center gap-2 rounded-md text-sm text-body transition-colors hover:text-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {backLink.label}
          </Link>
        </div>
      )}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-2">
          <div>
            <Badge variant="primary" size="sm">
              {eyebrow}
            </Badge>
          </div>
          <h1 className="font-heading text-2xl font-bold text-ink sm:text-3xl">
            {title}
          </h1>
          {description && <p className="text-sm text-body">{description}</p>}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
