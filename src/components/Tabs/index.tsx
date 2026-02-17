import { cn } from "@/lib/cn";
import { TabsList, TabsTrigger } from "../ui/tabs";

export const CustomTabList = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <TabsList 
      className={cn("flex gap-1 bg-slate-200/50 dark:bg-slate-900/50 p-1.5 rounded-xl w-fit h-auto", className)}>
      {children}
    </TabsList>
  );
};

export const CustomTabTrigger = ({ children, className, value }: {
  children: React.ReactNode;
  className?: string;
  value: string;
}) => (
  <TabsTrigger
    value={value}
    className={cn(
      "sm:px-5 px-4 py-2 rounded-lg font-medium capitalize transition-all",
      "data-[state=active]:bg-primary dark:data-[state=active]:bg-primary data-[state=active]:text-white dark:data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary-2/25",
      "data-[state=inactive]:text-slate-600 dark:data-[state=inactive]:text-slate-400 data-[state=inactive]:hover:text-slate-900 dark:data-[state=inactive]:hover:text-white data-[state=inactive]:hover:bg-slate-300/50 dark:data-[state=inactive]:hover:bg-slate-800/50",
      className,
    )}
  >
    {children}
  </TabsTrigger>
);