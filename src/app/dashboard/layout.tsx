"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { Sidebar } from "./Sidebar";

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mounted = useIsMounted();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (mounted && !auth?.isAuthenticated) {
      router.replace("/login");
    }
  }, [mounted, auth?.isAuthenticated, router]);

  if (!mounted || !auth?.isAuthenticated) {
    return null;
  }

  return (
    <div className="fixed top-(--header-height,57px) left-0 right-0 bottom-0 flex bg-gray-100 dark:bg-slate-900 transition-colors">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="relative h-auto py-6 container mx-auto max-w-7xl px-4">
          <div className="w-full pr-2">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
