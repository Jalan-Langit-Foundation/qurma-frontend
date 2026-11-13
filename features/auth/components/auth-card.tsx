import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { AmbientGlow } from "@/components/ui/ambient-glow";
import { Card, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { ROUTES } from "@/config/navigation";
import { SITE_CONFIG } from "@/config/site";

interface AuthCardProps {
  title: string;
  description: string;

  footer: React.ReactNode;
  children: React.ReactNode;
}

export function AuthCard({
  title,
  description,
  footer,
  children,
}: AuthCardProps) {
  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-canvas py-12 sm:py-16">
      <AmbientGlow size="md" intensity="soft" />

      <Container size="sm" className="relative z-10">
        <Card className="rounded-2xl border-2 border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] sm:p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <Link href={ROUTES.home} className="mb-4 inline-block">
              <Image
                src={SITE_CONFIG.logo.blue}
                alt="Logo QURMA"
                width={150}
                height={40}
                className="h-9 w-auto object-contain"
                loading="eager"
              />
            </Link>
            <CardTitle as="h1" size="xl" className="text-xl sm:text-2xl">
              {title}
            </CardTitle>
            <p className="mt-1 font-body text-xs text-body sm:text-sm">
              {description}
            </p>
          </div>

          {children}

          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <p className="text-xs text-body sm:text-sm">{footer}</p>
          </div>
        </Card>
      </Container>
    </div>
  );
}

/** Tautan teks di footer kartu auth. */
export function AuthFooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-semibold text-brand-strong hover:underline"
    >
      {children}
    </Link>
  );
}
