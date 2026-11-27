"use client";

import * as React from "react";
import { FALLBACK_PACKAGES } from "../lib/catalog";
import type { QurbanPackage } from "../lib/types";

const PackagesContext =
  React.createContext<readonly QurbanPackage[]>(FALLBACK_PACKAGES);

/** Bagikan daftar paket dari server (GET /program) ke komponen client. */
export function PackagesProvider({
  packages,
  children,
}: {
  packages: readonly QurbanPackage[];
  children: React.ReactNode;
}) {
  return (
    <PackagesContext.Provider value={packages}>
      {children}
    </PackagesContext.Provider>
  );
}

/** Daftar paket aktif. Di luar PackagesProvider → katalog lokal. */
export function usePackages(): readonly QurbanPackage[] {
  return React.useContext(PackagesContext);
}
