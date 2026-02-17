import React from "react";
import { Form } from "../ui/form";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { cn } from "@/lib/cn";

type CustomFormProps<T extends FieldValues = FieldValues> = UseFormReturn<T> & {
    children: React.ReactNode;
    onSubmit: (data: T) => void;
    className?: string;
};

export const CustomForm = <T extends FieldValues = FieldValues>({
  children,
  onSubmit,
  className,
  ...formProps
}: CustomFormProps<T>) => {
  return (
    <Form {...formProps}>
      <form onSubmit={formProps.handleSubmit(onSubmit)}
        className={cn(`
        mx-auto bg-white dark:bg-slate-950 dark:text-white rounded-lg p-6
        shadow-2xl dark:shadow-slate-500 flex flex-col gap-4 w-full`, className)}>
        {children}
      </form>
    </Form>
  );
};