import { z } from "zod";
import {
  savingSummaryDtoSchema,
  scheduleItemDtoSchema,
} from "@/features/savings/server";
import { apiNumber, apiYearMonth } from "@/lib/api/response-schema";

const packagePriceDtoSchema = z.object({
  code: z.string(),
  name: z.string(),
  price: apiNumber,
});
export type PackagePriceDto = z.infer<typeof packagePriceDtoSchema>;

const schedulePositionStatusDtoSchema = z.enum([
  "not_started",
  "behind",
  "on_track",
  "ahead",
  "completed",
]);

const dashboardInsightsDtoSchema = z.object({
  month_summary: z.object({
    month: apiYearMonth,
    installment: scheduleItemDtoSchema
      .pick({
        amount: true,
        paid_amount: true,
        remaining_amount: true,
        status: true,
      })
      .nullable(),
    deposited: apiNumber,
  }),
  daily_estimate: apiNumber,
  schedule_position: z.object({
    status: schedulePositionStatusDtoSchema,
    amount_behind: apiNumber,
    months_ahead: z.number(),
  }),
  upgrade_suggestion: z
    .object({
      from: packagePriceDtoSchema,
      to: packagePriceDtoSchema,
      additional_amount: apiNumber,
    })
    .nullable(),
});
export type DashboardInsightsDto = z.infer<typeof dashboardInsightsDtoSchema>;

export const dashboardDtoSchema = z.object({
  savings_count: z.number(),
  has_saving: z.boolean(),
  saving: savingSummaryDtoSchema.nullable(),
  insights: dashboardInsightsDtoSchema.nullable(),
});
export type DashboardDto = z.infer<typeof dashboardDtoSchema>;
