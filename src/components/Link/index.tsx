import { cn } from "@/lib/cn";
import Link from "next/link";
import { ComponentType } from "react";

interface LinkProps {
  Icon: ComponentType;
  text: string;
  to: string;
  className?: string;
}

export const CustomLink = (props: LinkProps) => {
  const { Icon, text, to = "#", className } = props;
  return (
    <Link
      href={to}
      className={cn(`inline-flex items-center gap-2 bg-main-600 hover:bg-main-700 
        text-white px-4 py-2.5 
        rounded-lg font-medium transition-colors text-sm`, className)}
    >
      {Icon && <Icon />}
      {text}
    </Link>);
};

export const AddLink = (props: LinkProps) => {
  const { Icon, text, to = "#", className } = props;
  return (
    <CustomLink Icon={Icon} text={text} to={to} className={className} />
  );
}