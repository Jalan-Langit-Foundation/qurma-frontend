import * as React from "react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { getSavingStatus, type SavingStatusTone } from "../lib/saving-status";
import type { SavingStatus } from "../lib/types";

const TONE_VARIANT: Record<SavingStatusTone, BadgeProps["variant"]> = {
  info: "primary",
  warning: "warning",
  success: "success",
  neutral: "neutral",
};

export function SavingStatusBadge({ status }: { status: SavingStatus }) {
  const { label, tone } = getSavingStatus(status);
  return (
    <Badge variant={TONE_VARIANT[tone]} size="sm" dot>
      {label}
    </Badge>
  );
}
