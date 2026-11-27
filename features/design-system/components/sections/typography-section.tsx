import * as React from "react";
import { Card } from "@/components/ui/card";
import { PROGRAM } from "@/config/program";
import { getDefaultPackage, usePackages } from "@/features/packages";
import { formatRupiah } from "@/lib/format";
import { DemoSection } from "../demo-section";

const fontLabel = "font-mono text-xs font-bold text-brand-strong uppercase";

export function TypographySection() {
  const pkg = getDefaultPackage(usePackages());

  return (
    <DemoSection
      id="typography"
      eyebrow="02. Tipografi"
      title="Typeface & Skala Font"
      description="Poppins (font-heading) untuk judul & tombol. Lato (font-body) untuk isi & formulir."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="space-y-3 p-6">
          <p className={fontLabel}>Heading: Poppins</p>
          <p className="font-heading text-2xl font-extrabold text-ink sm:text-3xl">
            Qurban Nggak Harus Menunggu.
          </p>
          <p className="font-heading text-xl font-bold text-ink sm:text-2xl">
            Pilihan Paket Qurban {PROGRAM.year}
          </p>
          <p className="font-heading text-lg font-bold text-brand">
            {pkg.name} ({formatRupiah(pkg.target)})
          </p>
        </Card>
        <Card className="space-y-3 p-6 text-sm leading-relaxed">
          <p className={fontLabel}>Body: Lato</p>
          <p>
            Program pendampingan qurban yang memudahkan umat mempersiapkan
            qurban terbaik.
          </p>
          <p className="text-xs text-muted">
            Teks sekunder (text-muted) — kontras 5,3:1.
          </p>
        </Card>
      </div>
    </DemoSection>
  );
}
