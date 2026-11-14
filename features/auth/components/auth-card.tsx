import * as React from "react";
import { MAIN_CONTENT_ID, SkipLink } from "@/components/layout";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";
import { AuthTabs, type AuthMode } from "./auth-tabs";
import { AuthTopBar } from "./auth-top-bar";

interface AuthCardProps {
  mode: AuthMode;
  title: string;
  description: string;
  next: string | null;
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function AuthCard({
  mode,
  title,
  description,
  next,
  size = "sm",
  children,
}: AuthCardProps) {
  return (
    <div className="flex min-h-dvh flex-col bg-surface">
      <SkipLink />
      <AuthTopBar />

      <main
        id={MAIN_CONTENT_ID}
        className="flex flex-1 justify-center px-3 pt-2 pb-10 sm:px-6 sm:pt-6 sm:pb-14"
      >
        <div
          className={cn(
            "flex h-fit w-full flex-col gap-6 rounded-[28px] bg-white p-5 sm:p-8",
            size === "md" ? "max-w-[640px]" : "max-w-[460px]",
          )}
        >
          <AuthTabs mode={mode} next={next} />

          <div className="space-y-1.5">
            <h1 className="font-heading text-2xl font-semibold text-ink sm:text-[26px]">
              {title}
            </h1>
            <p className="text-sm text-body sm:text-[15px]">{description}</p>
          </div>

          {children}
        </div>
      </main>

      <footer className="pb-6 text-center text-xs text-muted sm:pb-8">
        Program tabungan qurban {SITE_CONFIG.legalName}
      </footer>
    </div>
  );
}
