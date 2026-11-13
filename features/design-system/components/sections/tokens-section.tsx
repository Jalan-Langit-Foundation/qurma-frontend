"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { COLOR_TOKENS } from "../../lib/demo-data";
import { DemoSection, type DemoActionHandler } from "../demo-section";

const COPIED_RESET_MS = 2000;

export function TokensSection({ onAction }: { onAction: DemoActionHandler }) {
  const [copiedHex, setCopiedHex] = React.useState<string | null>(null);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const copyHex = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        () => setCopiedHex(null),
        COPIED_RESET_MS,
      );
    } catch {
      onAction("Gagal menyalin ke clipboard (izin browser ditolak).");
    }
  };

  return (
    <DemoSection
      id="tokens"
      eyebrow="01. Brand Foundation"
      title="Token Warna"
      description="Klik kartu untuk menyalin kode hex. Pakai lewat utility Tailwind, mis. text-brand-strong."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {COLOR_TOKENS.map((color) => (
          <button
            key={color.hex}
            type="button"
            onClick={() => copyHex(color.hex)}
            className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-3 text-left shadow-xs transition-all hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <div
              className={cn(
                "flex h-16 items-end rounded-xl p-2 font-mono text-xs font-bold",
                color.textClass,
              )}
              style={{ backgroundColor: color.hex }}
            >
              {copiedHex === color.hex ? (
                <span className="flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] text-white">
                  <Check className="h-3 w-3" aria-hidden="true" /> Disalin
                </span>
              ) : (
                color.hex
              )}
            </div>
            <p className="mt-2.5 font-heading text-xs font-bold text-ink">
              {color.name}
            </p>
            <p className="font-mono text-[11px] text-brand-strong">
              {color.token}
            </p>
            <p className="mt-0.5 text-[11px] leading-tight text-muted">
              {color.role}
            </p>
          </button>
        ))}
      </div>
    </DemoSection>
  );
}
