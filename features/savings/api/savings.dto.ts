import { z } from "zod";
import { apiNumber, apiYearMonth } from "@/lib/api/response-schema";

const savingStatusDtoSchema = z.enum([
  "active",
  "overdue",
  "completed",
  "cancelled",
]);

const scheduleStatusDtoSchema = z.enum([
  "paid",
  "overdue",
  "next",
  "scheduled",
]);

const journeyMilestonesDtoSchema = z.object({
  target_selected: z.boolean(),
  saving_started: z.boolean(),
  half_reached: z.boolean(),
  target_reached: z.boolean(),
  animal_prepared: z.boolean(),
  qurban_done: z.boolean(),
  report_received: z.boolean(),
});

export const savingSummaryDtoSchema = z.object({
  id: z.number(),
  package: z.object({ code: z.string(), name: z.string() }),
  program_year: z.number(),
  status: savingStatusDtoSchema,
  target_amount: apiNumber,
  total_paid: apiNumber,
  paid_this_month: apiNumber,
  remaining_amount: apiNumber,
  progress_percent: apiNumber,
  tenor_months: z.number(),
  start_month: apiYearMonth,
  end_month: apiYearMonth,
  monthly_amount: apiNumber,
  last_installment_amount: apiNumber,
  next_installment: z
    .object({ month: apiYearMonth, amount: apiNumber })
    .nullable(),
  journey: journeyMilestonesDtoSchema,
});
export type SavingSummaryDto = z.infer<typeof savingSummaryDtoSchema>;

export const scheduleItemDtoSchema = z.object({
  installment_no: z.number(),
  month: apiYearMonth,
  amount: apiNumber,
  paid_amount: apiNumber,
  remaining_amount: apiNumber,
  status: scheduleStatusDtoSchema,
  is_final: z.boolean(),
});
export type ScheduleItemDto = z.infer<typeof scheduleItemDtoSchema>;

export const depositItemDtoSchema = z.object({
  id: z.number(),
  amount: apiNumber,
  paid_at: z.string().min(1),
  note: z.string().nullable(),
});
export type DepositItemDto = z.infer<typeof depositItemDtoSchema>;

export const savingDepositsDtoSchema = z.object({
  saving_id: z.number(),
  target_amount: apiNumber,
  total_paid: apiNumber,
  schedule: z.array(scheduleItemDtoSchema),
  deposits: z.array(depositItemDtoSchema),
});
export type SavingDepositsDto = z.infer<typeof savingDepositsDtoSchema>;

export const savingResponseDtoSchema = z.object({
  saving: savingSummaryDtoSchema,
});

export interface CreateSavingRequestDto {
  package_code: string;
  start_month: string;
  tenor_months: number;
}
