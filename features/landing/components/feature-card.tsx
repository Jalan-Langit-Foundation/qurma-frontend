import * as React from "react";
import { CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface FeatureCardItem {
  id: string;
  title: string;
  description: string;
  hashtag: string;
  step?: number;
}

const featureCardShellClass =
  "flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-colors hover:border-slate-300";

function CardHashtag({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-t border-slate-100 pt-3 font-heading text-xs font-semibold text-brand-strong">
      <span>{children}</span>
    </div>
  );
}

export function FeatureCard({
  item,
  className,
}: {
  item: FeatureCardItem;
  className?: string;
}) {
  return (
    <article className={cn(featureCardShellClass, className)}>
      <div className="flex flex-1 flex-col justify-between gap-4 bg-white p-5 sm:p-6">
        <div className={item.step ? "space-y-3" : "space-y-2.5"}>
          {item.step !== undefined && (
            <span
              className="block font-heading text-2xl leading-none font-extrabold text-brand"
              aria-hidden="true"
            >
              {String(item.step).padStart(2, "0")}
            </span>
          )}
          <CardTitle as="h3" size="base">
            {item.step !== undefined && (
              <span className="sr-only">Langkah {item.step}: </span>
            )}
            {item.title}
          </CardTitle>
          <p className="font-body text-xs leading-relaxed text-body sm:text-sm">
            {item.description}
          </p>
        </div>
        <CardHashtag>{item.hashtag}</CardHashtag>
      </div>
    </article>
  );
}
