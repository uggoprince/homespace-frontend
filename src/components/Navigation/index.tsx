'use client';

import React, { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '@/providers/AuthProvider';
import { useInitialAuth } from '@/providers/InitialAuthProvider';
import './style.css';
import { Building, CircleUserRound, House, LayoutDashboard, LogInIcon, LogOut, Menu, User, UserPlus, Users } from 'lucide-react';
import { PATHS } from '@/Utils/paths';

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
  Icon?: React.ElementType;
}

const HSLink = (props: HSLinkProps) => {
  const {
    path, text, setActive, activeText, isAuth, Icon
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
        className={`nav-link flex gap-2 items-center
          ${(isActive?.current?.startsWith(activeText) 
      ? 'bg-indigo-600 text-white' 
      : 'text-primary dark:text-slate-50')}`}
      >
        {Icon && <Icon className="size-4" />}
        {text}
      </Link>
    </li>
  );
};

interface HSButtonProps {
  handler: (e: React.MouseEvent) => void;
  text: string;
  Icon?: React.ElementType;
}

const HSButton = (props: HSButtonProps) => {
  const { handler, text, Icon } = props;
  return (
    <button
      type="button"
      onClick={handler}
      className="nav-button"
    >
      {Icon && <Icon className="size-4" />}
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
        border-slate-800
        top-12
        right-1
        z-50
        border-2 rounded
        bg-white
        dark:bg-slate-950
        lg:visible
        lg:bg-transparent
        lg:right-0
        lg:top-0
        lg:w-auto
        lg:flex
        lg:relative
        lg:border-solid
        lg:border-0
        lg:border-transparent"
        id="navMenu"
        onClickCapture={closeMenu}
      >
        {children}
      </ul>
      <button type="button" className="py-2" id="navMenuButton" aria-label="Toggle menu" onClick={toggleMenu}>
        <Menu className="lg:hidden cursor-pointer block dark:fill-white" />
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
      <HSLink path={PATHS.home} text="Home"
        Icon={Building}
        isAuth={!!auth}
        setActive={{ isActive: isActive!, setIsActive: setIsActive! }}
        activeText={home} />
      <HSLink path={PATHS.agencies}
        Icon={Users}
        text="Agencies"
        setActive={{ isActive: isActive!, setIsActive: setIsActive! }}
        activeText={agencies} />
      {showDashboard && 
        <HSLink path={PATHS.dashboard}
          text="Dashboard"
          Icon={LayoutDashboard}
          setActive={{ isActive: isActive!, setIsActive: setIsActive! }}
          activeText={dashboard} />}
      <HSLink path={PATHS.profile} text="Profile"
        Icon={CircleUserRound}
        setActive={{ isActive: isActive!, setIsActive: setIsActive! }}
        activeText={profilePath} />
      <HSButton text="Sign Out" handler={logUserOut} Icon={LogOut} />
    </NavBlock>
  );
};

const LandingNavigation = ({ user }: { user: User | null }) => {
  const { isActive, setIsActive } = useAuth() || {};
  const searchParams = useSearchParams();
  const hasQuery = searchParams.has('q');

  const pathname = usePathname();
  const path = pathname?.toLowerCase() || PATHS.home;
  const queryString = searchParams.toString();

  // Save query to sessionStorage when it exists
  if (globalThis.window !== undefined && hasQuery && queryString) {
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
  const showPropsLink = !user && (hasQuery || savedQuery || path === PATHS.agencies || path === PATHS.login || path === PATHS.signup);

  return (
    <NavBlock>
      {showPropsLink && 
        <HSLink path={propertiesPath}
          text="Properties"
          Icon={Building}
          setActive={{ isActive: isActive!, setIsActive: setIsActive! }}
          activeText={home} />}
      <HSLink path={PATHS.agencies}
        text="Agencies"
        Icon={Users}
        setActive={{ isActive: isActive!, setIsActive: setIsActive! }}
        activeText={agencies} />
      <HSLink path={PATHS.login} text="Log In"
        Icon={LogInIcon}
        setActive={{ isActive: isActive!, setIsActive: setIsActive! }}
        activeText={login} />
      <HSLink path={PATHS.signup} text="Sign Up"
        Icon={UserPlus}
        setActive={{ isActive: isActive!, setIsActive: setIsActive! }} 
        activeText={signup} />
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
