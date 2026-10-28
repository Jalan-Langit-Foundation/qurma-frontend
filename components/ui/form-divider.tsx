import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function FormDivider({ className, children = "atau", ...props }: FormDividerProps) {
  return (
    <div className={cn("relative my-4 flex items-center justify-center", className)} {...props}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-slate-200" />
      </div>
      <div className="relative flex justify-center bg-white px-3 text-xs uppercase tracking-wider text-[#777777] font-['Poppins',sans-serif]">
        <span>{children}</span>
      </div>
    </div>
  );
}
