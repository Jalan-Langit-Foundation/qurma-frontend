import type { Metadata } from "next";
import { ROUTES } from "@/config/navigation";
import { PROGRAM } from "@/config/program";
import { TunaikanPage } from "@/features/landing";

export const metadata: Metadata = {
  title: "Tunaikan Qurbanmu",
  description: `Pilih satu ekor domba (Standar, Medium, atau Premium) dan tunaikan qurban ${PROGRAM.name} melalui pembayaran penuh, dibantu CS QURMA.`,
  alternates: { canonical: ROUTES.fullPayment },
};

export default function TunaikanRoute() {
  return <TunaikanPage />;
}
