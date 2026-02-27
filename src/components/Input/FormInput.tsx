"use client"

import React, { useState }  from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Control, FieldValues , Path } from "react-hook-form";


interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  prefix?: React.ReactNode;
}

export const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  labelClassName,
  inputClassName,
  type = "text",
  required = false,
  autoComplete,
  className,
  disabled = false,
  prefix,
}: FormInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (<FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className={cn(`mx-0.5`, className)}>
        {label && <FormLabel className={labelClassName}>{label}{required && <span className="text-destructive"> *</span>}</FormLabel>}
        <FormControl className="">
          <div className="relative">
            {prefix && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium text-sm pointer-events-none">
                {prefix}
              </span>
            )}
            <Input
              type={isPassword && showPassword ? "text" : type}
              className={cn(prefix && "pl-12", isPassword && "pr-10", inputClassName)}
              placeholder={placeholder}
              required={required}
              autoComplete={autoComplete}
              disabled={disabled}
              {...field}
            />
            {isPassword && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
              </button>
            )}
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />)
};
