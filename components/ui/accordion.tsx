"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string;
  question: string;
  answer: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];

  allowMultiple?: boolean;

  defaultOpenIds?: string[];

  headingAs?: "h2" | "h3" | "h4";
  className?: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  defaultOpenIds = [],
  headingAs: Heading = "h3",
  className,
}: AccordionProps) {
  const [openIds, setOpenIds] = React.useState<Set<string>>(
    () => new Set(defaultOpenIds),
  );

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={cn("w-full space-y-3.5", className)}>
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        const triggerId = `accordion-trigger-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              "overflow-hidden rounded-2xl border bg-white transition-colors duration-200",
              isOpen
                ? "border-slate-300/90 shadow-[0_12px_32px_rgba(0,0,0,0.07)]"
                : "border-slate-200/80 hover:border-slate-300/90",
            )}
          >
            <Heading className="font-heading text-base leading-snug font-bold text-ink">
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group/btn flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl p-5 text-left select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset sm:p-6"
              >
                <span
                  className={cn(
                    "transition-colors",
                    isOpen ? "text-brand-strong" : "text-ink",
                  )}
                >
                  {item.question}
                </span>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-5 w-5 shrink-0 transition-all duration-300",
                    isOpen
                      ? "rotate-180 text-brand-strong"
                      : "text-body group-hover/btn:text-brand-strong",
                  )}
                />
              </button>
            </Heading>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-slate-100 px-5 pt-1 pb-5 sm:px-6 sm:pb-6">
                  <div className="font-body text-xs leading-relaxed text-body sm:text-sm">
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
