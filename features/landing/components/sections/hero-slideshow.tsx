"use client";

import * as React from "react";
import Image from "next/image";
import { useAutoPlay } from "@/hooks/use-autoplay";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "../../lib/content/hero";

interface HeroSlideshowProps {
  slides: readonly HeroSlide[];
  intervalMs: number;
}

export function HeroSlideshow({ slides, intervalMs }: HeroSlideshowProps) {
  const { currentIndex } = useAutoPlay({
    totalItems: slides.length,
    intervalMs,
  });
  const total = slides.length;
  const rendered = new Set([
    currentIndex,
    (currentIndex + 1) % total,
    (currentIndex - 1 + total) % total,
  ]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {slides.map((slide, index) => {
        if (!rendered.has(index)) return null;
        const isActive = index === currentIndex;

        return (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              isActive
                ? "z-0 opacity-100"
                : "pointer-events-none -z-10 opacity-0",
            )}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              preload={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        );
      })}

      <div className="pointer-events-none absolute inset-0 z-10 bg-black/50" />
    </div>
  );
}
