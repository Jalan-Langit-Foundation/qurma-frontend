"use client";

import { useSearchParams } from "next/navigation";

export function useAuthParams() {
  const searchParams = useSearchParams();
  return {
    next: searchParams.get("next"),
    expired: searchParams.get("expired") === "1",
  };
}
