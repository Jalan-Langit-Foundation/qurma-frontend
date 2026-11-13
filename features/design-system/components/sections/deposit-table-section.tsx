"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { DepositTable } from "@/features/savings";
import { DEMO_INSTALLMENTS } from "../../lib/demo-data";
import { DemoSection, type DemoActionHandler } from "../demo-section";

export function DepositTableSection({
  onAction,
}: {
  onAction: DemoActionHandler;
}) {
  const [showEmpty, setShowEmpty] = React.useState(false);

  return (
    <DemoSection
      id="deposit-table"
      eyebrow="features/savings"
      title="DepositTable"
      description="Tabel di desktop, kartu bertumpuk di HP. Kolom aksi opsional (untuk admin)."
      controls={
        <Button
          variant={showEmpty ? "primary" : "outline"}
          size="sm"
          aria-pressed={showEmpty}
          onClick={() => setShowEmpty((prev) => !prev)}
        >
          {showEmpty ? "Lihat Data Contoh" : "Lihat Empty State"}
        </Button>
      }
    >
      <DepositTable
        installments={showEmpty ? [] : DEMO_INSTALLMENTS}
        renderAction={(item) =>
          item.status === "paid" ? (
            <span className="text-xs text-slate-400">—</span>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                onAction(`Input setoran bulan ke-${item.installmentNo}`)
              }
            >
              Input Setoran
            </Button>
          )
        }
      />
    </DemoSection>
  );
}
