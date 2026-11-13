import * as React from "react";
import { cn } from "@/lib/utils";
import {
  FieldLabel,
  FieldMessage,
  fieldControlClass,
  getFieldAriaProps,
  useFieldIds,
} from "./field";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      "aria-describedby": describedBy,
      ...props
    },
    ref,
  ) => {
    const { fieldId, messageId } = useFieldIds(id);

    return (
      <div className="w-full space-y-1.5 font-body">
        {label && <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3.5 flex items-center justify-center text-muted">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={fieldId}
            type={type}
            className={cn(
              fieldControlClass(Boolean(error)),
              leftIcon && "pl-11",
              rightIcon && "pr-11",
              className,
            )}
            {...getFieldAriaProps({
              messageId,
              error,
              helperText,
              describedBy,
            })}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 flex items-center justify-center text-muted">
              {rightIcon}
            </div>
          )}
        </div>

        <FieldMessage id={messageId} error={error} helperText={helperText} />
      </div>
    );
  },
);

Input.displayName = "Input";
