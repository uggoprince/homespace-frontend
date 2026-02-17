'use client';

import { Suspense } from 'react';
import { ApolloProvider } from './ApolloProvider';
import { ThemeProvider } from './ThemeProvider';
import AuthProvider from './AuthProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ApolloProvider>
      <ThemeProvider>
        <Suspense fallback={null}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </Suspense>
      </ThemeProvider>
    </ApolloProvider>
  );
};
