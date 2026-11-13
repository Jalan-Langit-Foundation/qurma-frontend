import * as React from "react";
import { PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import { ROUTES, SECTION_IDS, sectionHref } from "@/config/navigation";
import { isSavingRegistrationOpen } from "@/features/savings";

export function EmptySavingState() {
  return (
    <Card className="border-2 border-dashed bg-white/60 p-8 text-center hover:shadow-sm">
      <div className="mx-auto flex max-w-md flex-col items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
          <PiggyBank className="h-6 w-6" aria-hidden="true" />
        </div>
        <h2 className="font-heading text-lg font-semibold text-ink">
          Anda Belum Memiliki Tabungan Qurban
        </h2>
        <p className="text-sm text-body">
          {isSavingRegistrationOpen
            ? "Pilih paket domba dan bulan mulai menabung untuk memulai persiapan qurban 2027."
            : "Pendaftaran tabungan saat ini dibantu langsung oleh admin QURMA. Setelah didaftarkan, progres tabungan akan tampil di sini."}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {isSavingRegistrationOpen ? (
            <Button href={ROUTES.newSaving} variant="primary" size="sm">
              Mulai Tabungan
            </Button>
          ) : (
            <Button
              href={buildWhatsappUrl(WHATSAPP_MESSAGES.general)}
              external
              variant="primary"
              size="sm"
            >
              Daftar via WhatsApp
            </Button>
          )}
          <Button
            href={sectionHref(SECTION_IDS.packages)}
            variant="outline"
            size="sm"
          >
            Lihat Pilihan Paket
          </Button>
        </div>
      </div>
    </Card>
  );
}
