import type { Metadata } from "next";
import { ROUTES } from "@/config/navigation";
import { PROGRAM } from "@/config/program";
import { TERMS, TermsPage } from "@/features/legal";

export const metadata: Metadata = {
  title: TERMS.title,
  description: `Syarat & Ketentuan program ${PROGRAM.name}: pendaftaran, pembayaran, setoran, pembatalan, pelaksanaan qurban, dan privasi data.`,
  alternates: { canonical: ROUTES.terms },
};

export default function TermsRoute() {
  return <TermsPage terms={TERMS} />;
}
