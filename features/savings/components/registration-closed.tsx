import * as React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  HandHeart,
  Lock,
  Megaphone,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import { MemberPage, WhatsappLink } from "@/components/layout";
import { buttonClassName } from "@/components/ui/button-styles";
import { WHATSAPP_MESSAGES } from "@/config/contact";
import { ROUTES } from "@/config/navigation";
import { PROGRAM } from "@/config/program";
import { formatBulanTahun } from "@/lib/format";
import {
  REGISTRATION_CLOSED_OPTIONS,
  type RegistrationClosedIcon,
} from "../lib/content/registration-closed";

const OPTION_ICONS: Record<RegistrationClosedIcon, LucideIcon> = {
  pay: HandHeart,
  chat: MessageCircle,
  announce: Megaphone,
};

const linkClass =
  "mt-auto inline-flex min-h-11 items-center gap-1.5 self-start rounded-full text-sm font-semibold text-brand-strong hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

/** Halaman /tabungan/baru saat batas pendaftaran (Pengaturan Program) sudah lewat. */
export function RegistrationClosed({ deadline }: { deadline: string }) {
  const day = Number(deadline.slice(8, 10));
  const monthYear = formatBulanTahun(deadline);

  return (
    <MemberPage>
      <Link
        href={ROUTES.dashboard}
        className="inline-flex min-h-11 items-center gap-2 rounded-full text-sm text-body hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Kembali ke Dashboard
      </Link>

      <section
        aria-labelledby="closed-title"
        className="relative mt-4 overflow-hidden rounded-[28px] bg-night p-6 text-white sm:p-10"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 text-brand-sky/15"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="200" cy="200" r="80" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="130" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="180" strokeWidth="1.5" />
        </svg>

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/90">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-amber-400"
              />
              Pendaftaran ditutup
            </span>
            <h1
              id="closed-title"
              className="max-w-xl font-heading text-3xl leading-tight font-semibold text-balance sm:text-4xl"
            >
              Pendaftaran Tabungan Qurban {PROGRAM.hijriLabel} sudah ditutup
            </h1>
            <p className="max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              Terima kasih atas niat baik Anda. Batas pendaftaran tabungan
              online sudah lewat, tetapi Anda masih bisa berqurban lewat pilihan
              di bawah.
            </p>
            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <WhatsappLink
                message={WHATSAPP_MESSAGES.general}
                className={buttonClassName({
                  variant: "white",
                  size: "pill-lg",
                  className: "whitespace-nowrap",
                })}
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Hubungi CS QURMA
              </WhatsappLink>
            </div>
          </div>

          <div className="relative order-first mx-auto w-full max-w-[200px] lg:order-none lg:max-w-[260px]">
            <div className="overflow-hidden rounded-3xl bg-white text-ink shadow-pop">
              <p className="bg-brand px-5 py-3 text-center font-heading text-sm font-semibold tracking-wide text-white uppercase">
                {monthYear}
              </p>
              <div className="px-5 pt-5 pb-6 text-center">
                <p className="font-heading text-6xl leading-none lg:text-7xl font-semibold tracking-tight text-night">
                  {day}
                </p>
                <p className="mt-3 text-sm font-semibold text-ink">
                  Batas pendaftaran
                </p>
                <p className="mt-1 text-xs text-muted">Pukul 23.59 WIB</p>
              </div>
            </div>
            <span
              aria-hidden="true"
              className="absolute -top-5 -right-5 flex h-11 w-11 items-center justify-center rounded-full bg-amber-400 text-night shadow-float ring-4 ring-night"
            >
              <Lock className="h-5 w-5" />
            </span>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="closed-options-title"
        className="mt-10 space-y-4"
      >
        <h2
          id="closed-options-title"
          className="font-heading text-xl font-semibold text-ink"
        >
          Masih ingin berqurban?
        </h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {REGISTRATION_CLOSED_OPTIONS.map((option) => {
            const Icon = OPTION_ICONS[option.icon];
            return (
              <li
                key={option.id}
                className="flex flex-col gap-3 rounded-3xl border border-line bg-white p-6 shadow-card"
              >
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand-strong"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-base font-semibold text-ink">
                  {option.title}
                </h3>
                <p className="text-sm leading-relaxed text-body">
                  {option.text}
                </p>
                {option.action.kind === "whatsapp" ? (
                  <WhatsappLink
                    message={WHATSAPP_MESSAGES.general}
                    className={linkClass}
                  >
                    {option.action.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </WhatsappLink>
                ) : (
                  <Link href={option.action.href} className={linkClass}>
                    {option.action.label}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </section>
    </MemberPage>
  );
}
