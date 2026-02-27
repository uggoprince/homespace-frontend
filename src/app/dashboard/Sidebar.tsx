"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AgencyIcon, CollapseIcon, OverviewIcon, PropertyIcon } from "@/components/SVG/icons";
import { PATHS } from "@/Utils/paths";

const menuItems = [
  { label: "Overview", to: PATHS.dashboard, exact: true, Icon: OverviewIcon },
  { label: "My Agency", to: PATHS.dashboardAgency, exact: false, Icon: AgencyIcon },
  { label: "Properties", to: PATHS.dashboardProperties, exact: false, Icon: PropertyIcon },
];

export const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(
    () => globalThis.window !== undefined && globalThis.window.innerWidth < 768
  );
  const pathname = usePathname();

  const isActive = (to: string, exact: boolean) => {
    if (exact) return pathname === to;
    return pathname.startsWith(to);
  };

  return (
    <aside
      className={`${collapsed ? "w-20" : "w-64"} bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 h-full overflow-y-auto transition-all duration-300`}
    >
      <div className="p-4">
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-end mb-4 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
        >
          <CollapseIcon collapsed={collapsed} />
        </button>


        {/* Nav Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(item.to, item.exact)
                  ? "bg-indigo-600 text-white"
                  : "text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800"
              } ${collapsed ? "justify-center" : ""}`}
            >
              <item.Icon />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};
