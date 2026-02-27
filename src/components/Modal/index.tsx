import { XIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/Utils/cn";

interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: React.ComponentProps<typeof Button>["variant"];
  className?: string;
}

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;

  // Header — shown only when title is provided
  title?: string;
  headerClassName?: string;

  // Body
  bodyClassName?: string;

  // Footer — shown only when at least one footer prop is provided
  cancelLabel?: string;
  onCancel?: () => void;
  action?: ModalAction;
  footerClassName?: string;

  // Dialog content wrapper
  className?: string;
}

export default function Modal({
  open,
  onOpenChange,
  children,
  title,
  headerClassName,
  bodyClassName,
  cancelLabel,
  onCancel,
  action,
  footerClassName,
  className,
}: Readonly<ModalProps>) {
  const hasHeader = !!title;
  const hasFooter = !!(cancelLabel || action);

  // DialogContent hardcodes `sm:max-w-lg`; a plain `max-w-*` from className
  // won't override it across breakpoints, so we derive the sm: variant automatically.
  const maxWClass = className?.match(/\bmax-w-\S+/)?.[0];
  const smMaxW = maxWClass ? `sm:${maxWClass}` : 'sm:max-w-lg';

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={!hasHeader}
        className={cn('flex flex-col gap-0 p-0 max-h-[90vh]', smMaxW, className)}
      >
        {/* Header */}
        {hasHeader && (
          <DialogHeader
            className={cn(`flex-row items-center justify-between px-6 py-4 border-b shrink-0 space-y-0`, headerClassName ?? "")}
          >
            <DialogTitle>{title}</DialogTitle>
            <DialogClose className="rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:outline-hidden">
              <XIcon className="size-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
        )}

        {/* Scrollable body */}
        <div className={cn(`flex-1 overflow-y-auto px-6 py-4`, bodyClassName ?? "")}>
          {children}
        </div>

        {/* Footer */}
        {hasFooter && (
          <DialogFooter
            className={cn(`px-6 py-4 border-t shrink-0`, footerClassName ?? "")}
          >
            {cancelLabel && (
              <Button variant="outline" onClick={handleCancel}>
                {cancelLabel}
              </Button>
            )}
            {action && (
              <Button
                variant={action.variant ?? "default"}
                className={action.className}
                onClick={action.onClick}
              >
                {action.label}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
