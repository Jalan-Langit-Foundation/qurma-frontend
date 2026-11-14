import * as React from "react";

export function MemberContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-3 pt-6 sm:px-5 md:pt-10">
      {children}
    </div>
  );
}
