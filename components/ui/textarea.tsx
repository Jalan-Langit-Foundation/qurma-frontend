import * as React from "react";
import { cn } from "@/lib/utils";
import {
  FieldLabel,
  FieldMessage,
  fieldControlClass,
  getFieldAriaProps,
  useFieldIds,
} from "./field";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
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

        <textarea
          ref={ref}
          id={fieldId}
          className={cn(
            fieldControlClass(Boolean(error)),
            "min-h-[100px] resize-y",
            className,
          )}
          {...getFieldAriaProps({ messageId, error, helperText, describedBy })}
          {...props}
        />

        <FieldMessage id={messageId} error={error} helperText={helperText} />
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
