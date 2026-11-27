"use client";

import * as React from "react";
import { closeOnBackdropClick, useModalDialog } from "@/hooks/use-modal-dialog";
import { Button } from "./button";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  icon?: React.ReactNode;
  cancelLabel?: string;
  children: React.ReactNode;
}

export function ConfirmDialog({
  open,
  onClose,
  title,
  description,
  icon,
  cancelLabel = "Batal",
  children,
}: ConfirmDialogProps) {
  const dialogRef = useModalDialog(open);
  const titleId = React.useId();
  const descriptionId = React.useId();

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClose={onClose}
      onClick={closeOnBackdropClick(onClose)}
      className="m-auto w-[min(24rem,calc(100vw-2rem))] rounded-3xl bg-white p-0 shadow-pop backdrop:bg-night/40 backdrop:backdrop-blur-sm open:animate-pop-in"
    >
      <div className="p-6">
        {icon && (
          <span
            aria-hidden="true"
            className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600"
          >
            {icon}
          </span>
        )}
        <h2
          id={titleId}
          className="font-heading text-lg font-semibold text-ink"
        >
          {title}
        </h2>
        <p id={descriptionId} className="mt-1.5 text-sm text-body">
          {description}
        </p>

        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="subtle" size="pill" onClick={onClose}>
            {cancelLabel}
          </Button>
          {children}
        </div>
      </div>
    </dialog>
  );
}
