import * as React from "react";

export function AuthFieldset({
  legend,
  children,
}: {
  legend: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="min-w-0 space-y-4">
      <legend className="mb-4 font-heading text-xs font-semibold tracking-wider text-brand-strong uppercase">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}
