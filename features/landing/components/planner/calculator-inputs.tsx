"use client";

import * as React from "react";
import { formatWeightRange, type QurbanPackage } from "@/features/packages";
import {
  resolveDepositCount,
  SAVINGS_PROGRAM,
  type DepositCount,
} from "@/features/savings";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { PLANNER_CONTENT } from "../../lib/content/planner";
import { IndexNumber } from "../section-intro";

interface CalculatorInputsProps {
  packages: readonly QurbanPackage[];
  selectedPackage: QurbanPackage;
  depositCount: DepositCount;
  onSelectPackage?: (pkg: QurbanPackage) => void;
  onSelectDepositCount?: (count: DepositCount) => void;
}

const COUNT_OPTIONS = SAVINGS_PROGRAM.depositCountOptions;
const minCount = COUNT_OPTIONS[0];
const maxCount = COUNT_OPTIONS[COUNT_OPTIONS.length - 1] ?? minCount;

function Legend({
  index,
  children,
  as: Tag = "legend",
}: {
  index: number;
  children: string;
  as?: "legend" | "span";
}) {
  return (
    <Tag className="flex items-baseline gap-3 font-heading text-base font-bold text-ink">
      <IndexNumber value={index} />
      {children}
    </Tag>
  );
}

const optionClass =
  "relative flex cursor-pointer rounded-2xl border bg-white transition-colors duration-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand has-[:focus-visible]:ring-offset-2";

export function CalculatorInputs({
  packages,
  selectedPackage,
  depositCount,
  onSelectPackage,
  onSelectDepositCount,
}: CalculatorInputsProps) {
  const content = PLANNER_CONTENT.calculator;
  const sliderId = React.useId();
  const fillPercent =
    maxCount === minCount
      ? 100
      : ((depositCount - minCount) / (maxCount - minCount)) * 100;

  return (
    <div className="flex flex-col gap-10 rounded-[28px] bg-surface p-6 sm:p-8 lg:p-10">
      <fieldset>
        <Legend index={1}>{content.packageLegend}</Legend>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {packages.map((pkg) => {
            const checked = pkg.id === selectedPackage.id;
            return (
              <label
                key={pkg.id}
                className={cn(
                  optionClass,
                  "items-center justify-between gap-x-3 px-4 py-3.5 sm:flex-col sm:items-start sm:justify-start sm:p-4",
                  checked
                    ? "border-brand ring-1 ring-brand"
                    : "border-transparent hover:border-line",
                )}
              >
                <input
                  type="radio"
                  name="kalkulator-paket"
                  value={pkg.id}
                  checked={checked}
                  onChange={() => onSelectPackage?.(pkg)}
                  className="sr-only"
                />
                <span className="flex flex-col">
                  <span className="font-heading text-base font-bold text-ink">
                    {pkg.name}
                  </span>
                  <span className="mt-0.5 font-body text-xs text-muted sm:hidden">
                    {formatWeightRange(pkg)}
                  </span>
                </span>
                <span className="font-heading text-sm font-semibold text-brand-strong sm:mt-1">
                  {formatRupiah(pkg.target)}
                </span>
                <span className="mt-0.5 hidden font-body text-xs text-muted sm:block">
                  {formatWeightRange(pkg)}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={sliderId}>
            <Legend index={2} as="span">
              {content.countLegend}
            </Legend>
          </label>
          <p aria-hidden="true" className="font-heading text-ink tabular-nums">
            <span className="text-3xl leading-none font-extrabold sm:text-4xl">
              {depositCount}
            </span>{" "}
            <span className="text-sm font-semibold text-muted">
              {content.countUnit}
            </span>
          </p>
        </div>

        <input
          id={sliderId}
          type="range"
          min={minCount}
          max={maxCount}
          step={1}
          value={depositCount}
          onChange={(event) =>
            onSelectDepositCount?.(resolveDepositCount(event.target.value))
          }
          aria-valuetext={`${depositCount} ${content.countUnit} setoran`}
          style={{
            background: `linear-gradient(to right, var(--color-brand) ${fillPercent}%, var(--color-line) ${fillPercent}%)`,
          }}
          className={cn(
            "mt-5 h-2 w-full cursor-pointer appearance-none rounded-full outline-none",
            "focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 focus-visible:ring-offset-surface",
            "[&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-brand-sm [&::-webkit-slider-thumb]:transition-transform active:[&::-webkit-slider-thumb]:scale-110",
            "[&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-4 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-brand [&::-moz-range-thumb]:shadow-brand-sm",
          )}
        />

        <ol
          aria-hidden="true"
          className="mt-3 flex justify-between font-heading text-xs font-semibold text-muted tabular-nums"
        >
          {SAVINGS_PROGRAM.depositCountOptions.map((count) => (
            <li
              key={count}
              className={cn(
                "w-7 text-center",
                count === depositCount && "text-brand-strong",
              )}
            >
              {count}×
            </li>
          ))}
        </ol>

        <p className="mt-4 font-body text-xs leading-relaxed text-muted sm:text-sm">
          {content.roundingHint}
        </p>
      </div>

      <dl className="mt-auto divide-y divide-line border-y border-line font-body text-sm">
        <div className="flex items-baseline justify-between gap-4 py-3">
          <dt className="text-muted">Target bobot</dt>
          <dd className="font-heading font-semibold text-ink">
            {formatWeightRange(selectedPackage)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between gap-4 py-3">
          <dt className="text-muted">Keterangan</dt>
          <dd className="text-right font-heading font-semibold text-ink">
            {selectedPackage.note}
          </dd>
        </div>
      </dl>
    </div>
  );
}
