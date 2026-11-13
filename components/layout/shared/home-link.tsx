"use client";

import * as React from "react";
import Link from "next/link";
import { ROUTES } from "@/config/navigation";
import { scrollToTop } from "@/lib/scroll";

type HomeLinkProps = Omit<React.ComponentProps<typeof Link>, "href"> & {
  onNavigateHome?: () => void;
};

export function HomeLink({ onClick, onNavigateHome, ...props }: HomeLinkProps) {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || window.location.pathname !== ROUTES.home)
      return;

    event.preventDefault();
    scrollToTop();
    window.history.pushState(null, "", ROUTES.home);
    onNavigateHome?.();
  };

  return <Link href={ROUTES.home} onClick={handleClick} {...props} />;
}
