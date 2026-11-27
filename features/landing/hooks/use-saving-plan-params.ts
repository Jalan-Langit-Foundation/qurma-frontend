"use client";

import * as React from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  resolvePackage,
  usePackages,
  type QurbanPackage,
} from "@/features/packages";
import { resolveDepositCount, type DepositCount } from "@/features/savings";

const PARAM_PACKAGE = "paket";
const PARAM_DEPOSIT_COUNT = "setoran";

export function useSavingPlanParams() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const packages = usePackages();

  const selectedPackage = resolvePackage(
    packages,
    searchParams.get(PARAM_PACKAGE),
  );
  const depositCount = resolveDepositCount(
    searchParams.get(PARAM_DEPOSIT_COUNT),
  );

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

  const selectDepositCount = React.useCallback(
    (count: DepositCount) =>
      updateParams({ [PARAM_DEPOSIT_COUNT]: String(count) }),
    [updateParams],
  );

  return {
    selectedPackage,
    depositCount,
    selectPackage,
    selectDepositCount,
  };
}
