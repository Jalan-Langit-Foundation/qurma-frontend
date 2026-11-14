"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { PasswordInput } from "@/components/ui/password-input";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import { FIELD_LIMITS, PASSWORD_MIN_LENGTH } from "@/lib/validation";
import { changePasswordAction } from "../actions";
import {
  changePasswordSchema,
  type ChangePasswordFormData,
} from "../lib/schemas";

const FIELDS = [
  "current_password",
  "password",
  "password_confirmation",
] as const;
const EMPTY: ChangePasswordFormData = {
  current_password: "",
  password: "",
  password_confirmation: "",
};

export function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: EMPTY,
  });

  const { feedback, clearFeedback, run } = useActionFeedback({
    setError,
    fields: FIELDS,
  });

  const onSubmit = (data: ChangePasswordFormData) =>
    run(() => changePasswordAction(data), { onSuccess: () => reset(EMPTY) });

  return (
    <form
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4"
    >
      {feedback && (
        <FormAlert
          variant={feedback.variant}
          message={feedback.message}
          onDismiss={clearFeedback}
        />
      )}

      <PasswordInput
        id="current-password"
        maxLength={FIELD_LIMITS.password}
        label="Kata Sandi Saat Ini"
        autoComplete="current-password"
        disabled={isSubmitting}
        error={errors.current_password?.message}
        {...register("current_password")}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <PasswordInput
          id="new-password"
          maxLength={FIELD_LIMITS.newPassword}
          label="Kata Sandi Baru"
          autoComplete="new-password"
          helperText={`${PASSWORD_MIN_LENGTH}–${FIELD_LIMITS.newPassword} karakter.`}
          disabled={isSubmitting}
          error={errors.password?.message}
          {...register("password")}
        />
        <PasswordInput
          id="new-password-confirmation"
          maxLength={FIELD_LIMITS.newPassword}
          label="Ulangi Kata Sandi Baru"
          autoComplete="new-password"
          disabled={isSubmitting}
          error={errors.password_confirmation?.message}
          {...register("password_confirmation")}
        />
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="w-full sm:w-auto"
        >
          Ganti Kata Sandi
        </Button>
      </div>
    </form>
  );
}
