'use client';

import { createContext, useContext, ReactNode } from 'react';

interface InitialAuth {
  isAuthenticated: boolean;
  hasAgency: boolean;
  displayName: string;
}

const defaultValue: InitialAuth = { isAuthenticated: false, hasAgency: false, displayName: '' };

const InitialAuthContext = createContext<InitialAuth>(defaultValue);

export const useInitialAuth = () => useContext(InitialAuthContext);

export const InitialAuthProvider = ({
  value,
  children,
}: {
  value: InitialAuth;
  children: ReactNode;
}) => (
  <InitialAuthContext.Provider value={value}>
    {children}
  </InitialAuthContext.Provider>
);
