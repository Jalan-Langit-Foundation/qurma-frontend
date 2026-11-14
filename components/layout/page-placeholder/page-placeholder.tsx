import * as React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MemberPage } from "../member-page/member-page";
import { PageHeader } from "../page-header/page-header";

export interface PagePlaceholderAction {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "outline";
}

export interface PagePlaceholderProps {
  eyebrow: string;
  title: string;

  heading?: string;
  description: string;
  icon?: React.ReactNode;
  backLink?: { href: string; label: string };
  actions?: PagePlaceholderAction[];
}

export function PagePlaceholder({
  eyebrow,
  title,
  heading = "Segera Hadir",
  description,
  icon,
  backLink,
  actions = [],
}: PagePlaceholderProps) {
  return (
    <MemberPage>
      <PageHeader eyebrow={eyebrow} title={title} backLink={backLink} />

      <Card className="border-2 border-dashed bg-white/60 p-8 text-center hover:shadow-sm">
        <div className="mx-auto flex max-w-md flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-soft text-brand-strong">
            {icon ?? <Clock className="h-6 w-6" aria-hidden="true" />}
          </div>
          <h2 className="font-heading text-lg font-semibold text-ink">
            {heading}
          </h2>
          <p className="text-sm text-body">{description}</p>

          {actions.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  variant={action.variant ?? "primary"}
                  size="sm"
                  href={action.href}
                  external={action.external}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </Card>
    </MemberPage>
  );
}
