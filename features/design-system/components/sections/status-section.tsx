import * as React from "react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  InstallmentStatusBadge,
  type InstallmentStatus,
} from "@/features/savings";
import { DemoLabel, DemoSection } from "../demo-section";

const INSTALLMENT_STATUS_DEMO: {
  status: InstallmentStatus;
  isFinal: boolean;
}[] = [
  { status: "paid", isFinal: false },
  { status: "next", isFinal: false },
  { status: "scheduled", isFinal: false },
  { status: "scheduled", isFinal: true },
  { status: "overdue", isFinal: false },
];

const OTHER_STATUS_DEMO: {
  group: string;
  items: { label: string; variant: BadgeProps["variant"] }[];
}[] = [
  {
    group: "3 Tahap Persiapan",
    items: [
      { label: "Selesai", variant: "success" },
      { label: "Sedang Berjalan", variant: "warning" },
      { label: "Belum Dimulai", variant: "neutral" },
    ],
  },
  {
    group: "Status Penabung (Admin)",
    items: [
      { label: "Aktif", variant: "primary" },
      { label: "Lunas", variant: "success" },
      { label: "Terlambat", variant: "destructive" },
    ],
  },
];

export function StatusSection() {
  return (
    <DemoSection
      id="status-badge"
      eyebrow="Status"
      title="Badge Status"
      description="Selalu berupa teks, bukan warna saja (WCAG 1.4.1)."
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="space-y-3 p-5">
          <DemoLabel>Status Setoran</DemoLabel>
          {INSTALLMENT_STATUS_DEMO.map((demo) => (
            <div
              key={`${demo.status}-${demo.isFinal}`}
              className="flex items-center justify-between"
            >
              <span className="font-mono text-xs text-body">
                {demo.status}
                {demo.isFinal ? " (final)" : ""}
              </span>
              <InstallmentStatusBadge
                status={demo.status}
                isFinal={demo.isFinal}
                showIcon
              />
            </div>
          ))}
        </Card>
        {OTHER_STATUS_DEMO.map((group) => (
          <Card key={group.group} className="space-y-3 p-5">
            <DemoLabel>{group.group}</DemoLabel>
            {group.items.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <span className="text-xs text-body">{item.label}</span>
                <Badge variant={item.variant} size="sm" dot>
                  {item.label}
                </Badge>
              </div>
            ))}
          </Card>
        ))}
      </div>
    </DemoSection>
  );
}
