"use client"

import { cn } from "@/lib/cn";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Control, FieldValues, Path } from "react-hook-form";

export interface SegmentOption {
  value: string;
  label: string;
  activeClassName?: string;
}

interface FormSegmentedControlProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  options: SegmentOption[];
}

export const FormSegmentedControl = <T extends FieldValues>({
  control,
  name,
  label,
  required = false,
  disabled = false,
  className,
  options,
}: FormSegmentedControlProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("mx-0.5", className)}>
          {label && <FormLabel>{label}{required && <span className="text-destructive"> *</span>}</FormLabel>}
          <FormControl>
            <div className="flex gap-2">
              {options.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  disabled={disabled}
                  onClick={() => field.onChange(opt.value)}
                  className={cn(
                    "flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors",
                    "disabled:pointer-events-none disabled:opacity-50",
                    field.value === opt.value
                      ? (opt.activeClassName ?? "bg-main-500 text-white")
                      : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
