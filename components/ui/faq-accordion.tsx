"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useFaqAccordion } from "@/hooks";
import { CardTitle } from "./card";

export interface FaqItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
}

import { FAQ_CONTENT_ITEMS } from "@/content/landing/faq";

export const DEFAULT_FAQ_ITEMS: FaqItem[] = FAQ_CONTENT_ITEMS;

export interface FaqAccordionProps {
  items?: FaqItem[];
  allowMultiple?: boolean;
  defaultOpenIndexes?: number[];
  className?: string;
}

/**
 * FaqAccordion Component
 * Memenuhi spesifikasi T1.7:
 * - 8 item FAQ standar QURMA (dapat menerima item kustom via props).
 * - Fitur satu atau semua accordion dapat terbuka (allowMultiple).
 * - Aksesibel penuh dengan keyboard (Enter/Space), semantic heading, aria-expanded, aria-controls.
 * - Desain elegan khas Jalan Langit dengan border halus dan transisi mulus.
 */
export function FaqAccordion({
  items = DEFAULT_FAQ_ITEMS,
  allowMultiple = false,
  defaultOpenIndexes = [],
  className,
}: FaqAccordionProps) {
  const itemIds = React.useMemo(() => items.map((i) => i.id), [items]);
  const { isOpen: checkIsOpen, toggleItem } = useFaqAccordion({
    allowMultiple,
    defaultOpenIndexes,
    itemIds,
  });

  return (
    <div className={cn("w-full space-y-3.5", className)}>
      {items.map((item) => {
        const isOpen = checkIsOpen(item.id);
        const triggerId = `faq-trigger-${item.id}`;
        const contentId = `faq-content-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              "bg-white rounded-2xl border transition-colors duration-200 overflow-hidden",
              isOpen
                ? "border-slate-300/90 shadow-[0_12px_32px_rgba(0,0,0,0.07)]"
                : "border-slate-200/80 shadow-none hover:border-slate-300/90"
            )}
          >
            <CardTitle as="h3" size="base">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => toggleItem(item.id)}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none group/btn select-none"
              >
                <span
                  className={cn(
                    "transition-colors",
                    isOpen ? "text-[#3C95C8]" : "text-[#2C2C2C]"
                  )}
                >
                  {item.question}
                </span>

                <ChevronDown
                  className={cn(
                    "w-5 h-5 shrink-0 transition-all duration-300",
                    isOpen
                      ? "text-[#3C95C8] rotate-180"
                      : "text-[#555555] group-hover/btn:text-[#3C95C8]"
                  )}
                  aria-hidden="true"
                />
              </button>
            </CardTitle>

            {/* Konten Terbuka dengan Animasi Expand Halus dari Atas ke Bawah */}
            <div
              id={contentId}
              role="region"
              aria-labelledby={triggerId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 border-t border-slate-100">
                  <div className="text-xs sm:text-sm text-[#555555] font-['Lato',sans-serif] leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
