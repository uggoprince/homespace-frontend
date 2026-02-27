'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useApolloClient } from '@apollo/client';
import {
  destroyLocalStorage, getLocalStorage, getUserFromLocalStorage, setLocalStorage,
} from '@/lib/localStorage';
import { registerLogoutHandler } from '@/lib/apollo-client';

interface User {
  firstname: string;
  lastname: string;
  email?: string;
  country?: string;
  profile?: {
    hasAgency?: boolean;
  };
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  updateUser: () => void;
  isAuthenticated: boolean;
  updateIsAuth: (value: boolean) => void;
  loginUser: (tokenStr: string, userObj: User) => void;
  logout: () => void;
  clearStorage: () => void;
  isActive: React.RefObject<string>;
  setIsActive: (p: string) => void;
  isActiveMenuItem: React.RefObject<string>;
  setIsActiveMenuItem: (p: string) => void;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

const computeSearchPath = (searchText: string | null, start: number = 0) => {
  if (searchText) return `?q=${searchText}&start=${start}`;
  return `?start=${start}`;
};

const itsThisPath = (path: string) => {
  if (globalThis.window === undefined) return false;
  const { pathname } = globalThis.location;
  return pathname === path;
};

const setAuthCookie = (userObj: User | null) => {
  if (typeof document === 'undefined') return;
  if (userObj) {
    const data = encodeURIComponent(JSON.stringify({
      ag: !!userObj.profile?.hasAgency,
      fn: userObj.firstname,
      ln: userObj.lastname,
    }));
    document.cookie = `hs_auth=${data}; path=/; max-age=31536000; SameSite=Lax`;
  } else {
    document.cookie = 'hs_auth=; path=/; max-age=0';
  }
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get q and start from URL searchParams (replacing Redux props)
  const q = searchParams.get('q') || '';
  const start = Number(searchParams.get('start')) || 0;

  const [token, setToken] = useState<string | null>(() => getLocalStorage('token'));
  const [user, setUser] = useState<User | null>(() => getUserFromLocalStorage('user'));
  const [isAuthenticated, setIsAuthenticated] = useState(() => token !== null && token !== undefined);

  const updateUser = useCallback(() => {
    setUser(getUserFromLocalStorage('user'));
  }, []);

  const updateIsAuth = useCallback((value: boolean) => {
    setIsAuthenticated(value);
  }, []);

  const path = pathname?.toLowerCase() || '/';
  const str = path === '/' ? 'home' : path.replace('/', '');
  const isActive = useRef(str);
  const isActiveMenuItem = useRef('');
  const client = useApolloClient();

  useEffect(() => {
    isActive.current = str;
  }, [str]);

  const setIsActive = useCallback((p: string) => {
    isActive.current = p;
  }, []);

  const setIsActiveMenuItem = useCallback((p: string) => {
    isActiveMenuItem.current = p;
  }, []);

  // Sync cookie for existing sessions that only have localStorage token
  useEffect(() => {
    if (isAuthenticated && !document.cookie.includes('hs_auth')) {
      setAuthCookie(user);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = useCallback((tokenStr: string, userObj: User) => {
    setLocalStorage('user', JSON.stringify(userObj));
    setLocalStorage('token', tokenStr);
    setAuthCookie(userObj);
    setToken(tokenStr);
    setUser(userObj);
    isActive.current = 'home';
    setIsAuthenticated(true);
    let url = '/';
    if (q && !start) url += computeSearchPath(q, start);
    else if (!q && start) url += computeSearchPath(q, start);
    else if (q && start) url += computeSearchPath(q, start);
    router.replace(url);
  }, [q, start, router]);

  const clearStorage = useCallback(() => {
    destroyLocalStorage('token');
    destroyLocalStorage('user');
    setAuthCookie(null);
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const handleLogout = useCallback(() => {
    clearStorage();
    client.clearStore();
    if (itsThisPath('/')) {router.refresh();}
    else {router.replace('/login');}
  }, [clearStorage, client, router]);

  useEffect(() => {
    registerLogoutHandler(handleLogout);
  }, [handleLogout]);

  const value = useMemo(() => ({
    token,
    user,
    updateUser,
    isAuthenticated,
    updateIsAuth,
    loginUser: handleLogin,
    logout: handleLogout,
    clearStorage,
    isActive,
    setIsActive,
    isActiveMenuItem,
    setIsActiveMenuItem,
  }), [
    token,
    user,
    updateUser,
    isAuthenticated,
    updateIsAuth,
    handleLogin,
    handleLogout,
    clearStorage,
    setIsActive,
    setIsActiveMenuItem,
  ]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => React.useContext(AuthContext);
