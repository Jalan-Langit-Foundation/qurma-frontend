"use client";

import * as React from "react";
import Link from "next/link";
import { Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NAVBAR_CTA, NAVBAR_LINKS } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { isLinkActive } from "./navbar.utils";

type NavClickHandler = (
  event: React.MouseEvent<HTMLElement>,
  href: string,
) => void;

const variantStyles = {
  desktop: {
    list: "m-0 hidden h-full list-none items-center gap-4 p-0 md:flex lg:gap-6 xl:gap-7",
    item: "flex h-full items-center",
    link: "inline-flex items-center rounded-md px-1 py-2 leading-none",
  },
  mobile: {
    list: "m-0 flex list-none flex-col gap-1 p-0",
    item: "",
    link: "flex items-center rounded-md px-3 py-2",
  },
} as const;

interface NavLinksProps {
  variant: keyof typeof variantStyles;
  pathname: string;
  activeSection: string;
  onLinkClick: NavClickHandler;
}

export function NavLinks({
  variant,
  pathname,
  activeSection,
  onLinkClick,
}: NavLinksProps) {
  const styles = variantStyles[variant];

  return (
    <ul className={styles.list}>
      {NAVBAR_LINKS.map((link) => {
        const active = isLinkActive(link.href, pathname, activeSection);
        return (
          <li key={link.href} className={styles.item}>
            <Link
              href={link.href}
              onClick={(event) => onLinkClick(event, link.href)}
              aria-current={active ? "location" : undefined}
              className={cn(
                styles.link,
                "font-heading text-sm font-medium transition-colors duration-200",
                "hover:text-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                active ? "text-brand-strong" : "text-body",
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

interface NavbarCtaProps {
  onLinkClick: NavClickHandler;
  className?: string;
  buttonClassName?: string;
}

export function NavbarCta({
  onLinkClick,
  className,
  buttonClassName,
}: NavbarCtaProps) {
  return (
    <div
      className={className}
      onClickCapture={(event) => onLinkClick(event, NAVBAR_CTA.href)}
    >
      <Button
        variant="primary"
        size="md"
        href={NAVBAR_CTA.href}
        leftIcon={
          <Coins className="h-4 w-4 fill-white text-white" aria-hidden="true" />
        }
        className={cn(
          "font-semibold shadow-sm transition-all hover:shadow-md",
          buttonClassName,
        )}
      >
        {NAVBAR_CTA.label}
      </Button>
    </div>
  );
}
