import type { Metadata } from "next";
import { env } from "@/config/env";
import { ROUTES } from "@/config/navigation";
import { PROGRAM } from "@/config/program";
import { buildTerms, TERMS_META, TermsPage } from "@/features/legal";
import { getPaymentDeadline } from "@/features/program";
import { getProgram } from "@/features/program/server";

export const metadata: Metadata = {
  title: TERMS_META.title,
  description: `Syarat & Ketentuan program ${PROGRAM.name}: pendaftaran, pembayaran, setoran, pembatalan, pelaksanaan qurban, dan privasi data.`,
  alternates: { canonical: ROUTES.terms },
};

export default async function TermsRoute() {
  const { schedule } = await getProgram();
  const terms = buildTerms({
    paymentDeadline: getPaymentDeadline(schedule),
    schedule,
    websiteRegistration: env.savingRegistrationOpen,
  });

  return <TermsPage terms={terms} />;
}
