import * as React from "react";

export interface ExternalLinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "target" | "rel" | "href"
> {
  href: string;

  srHint?: string | false;
}

export const ExternalLink = React.forwardRef<
  HTMLAnchorElement,
  ExternalLinkProps
>(({ srHint = "tab baru", children, ...props }, ref) => (
  <a ref={ref} target="_blank" rel="noopener noreferrer" {...props}>
    {children}
    {srHint && !props["aria-label"] && (
      <span className="sr-only"> ({srHint})</span>
    )}
  </a>
));

ExternalLink.displayName = "ExternalLink";
