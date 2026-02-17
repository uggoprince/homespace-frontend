"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/cn"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { Control, FieldValues, Path } from "react-hook-form"

export interface ComboboxOption {
  value: string
  label: string
}

interface FormComboboxProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  placeholder?: string
  searchPlaceholder?: string
  emptyMessage?: string
  options: ComboboxOption[]
  className?: string
  labelClassName?: string
  required?: boolean
  disabled?: boolean
  onValueChange?: (value: string) => void
}

export const FormCombobox = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  options,
  className,
  labelClassName,
  required = false,
  disabled = false,
  onValueChange,
}: FormComboboxProps<T>) => {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("mx-0.5", className)}>
          {label && <FormLabel className={labelClassName}>{label}</FormLabel>}
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <button
                  type="button"
                  role="combobox"
                  aria-expanded={open}
                  disabled={disabled}
                  className={cn(
                    "border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none md:text-sm",
                    "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    "dark:bg-input/30 flex items-center justify-between",
                    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <span className="truncate">
                    {field.value
                      ? options.find((o) => o.value === field.value)?.label ?? field.value
                      : placeholder}
                  </span>
                  <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
                </button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
              <Command>
                <CommandInput placeholder={searchPlaceholder} required={required} />
                <CommandList>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.label}
                        onSelect={() => {
                          const newValue = option.value === field.value ? "" : option.value
                          field.onChange(newValue)
                          onValueChange?.(newValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 size-4",
                            field.value === option.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
