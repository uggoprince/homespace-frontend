'use client';

import React, { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useInitialAuth } from '@/providers/InitialAuthProvider';
import './style.css';
import { Menu } from 'lucide-react';

const activePaths = {
  home: 'home',
  agencies: 'agencies',
  dashboard: 'dashboard',
  profilePath: 'profile',
  dashboardAgency: 'dashboard/agency',
  dashboardProperties: 'dashboard/properties',
  login: 'login',
  signup: 'signup',
  logoutPath: 'logout',
};

const {
  home, agencies, dashboard, login, signup, profilePath, logoutPath,
} = activePaths;

interface HSLinkProps {
  path: string;
  text: string;
  activeText: string;
  setActive: {
    isActive: React.RefObject<string>;
    setIsActive: (p: string) => void;
  };
  isAuth?: boolean;
}

const HSLink = (props: HSLinkProps) => {
  const {
    path, text, setActive, activeText, isAuth,
  } = props;
  const { isActive, setIsActive } = setActive;
  return (
    <li className="flex grow">
      <Link
        href={path}
        onClick={() => {
          if (path === '/' && isAuth === true) {
            // Will handle search state reset with URL params in Phase 5
          }
          setIsActive(activeText);
        }}
        className={`nav-link
          ${(isActive?.current?.startsWith(activeText) ? 'bg-indigo-600 text-white' : 'text-primary dark:text-slate-50')}`}
      >
        {text}
      </Link>
    </li>
  );
};

interface HSButtonProps {
  handler: (e: React.MouseEvent) => void;
  text: string;
}

const HSButton = (props: HSButtonProps) => {
  const { handler, text } = props;
  return (
    <button
      type="button"
      onClick={handler}
      className="nav-button"
    >
      {text}
    </button>
  );
};

const NavBlock = ({ children }: { children: React.ReactNode }) => {
  const menuRef = useRef<HTMLUListElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = useCallback(() => {
    menuRef.current?.classList.add('hidden');
  }, []);

  const toggleMenu = useCallback(() => {
    menuRef.current?.classList.toggle('hidden');
  }, []);

  // Close menu when clicking outside or navigating
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [closeMenu]);

  return (
    <nav className="flex" ref={navRef}>
      <ul
        ref={menuRef}
        className="hidden
        absolute
        border-primary
        top-12
        right-1
        z-50
        border-2 rounded
        bg-white
        dark:bg-slate-950
        md:visible
        md:bg-transparent
        md:right-0
        md:top-0
        md:w-auto
        md:flex
        md:relative
        md:border-solid
        md:border-0
        md:border-transparent"
        id="navMenu"
        onClickCapture={closeMenu}
      >
        {children}
      </ul>
      <button type="button" className="py-2" id="navMenuButton" aria-label="Toggle menu" onClick={toggleMenu}>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
          fill="#000000"
          className="md:hidden cursor-pointer block dark:fill-white"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
        </svg> */}
        <Menu className="md:hidden cursor-pointer block dark:fill-white" />
      </button>
    </nav>
  );
};

interface User {
  firstname: string;
  lastname: string;
  profile?: {
    hasAgency?: boolean;
  };
}

interface HomeNavigationProps {
  logout: () => void;
  user: User | null;
  hasAgency: boolean;
}

const HomeNavigation = (props: HomeNavigationProps) => {
  const { logout, user, hasAgency } = props;
  const { isActive, setIsActive, isAuthenticated: auth } = useAuth() || {};
  // Subscribe to pathname changes so nav re-renders and reads updated isActive ref
  usePathname();
  const showDashboard = user?.profile?.hasAgency === true || hasAgency;
  const logUserOut = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsActive?.(logoutPath);
    logout();
  };
  return (
    <NavBlock>
      <HSLink path="/" text="Home" isAuth={!!auth} setActive={{ isActive: isActive!, setIsActive: setIsActive! }} activeText={home} />
      <HSLink path="/agencies" text="Agencies" setActive={{ isActive: isActive!, setIsActive: setIsActive! }} activeText={agencies} />
      {showDashboard && <HSLink path="/dashboard" text="Dashboard" setActive={{ isActive: isActive!, setIsActive: setIsActive! }} activeText={dashboard} />}
      <HSLink path="/profile" text="Profile" setActive={{ isActive: isActive!, setIsActive: setIsActive! }} activeText={profilePath} />
      <HSButton text="Sign Out" handler={logUserOut} />
    </NavBlock>
  );
};

const LandingNavigation = ({ user }: { user: User | null }) => {
  const { isActive, setIsActive } = useAuth() || {};
  const searchParams = useSearchParams();
  const hasQuery = searchParams.has('q');

  const pathname = usePathname();
  const path = pathname?.toLowerCase() || '/';
  const queryString = searchParams.toString();

  // Save query to sessionStorage when it exists
  if (typeof window !== 'undefined' && hasQuery && queryString) {
    sessionStorage.setItem('propertiesQuery', `?${queryString}`);
  }

  const emptySubscribe = useCallback(() => () => {}, []);
  const savedQuery = useSyncExternalStore(
    emptySubscribe,
    () => sessionStorage.getItem('propertiesQuery') || '',
    () => '',
  );

  const getPropertiesPath = () => {
    if (hasQuery) return `/${queryString ? `?${queryString}` : ''}`;
    if (savedQuery) return `/${savedQuery}`;
    return '/';
  };
  const propertiesPath = getPropertiesPath();
  const showPropsLink = !user && (hasQuery || savedQuery || path === '/agencies' || path === '/login' || path === '/signup');

  return (
    <NavBlock>
      {showPropsLink && <HSLink path={propertiesPath} text="Properties" setActive={{ isActive: isActive!, setIsActive: setIsActive! }} activeText={home} />}
      <HSLink path="/agencies" text="Agencies" setActive={{ isActive: isActive!, setIsActive: setIsActive! }} activeText={agencies} />
      <HSLink path="/login" text="Log In" setActive={{ isActive: isActive!, setIsActive: setIsActive! }} activeText={login} />
      <HSLink path="/signup" text="Sign Up" setActive={{ isActive: isActive!, setIsActive: setIsActive! }} activeText={signup} />
    </NavBlock>
  );
};

const emptySubscribe = () => () => {};
function useIsMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

const Navigation = () => {
  const mounted = useIsMounted();
  const initialAuth = useInitialAuth();
  const { token, logout, user } = useAuth() || {};
  const isAuthenticated = mounted ? (!!token || initialAuth.isAuthenticated) : initialAuth.isAuthenticated;

  if (isAuthenticated) return <HomeNavigation user={user as User | null} logout={logout!} hasAgency={initialAuth.hasAgency} />;
  return <LandingNavigation user={user as User | null} />;
};

export default Navigation;
