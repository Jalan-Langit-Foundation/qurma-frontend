"use client";

import * as React from "react";
import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { ACTION_NETWORK_ERROR } from "@/lib/api/api-error";
import { applyFieldErrors } from "@/lib/forms/apply-field-errors";

export type FormFeedback = {
  variant: "success" | "error" | "info";
  message: string;
} | null;

type ActionSuccess = { ok: true; message: string };
type ActionFailure = {
  ok: false;
  message: string;
  fieldErrors?: Record<string, string>;
};

type ActionResult = ActionSuccess | ActionFailure | void;

interface UseActionFeedbackOptions<T extends FieldValues> {
  initial?: FormFeedback;
  setError?: UseFormSetError<T>;
  fields?: readonly Path<T>[];
}

interface RunOptions<R extends ActionResult> {
  onSuccess?: (result: Extract<R, { ok: true }>) => void;

  toFeedback?: (failure: Extract<R, { ok: false }>) => FormFeedback;
}

export function useActionFeedback<T extends FieldValues = FieldValues>({
  initial = null,
  setError,
  fields,
}: UseActionFeedbackOptions<T> = {}) {
  const [feedback, setFeedback] = React.useState<FormFeedback>(initial);

  const clearFeedback = React.useCallback(() => setFeedback(null), []);

  const run = React.useCallback(
    async <R extends ActionResult>(
      action: () => Promise<R>,
      options: RunOptions<R> = {},
    ): Promise<void> => {
      setFeedback(null);

      let result: R;
      try {
        result = await action();
      } catch {
        setFeedback({ variant: "error", message: ACTION_NETWORK_ERROR });
        return;
      }

      if (!result) return;

      if (result.ok) {
        setFeedback({ variant: "success", message: result.message });
        options.onSuccess?.(result as Extract<R, { ok: true }>);
        return;
      }

      const failure = result as Extract<R, { ok: false }>;
      setFeedback(
        options.toFeedback?.(failure) ?? {
          variant: "error",
          message: failure.message,
        },
      );
      if (setError && fields) {
        applyFieldErrors(failure.fieldErrors, fields, setError);
      }
    },
    [setError, fields],
  );

  return { feedback, clearFeedback, run };
}
