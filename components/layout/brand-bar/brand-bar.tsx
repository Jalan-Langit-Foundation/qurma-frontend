import * as React from "react";
import { cn } from "@/lib/utils";

interface BrandBarProps {
  start?: React.ReactNode;
  center?: React.ReactNode;
  end?: React.ReactNode;
  className?: string;
}

export function BrandBar({ start, center, end, className }: BrandBarProps) {
  return (
    <header
      className={cn(
        "relative z-10 mx-auto grid w-full max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:px-8 sm:py-5",
        className,
      )}
    >
      <div className="justify-self-start">{start}</div>
      <div>{center}</div>
      <div className="justify-self-end">{end}</div>
    </header>
  );
}
