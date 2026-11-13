import { Suspense } from "react";
import type { Metadata } from "next";
import { PiggyBank } from "lucide-react";
import { MemberPageSkeleton, PagePlaceholder } from "@/components/layout";
import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import { ROUTES } from "@/config/navigation";
import { isSavingRegistrationOpen } from "@/features/savings";
import { NewSavingPage } from "@/features/savings/server";

export const metadata: Metadata = {
  title: "Buat Tabungan Qurban",
  description: "Pilih paket qurban dan bulan mulai menabung.",
};

export default function Page() {
  // Sesuai blueprint: pendaftaran online belum dinyatakan aktif sampai sistem siap
  if (!isSavingRegistrationOpen) {
    return (
      <PagePlaceholder
        eyebrow="Tabungan Qurban"
        title="Buat Tabungan Baru"
        icon={<PiggyBank className="h-6 w-6" aria-hidden="true" />}
        description="Pendaftaran tabungan online belum dibuka. Sementara ini, pendaftaran dibantu langsung oleh admin QURMA melalui WhatsApp."
        backLink={{ href: ROUTES.dashboard, label: "Kembali ke Dashboard" }}
        actions={[
          {
            label: "Daftar via WhatsApp",
            href: buildWhatsappUrl(WHATSAPP_MESSAGES.general),
            external: true,
          },
        ]}
      />
    );
  }

  return (
    <Suspense fallback={<MemberPageSkeleton />}>
      <NewSavingPage />
    </Suspense>
  );
}
