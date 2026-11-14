import Image from "next/image";
import { SITE_CONFIG } from "@/config/site";

interface BrandLogoProps {
  tone?: "blue" | "white";
  className?: string;
  eager?: boolean;
  alt?: string;
}

const SOURCES = {
  blue: SITE_CONFIG.logo.blue,
  white: SITE_CONFIG.logo.white,
} as const;

export function BrandLogo({
  tone = "blue",
  className = "h-8 sm:h-9",
  eager = false,
  alt = "Logo QURMA",
}: BrandLogoProps) {
  return (
    <Image
      src={SOURCES[tone]}
      alt={alt}
      width={200}
      height={54}
      loading={eager ? "eager" : undefined}
      className={`w-auto object-contain ${className}`}
    />
  );
}
