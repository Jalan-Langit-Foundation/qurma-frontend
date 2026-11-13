import * as React from "react";
import {
  AmbientGlow,
  type AmbientGlowProps,
} from "@/components/ui/ambient-glow";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export interface LandingSectionProps {
  id?: string;
  label: string;
  tone?: "white" | "soft";
  glow?: AmbientGlowProps;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
}

export function LandingSection({
  id,
  label,
  tone = "white",
  glow,
  className,
  containerClassName,
  children,
}: LandingSectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={cn(
        "relative w-full scroll-mt-16 border-b border-slate-200/80 py-12 sm:py-16 lg:py-20",
        tone === "soft" ? "overflow-hidden bg-section-soft" : "bg-white",
        className,
      )}
    >
      {glow && <AmbientGlow {...glow} />}
      <Container size="xl" className={cn("relative z-10", containerClassName)}>
        {children}
      </Container>
    </section>
  );
}
