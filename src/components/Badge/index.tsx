import { cn } from "@/Utils/cn";
import { Badge } from "../ui/badge";

export const StatusBadge = ({ status, className }: { status: string, className?: string }) => {
  const isActive = status?.toLowerCase() === "active" || status === "available" || status === "published";
  return (
    <Badge
      variant="ghost"
      className={cn("capitalize",
        className,
        isActive ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2.5" :
          "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2.5")}
    >
      {isActive ? status : "Pending"}
    </Badge>
  );
};