import { Suspense } from "react";
import type { Metadata } from "next";
import { Wallet } from "lucide-react";
import { MemberPageSkeleton, PagePlaceholder } from "@/components/layout";
import { buildWhatsappUrl, WHATSAPP_MESSAGES } from "@/config/contact";
import { ROUTES } from "@/config/navigation";
import {
  getSavingRegistration,
  NewSavingPage,
  RegistrationClosed,
} from "@/features/savings/server";

export const metadata: Metadata = {
  title: "Buat Tabungan Qurban",
  description: "Pilih paket qurban dan bulan mulai menabung.",
};

export default async function Page() {
  const registration = await getSavingRegistration();

  if (registration.state === "closed") {
    return <RegistrationClosed deadline={registration.deadline} />;
  }

  if (registration.state === "not_opened") {
    return (
      <PagePlaceholder
        eyebrow="Tabungan Qurban"
        title="Buat Tabungan Baru"
        icon={<Wallet className="h-6 w-6" aria-hidden="true" />}
        description="Pendaftaran tabungan online belum dibuka. Sementara ini, pendaftaran dibantu langsung oleh CS QURMA melalui WhatsApp."
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
