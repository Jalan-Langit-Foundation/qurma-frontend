"use client";

import * as React from "react";
import { X } from "lucide-react";
import { ExternalLink } from "@/components/ui/external-link";
import {
  formatWeightRange,
  getPackageById,
  usePackages,
} from "@/features/packages";
import { formatRupiah, formatRupiahSingkat } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { UpgradePromo } from "../lib/upgrade-promo";

/** Banner "naik paket" di sidebar; bisa ditutup, muncul lagi di login berikutnya. */
export function UpgradePromoCard({
  promo,
  onDismiss,
  compact = false,
}: {
  promo: UpgradePromo;
  onDismiss: () => void;
  /** Versi ringkas untuk drawer ponsel */
  compact?: boolean;
}) {
  const packages = usePackages();
  const target = promo.toPackageId
    ? getPackageById(packages, promo.toPackageId)
    : undefined;
  const weight = target ? formatWeightRange(target) : null;
  const additional = formatRupiah(promo.additionalAmount);

  return (
    <section
      aria-label="Penawaran naik paket"
      className={cn(
        "relative rounded-[18px] bg-night text-white",
        compact ? "px-4 py-3.5" : "p-4",
      )}
    >
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Tutup penawaran"
        className="absolute top-2 right-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>

      {!compact && (
        <span className="inline-block rounded-full bg-white/15 px-2 py-0.5 font-heading text-[10px] font-bold tracking-[0.08em] text-brand-line uppercase">
          Penawaran
        </span>
      )}
      <p
        className={cn(
          "pr-8 font-heading leading-snug font-bold",
          compact ? "text-[15px]" : "mt-2.5 text-base",
        )}
      >
        Naik ke {promo.toName}
      </p>
      <p className="mt-1.5 text-xs leading-relaxed text-white/75">
        {compact ? (
          <>
            Tambah <strong className="text-white">{additional}</strong>
            {weight && ` · bobot ${weight}`}
          </>
        ) : (
          <>
            {weight && `Bobot ${weight}. `}Tambah{" "}
            <strong className="text-white">{additional}</strong>, setoran
            dihitung ulang.
          </>
        )}
      </p>

      {!compact && (
        <p className="mt-3 flex items-baseline gap-1.5">
          <span className="text-xs text-white/60 line-through">
            <span className="sr-only">Harga sekarang </span>
            {formatRupiahSingkat(promo.fromPrice)}
          </span>
          <span className="font-heading text-lg font-bold">
            <span className="sr-only">menjadi </span>
            {formatRupiahSingkat(promo.toPrice)}
          </span>
        </p>
      )}

      <ExternalLink
        href={promo.whatsappHref}
        srHint="WhatsApp CS QURMA, tab baru"
        className={cn(
          "flex items-center justify-center rounded-full bg-white font-heading text-[13px] font-bold text-night transition-colors hover:bg-brand-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky",
          compact
            ? "mt-2.5 inline-flex min-h-9 px-4"
            : "mt-3.5 min-h-10 w-full",
        )}
      >
        Upgrade paket
      </ExternalLink>
    </section>
  );
}
