'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { useInitialAuth } from '@/providers/InitialAuthProvider';

interface ConditionalWrapperProps {
  children: ReactNode;
}

export default function ConditionalWrapper({ children }: Readonly<ConditionalWrapperProps>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const auth = useAuth();
  const initialAuth = useInitialAuth();
  const q = searchParams.get('q') || '';
  const isAuthenticated = auth?.isAuthenticated || initialAuth.isAuthenticated;

  const isAuthPage = pathname === '/login' || pathname === '/signup';
  // Apply master class for home (landing), login, and signup pages
  // Auth pages always get the master class to prevent flash during post-login redirect
  const shouldApplyMaster = isAuthPage || (pathname === '/' && !isAuthenticated && !q);

  return (
    <div className={`w-full min-h-screen relative flex flex-col dark:text-white${shouldApplyMaster ? ' master' : ''}`}>
      {children}
    </div>
  );
}
