import React from "react"
import Link from "next/link"
import {
  DropdownMenu as DropdownMenuRoot,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { cn } from "@/Utils/cn"

export type DropdownMenuItemConfig = {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  href?: string
  linkClassName?: string
  variant?: "default" | "destructive"
  separator?: boolean
  itemClassName?: string
}

type DropdownMenuProps = {
  menuList: DropdownMenuItemConfig[]
  trigger?: React.ReactNode
  triggerLabel?: string | React.ReactNode
  align?: "start" | "center" | "end"
}

export function DropdownMenu({
  menuList,
  trigger,
  triggerLabel = "Open",
  align = "end",
}: Readonly<DropdownMenuProps>) {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>
        {trigger ?? <button className="p-0 border-0 bg-transparent hover:bg-transparent text-sm font-medium">{triggerLabel}</button>}
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {menuList.map((item) => (
          <React.Fragment key={item.label}>
            {item.separator && <DropdownMenuSeparator />}
            <DropdownMenuItem
              variant={item.variant}
              onClick={item.onClick}
              asChild={!!item.href}
              className={cn("focus:bg-indigo-500 focus:text-white", item.itemClassName)}
            >
              {item.href ? (
                <Link href={item.href} className={cn("flex items-center gap-2", item.linkClassName)}>
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <div className={"flex items-center gap-2"}>
                  {item.icon}
                  {item.label}
                </div>
              )}
            </DropdownMenuItem>
          </React.Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenuRoot>
  )
}
