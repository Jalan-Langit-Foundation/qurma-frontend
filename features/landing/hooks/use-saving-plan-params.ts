"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { resolvePackage, type QurbanPackage } from "@/features/packages";

const PARAM_PACKAGE = "paket";
const PARAM_START_MONTH = "mulai";

export function useSavingPlanParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedPackage = resolvePackage(searchParams.get(PARAM_PACKAGE));
  const requestedStartMonth = searchParams.get(PARAM_START_MONTH);

  const updateParams = React.useCallback(
    (changes: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(changes))
        params.set(key, value);
      window.history.replaceState(
        null,
        "",
        `${pathname}?${params.toString()}${window.location.hash}`,
      );
    },
    [pathname, searchParams],
  );

  const selectPackage = React.useCallback(
    (pkg: QurbanPackage) => updateParams({ [PARAM_PACKAGE]: pkg.id }),
    [updateParams],
  );

  const selectStartMonth = React.useCallback(
    (month: string) => updateParams({ [PARAM_START_MONTH]: month }),
    [updateParams],
  );

  return {
    selectedPackage,
    requestedStartMonth,
    selectPackage,
    selectStartMonth,
  };
}
