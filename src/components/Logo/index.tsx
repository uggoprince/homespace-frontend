'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { useInitialAuth } from '@/providers/InitialAuthProvider';

const Logo = () => {
  const { user, setIsActive } = useAuth() || {};
  const { isAuthenticated, displayName: initialDisplayName } = useInitialAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  let displayName = 'HomeSpace';
  if (mounted && user) {
    displayName = `${user.firstname} ${user.lastname}`;
  } else if (isAuthenticated) {
    displayName = initialDisplayName || '\u00A0';
  }
  return (
    <Link
      href="/"
      onClick={() => {
        setIsActive?.('home');
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('propertiesQuery');
        }
      }}
    >
      <div
        className="
      text-primary dark:text-slate-50 py-2
      font-bold
      inline-block
      cursor-pointer
      min-h-full"
      >
        {displayName}
      </div>
    </Link>
  );
};

export default Logo;
