import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Home, Package } from "lucide-react";
import { buttonClassName } from "@/components/ui/button-styles";
import { ROUTES, SECTION_IDS, sectionHref } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { BrandBar } from "../brand-bar/brand-bar";
import { BrandLogo } from "../shared/brand-logo";
import { HelpLink } from "../shared/help-link";
import { MAIN_CONTENT_ID, SkipLink } from "../site-shell/skip-link";

const ILLUSTRATION = {
  src: "/images/illustrations/domba-404.webp",
} as const;

const DIGITS = [
  { char: "4", className: "left-[2%] top-[14%] -rotate-[14deg]" },
  { char: "0", className: "left-[34%] top-[30%] rotate-[10deg]" },
  { char: "4", className: "left-[66%] top-0 rotate-[16deg]" },
] as const;

const RING_OFFSET = "focus-visible:ring-offset-surface";

function BackgroundShapes() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute -top-32 -left-40 size-[380px] rounded-full bg-brand-soft sm:size-[620px]" />
      <div className="absolute -top-44 -left-52 size-[440px] rounded-full border-[18px] border-white/80 sm:size-[720px] sm:border-[26px]" />
      <div className="absolute -right-32 -bottom-40 size-[340px] rounded-full bg-brand-soft-hover sm:size-[560px]" />
      <div className="absolute -right-44 -bottom-52 hidden size-[680px] rounded-full border-[22px] border-white/80 sm:block" />
    </div>
  );
}

function HandDrawnArrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 260"
      fill="none"
      className="pointer-events-none absolute top-full right-1/2 mt-4 hidden h-auto w-[min(440px,26vw)] lg:block"
    >
      <path
        d="M400 10 C 380 150, 250 230, 40 200"
        stroke="var(--color-brand-sky)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M70 172 L 36 200 L 74 226"
        stroke="var(--color-brand-sky)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HomeButton() {
  return (
    <Link
      href={ROUTES.home}
      className={buttonClassName({
        size: "pill-lg",
        className: cn("w-full whitespace-nowrap sm:w-auto", RING_OFFSET),
      })}
    >
      <Home className="h-4 w-4" aria-hidden="true" />
      Kembali ke Beranda
    </Link>
  );
}

export function NotFoundView() {
  return (
    <div className="relative isolate flex h-dvh min-h-[620px] flex-col overflow-hidden bg-surface">
      <SkipLink />
      <BackgroundShapes />

      <BrandBar
        className="px-5 sm:px-10 sm:py-6"
        start={
          <Link href={ROUTES.home} className="block rounded-lg focus-ring">
            <BrandLogo alt="QURMA – ke beranda" eager />
          </Link>
        }
        end={<HelpLink />}
      />

      <main
        id={MAIN_CONTENT_ID}
        className="relative z-10 mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col px-5 sm:px-10 lg:grid lg:grid-cols-[1.1fr_1fr] lg:grid-rows-[auto_minmax(0,1fr)] lg:gap-x-10"
      >
        <div
          aria-hidden="true"
          className="relative mx-auto h-[150px] w-full max-w-[300px] shrink-0 select-none sm:h-[230px] sm:max-w-[480px] lg:col-start-1 lg:row-start-1 lg:mx-0 lg:h-[min(440px,42vh)] lg:max-w-[640px]"
        >
          {DIGITS.map((digit, index) => (
            <span
              key={index}
              className={cn(
                "absolute font-heading leading-none font-extrabold text-night",
                "text-[96px] [text-shadow:6px_6px_0_var(--color-brand)] sm:text-[150px] sm:[text-shadow:9px_9px_0_var(--color-brand)] lg:text-[min(260px,25vh)] lg:[text-shadow:12px_12px_0_var(--color-brand)]",
                digit.className,
              )}
            >
              {digit.char}
            </span>
          ))}
        </div>

        <div className="relative mt-4 flex shrink-0 flex-col items-center gap-3 text-center sm:mt-6 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center lg:pb-[24vh]">
          <div className="relative flex flex-col items-center gap-3">
            <h1 className="font-heading text-[28px] leading-tight font-bold text-ink sm:text-4xl lg:text-[44px]">
              Waduh, dombanya nyasar!
            </h1>
            <p className="max-w-md font-heading text-[15px] leading-relaxed font-medium text-muted sm:text-lg lg:max-w-none">
              Halaman yang Anda cari tidak ada atau sudah dipindahkan.{" "}
              <br className="hidden lg:block" />
              Tenang, si domba siap mengantar Anda pulang.
            </p>

            <HandDrawnArrow />
          </div>
        </div>

        {/* Aksi */}
        <div className="mt-6 flex shrink-0 flex-col gap-3 sm:flex-row sm:justify-center lg:hidden">
          <HomeButton />
          <Link
            href={sectionHref(SECTION_IDS.packages)}
            className={buttonClassName({
              variant: "soft",
              size: "pill-lg",
              className: cn("border-slate-200/80", RING_OFFSET),
            })}
          >
            <Package className="h-4 w-4" aria-hidden="true" />
            Lihat Paket Qurban
          </Link>
        </div>

        <div className="relative mt-4 min-h-[120px] flex-1 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:min-h-0 lg:pt-[84px]">
          <div className="relative mx-auto h-full max-w-full aspect-[1071/1103]">
            <div className="absolute bottom-full left-[8%] mb-4 hidden -translate-x-1/4 lg:block">
              <HomeButton />
            </div>
            <Image
              src={ILLUSTRATION.src}
              fill
              alt="Ilustrasi domba melambaikan kaki ke arah tombol beranda"
              sizes="(min-width: 1024px) 480px, (min-width: 640px) 360px, 280px"
              className="translate-y-1 object-contain object-bottom"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
