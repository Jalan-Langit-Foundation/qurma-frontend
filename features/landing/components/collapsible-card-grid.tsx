"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";
import { FeatureCard, type FeatureCardItem } from "./feature-card";

const COLLAPSE_DURATION_MS = 300;

interface CollapsibleCardGridProps {
  items: readonly FeatureCardItem[];
  sectionId: string;
  initialVisible?: number;
}

export function CollapsibleCardGrid({
  items,
  sectionId,
  initialVisible = 2,
}: CollapsibleCardGridProps) {
  const listId = React.useId();
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isCollapsing, setIsCollapsing] = React.useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  const expand = () => setIsExpanded(true);

  const collapse = () => {
    setIsCollapsing(true);
    scrollToSection(sectionId);
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
      setIsCollapsing(false);
    }, COLLAPSE_DURATION_MS);
  };

  const visibilityClass = (index: number) => {
    if (isExpanded) {
      return isCollapsing
        ? "flex animate-slide-up lg:animate-none"
        : "flex animate-slide-down lg:animate-none";
    }
    return index < initialVisible ? "flex" : "hidden lg:flex";
  };

  return (
    <>
      <ul
        id={listId}
        className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {items.map((item, index) => (
          <li key={item.id} className={cn(visibilityClass(index), "flex-col")}>
            <FeatureCard item={item} className="w-full" />
          </li>
        ))}
      </ul>

      {items.length > initialVisible && (
        <div className="flex flex-wrap items-center justify-center gap-3 pt-8 sm:pt-10 lg:hidden">
          <Button
            variant="outline"
            size="md"
            onClick={isExpanded ? collapse : expand}
            aria-expanded={isExpanded}
            aria-controls={listId}
            rightIcon={
              isExpanded ? (
                <ChevronUp className="h-4 w-4" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              )
            }
            className="px-6 font-bold"
          >
            {isExpanded ? "Lihat Lebih Sedikit" : "Lihat Lebih Banyak"}
          </Button>
        </div>
      )}
    </>
  );
}
