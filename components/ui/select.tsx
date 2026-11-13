"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  FieldLabel,
  FieldMessage,
  fieldControlClass,
  getFieldAriaProps,
  useFieldIds,
} from "./field";

export interface SelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface SelectProps {
  id?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  disabled?: boolean;
  className?: string;
}

function findEnabledIndex(
  options: SelectOption[],
  from: number,
  step: 1 | -1,
): number {
  for (let i = 1; i <= options.length; i++) {
    const index = (from + step * i + options.length) % options.length;
    if (!options[index]?.disabled) return index;
  }
  return -1;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      id,
      name,
      value: controlledValue,
      defaultValue,
      onChange,
      options,
      placeholder = "Pilih salah satu...",
      label,
      error,
      helperText,
      disabled = false,
      className,
    },
    ref,
  ) => {
    const { fieldId, labelId, messageId } = useFieldIds(id);
    const listboxId = `${fieldId}-listbox`;
    const optionId = (index: number) => `${fieldId}-option-${index}`;

    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(
      ref,
      () => containerRef.current as HTMLDivElement,
    );

    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      defaultValue ?? options[0]?.value ?? "",
    );
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeIndex, setActiveIndex] = React.useState(-1);

    const isControlled = controlledValue !== undefined;
    const selectedValue = isControlled ? controlledValue : uncontrolledValue;
    const selectedIndex = options.findIndex(
      (option) => option.value === selectedValue,
    );
    const selectedOption =
      selectedIndex >= 0 ? options[selectedIndex] : undefined;

    const open = () => {
      if (disabled) return;
      setIsOpen(true);
      setActiveIndex(
        selectedIndex >= 0 ? selectedIndex : findEnabledIndex(options, -1, 1),
      );
    };

    const close = () => {
      setIsOpen(false);
      setActiveIndex(-1);
    };

    const commit = (index: number) => {
      const option = options[index];
      if (!option || option.disabled) return;
      if (!isControlled) setUncontrolledValue(option.value);
      if (option.value !== selectedValue) onChange?.(option.value);
      close();
    };

    React.useEffect(() => {
      if (!isOpen) return;
      const handlePointerDown = (event: PointerEvent) => {
        if (!containerRef.current?.contains(event.target as Node)) close();
      };
      document.addEventListener("pointerdown", handlePointerDown);
      return () =>
        document.removeEventListener("pointerdown", handlePointerDown);
    }, [isOpen]);

    React.useEffect(() => {
      if (!isOpen || activeIndex < 0) return;
      document
        .getElementById(`${fieldId}-option-${activeIndex}`)
        ?.scrollIntoView({ block: "nearest" });
    }, [fieldId, isOpen, activeIndex]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (!isOpen) {
        if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
          event.preventDefault();
          open();
        }
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setActiveIndex((prev) => findEnabledIndex(options, prev, 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          setActiveIndex((prev) =>
            findEnabledIndex(options, prev < 0 ? options.length : prev, -1),
          );
          break;
        case "Home":
          event.preventDefault();
          setActiveIndex(findEnabledIndex(options, -1, 1));
          break;
        case "End":
          event.preventDefault();
          setActiveIndex(findEnabledIndex(options, options.length, -1));
          break;
        case "Enter":
        case " ":
          event.preventDefault();
          commit(activeIndex);
          break;
        case "Escape":
          event.preventDefault();
          close();
          break;
        case "Tab":
          close();
          break;
      }
    };

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full space-y-1.5 font-body",
          isOpen && "z-40",
          className,
        )}
      >
        {label && (
          <FieldLabel htmlFor={fieldId} id={labelId}>
            {label}
          </FieldLabel>
        )}

        <div className="relative">
          {name && <input type="hidden" name={name} value={selectedValue} />}

          <button
            id={fieldId}
            type="button"
            role="combobox"
            disabled={disabled}
            onClick={() => (isOpen ? close() : open())}
            onKeyDown={handleKeyDown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-controls={listboxId}
            aria-activedescendant={
              isOpen && activeIndex >= 0 ? optionId(activeIndex) : undefined
            }
            {...getFieldAriaProps({ messageId, error, helperText })}
            className={cn(
              fieldControlClass(Boolean(error)),
              "flex cursor-pointer select-none items-center justify-between gap-3 text-left",
              isOpen && !error && "border-brand shadow-xs ring-2 ring-brand/20",
            )}
          >
            <span
              className={cn(
                "truncate",
                selectedOption ? "text-ink" : "text-slate-400",
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
                isOpen && "rotate-180 text-brand-strong",
              )}
              aria-hidden="true"
            />
          </button>

          {isOpen && (
            <ul
              id={listboxId}
              role="listbox"
              aria-labelledby={label ? labelId : undefined}
              className="absolute top-full right-0 left-0 z-50 mt-1.5 max-h-[130px] overflow-y-auto scrollbar-none rounded-xl border border-slate-200/80 bg-white py-1 shadow-brand"
            >
              {options.map((option, index) => {
                const isSelected = index === selectedIndex;
                const isActive = index === activeIndex;

                return (
                  <li
                    key={option.value}
                    id={optionId(index)}
                    role="option"
                    aria-selected={isSelected}
                    aria-disabled={option.disabled || undefined}
                    onMouseDown={(event) => event.preventDefault()}
                    onMouseEnter={() =>
                      !option.disabled && setActiveIndex(index)
                    }
                    onClick={() => commit(index)}
                    className={cn(
                      "flex cursor-pointer select-none items-center justify-between gap-3 px-4 py-2.5 text-xs transition-colors sm:text-sm",
                      isSelected ? "font-bold text-brand-strong" : "text-ink",
                      (isSelected || isActive) && "bg-brand-soft",
                      isActive && !isSelected && "text-brand-strong",
                      option.disabled &&
                        "pointer-events-none cursor-not-allowed opacity-40",
                    )}
                  >
                    <span className="flex flex-col">
                      <span>{option.label}</span>
                      {option.description && (
                        <span className="mt-0.5 text-[11px] font-normal text-muted">
                          {option.description}
                        </span>
                      )}
                    </span>
                    {isSelected && (
                      <Check
                        className="h-4 w-4 shrink-0 text-brand-strong"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <FieldMessage id={messageId} error={error} helperText={helperText} />
      </div>
    );
  },
);

Select.displayName = "Select";
