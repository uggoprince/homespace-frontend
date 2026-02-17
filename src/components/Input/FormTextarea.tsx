"use client"

import { cn } from "@/lib/cn";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { Control, FieldValues, Path } from "react-hook-form";

interface FormTextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
}

export const FormTextarea = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  required = false,
  disabled = false,
  rows = 4,
}: FormTextareaProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("mx-0.5", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea
              placeholder={placeholder}
              required={required}
              disabled={disabled}
              rows={rows}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
