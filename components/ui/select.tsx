"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

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

/**
 * Select Component
 * Dropdown kustom resmi sesuai design system & branding Yayasan Jalan Langit:
 * - Trigger dengan chevron icon modern (bisa rotasi dinamis saat dropdown terbuka)
 * - Popup listbox dengan elevasi halus, highlight brand soft (#EAF5FB), dan checkmark aktif
 * - Ramah aksesibilitas (WAI-ARIA combobox/listbox, keyboard navigation, click outside listener)
 */
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
    ref
  ) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    const [uncontrolledValue, setUncontrolledValue] = React.useState<string>(
      defaultValue || options[0]?.value || ""
    );
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    const isControlled = controlledValue !== undefined;
    const activeValue = isControlled ? controlledValue : uncontrolledValue;

    const selectedOption = React.useMemo(
      () => options.find((opt) => opt.value === activeValue),
      [options, activeValue]
    );

    // Tutup dropdown saat klik di luar area
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    const handleSelect = (val: string) => {
      if (disabled) return;
      if (!isControlled) {
        setUncontrolledValue(val);
      }
      onChange?.(val);
      setIsOpen(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const currentIndex = options.findIndex((opt) => opt.value === activeValue);
          const nextIndex = (currentIndex + 1) % options.length;
          handleSelect(options[nextIndex].value);
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const currentIndex = options.findIndex((opt) => opt.value === activeValue);
          const prevIndex = (currentIndex - 1 + options.length) % options.length;
          handleSelect(options[prevIndex].value);
        }
      }
    };

    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full space-y-1.5 font-['Lato',sans-serif] relative",
          isOpen && "z-40",
          className
        )}
      >
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-semibold text-[#2C2C2C] font-['Poppins',sans-serif]"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {/* Hidden input for form submits */}
          {name && <input type="hidden" name={name} value={activeValue} />}

          {/* Trigger Button */}
          <button
            id={selectId}
            type="button"
            disabled={disabled}
            onClick={() => !disabled && setIsOpen((prev) => !prev)}
            onKeyDown={handleKeyDown}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            className={cn(
              "w-full px-4 py-2.5 rounded-xl border bg-white text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-between gap-3 text-left cursor-pointer select-none",
              "border-slate-200/80 hover:border-slate-300",
              isOpen
                ? "border-[#3C95C8] ring-2 ring-[#3C95C8]/20 shadow-xs"
                : "focus:border-[#3C95C8] focus:ring-1 focus:ring-[#3C95C8]",
              disabled && "opacity-50 cursor-not-allowed bg-slate-50",
              error && "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20"
            )}
          >
            <span
              className={cn(
                "truncate",
                selectedOption ? "text-[#2C2C2C]" : "text-slate-400"
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>

            {/* Arrow ke bawah (ChevronDown) dengan rotasi dinamis */}
            <ChevronDown
              className={cn(
                "w-4 h-4 text-[#777777] shrink-0 transition-transform duration-200",
                isOpen && "rotate-180 text-[#3C95C8]"
              )}
              aria-hidden="true"
            />
          </button>

          {/* Popup Dropdown Listbox (Maksimal 3 opsi tampak, opsi lainnya di-scroll tanpa scrollbar visual) */}
          {isOpen && (
            <div
              role="listbox"
              tabIndex={-1}
              className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-xl border border-slate-200/80 shadow-[0_8px_24px_rgba(60,149,200,0.12)] overflow-y-auto max-h-[130px] py-1 animate-in fade-in-0 zoom-in-95 duration-150 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
            >
              {options.map((option) => {
                const isSelected = option.value === activeValue;
                return (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    className={cn(
                      "px-4 py-2.5 text-xs sm:text-sm flex items-center justify-between gap-3 cursor-pointer transition-colors select-none",
                      isSelected
                        ? "bg-[#EAF5FB] text-[#3C95C8] font-bold"
                        : "text-[#2C2C2C] hover:bg-[#EAF5FB]/60 hover:text-[#3C95C8]",
                      option.disabled && "opacity-40 cursor-not-allowed pointer-events-none"
                    )}
                  >
                    <div className="flex flex-col">
                      <span>{option.label}</span>
                      {option.description && (
                        <span className="text-[11px] text-[#777777] font-normal mt-0.5">
                          {option.description}
                        </span>
                      )}
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-[#3C95C8] shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-xs text-rose-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-[#777777]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = "Select";
