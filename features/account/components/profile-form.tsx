"use client";

import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormAlert } from "@/components/ui/form-alert";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { useActionFeedback } from "@/hooks/use-action-feedback";
import { FIELD_LIMITS } from "@/lib/validation";
import { updateProfileAction } from "../actions";
import { profileSchema, type ProfileFormData } from "../lib/schemas";

const FIELDS = ["name", "email", "phone"] as const;

export function ProfileForm({
  defaultValues,
}: {
  defaultValues: ProfileFormData;
}) {
  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const { feedback, clearFeedback, run } = useActionFeedback({
    setError,
    fields: FIELDS,
  });

  const onSubmit = (data: ProfileFormData) =>
    run(() => updateProfileAction(data), {
      onSuccess: ({ data: user }) =>
        reset({ name: user.name, email: user.email, phone: user.phone }),
    });

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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            id="profile-name"
            maxLength={FIELD_LIMITS.name}
            label="Nama Lengkap"
            autoComplete="name"
            disabled={isSubmitting}
            leftIcon={<UserRound className="h-4 w-4" aria-hidden="true" />}
            error={errors.name?.message}
            {...register("name")}
          />
        </div>
        <Input
          id="profile-email"
          maxLength={FIELD_LIMITS.email}
          type="email"
          label="Alamat Email"
          autoComplete="email"
          disabled={isSubmitting}
          leftIcon={<Mail className="h-4 w-4" aria-hidden="true" />}
          error={errors.email?.message}
          {...register("email")}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field }) => (
            <PhoneInput
              id="profile-phone"
              label="Nomor WhatsApp"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
              disabled={isSubmitting}
              error={errors.phone?.message}
            />
          )}
        />
      </div>

      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          disabled={!isDirty || isSubmitting}
          onClick={() => {
            reset();
            clearFeedback();
          }}
        >
          Batalkan
        </Button>
        <Button type="submit" isLoading={isSubmitting} disabled={!isDirty}>
          Simpan Perubahan
        </Button>
      </div>
    </form>
  );
}
