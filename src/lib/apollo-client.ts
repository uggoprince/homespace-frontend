'use client';

import { ApolloClient, ApolloLink, InMemoryCache, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// @ts-expect-error -- no type declarations for this deep import
import createUploadLink from 'apollo-upload-client/public/createUploadLink.js';
import { getLocalStorage } from './localStorage';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Registered by AuthProvider on mount — called when any response returns UNAUTHENTICATED.
let _logoutHandler: (() => void) | null = null;
export const registerLogoutHandler = (fn: () => void) => { _logoutHandler = fn; };

const httpLink = createUploadLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' ? getLocalStorage('token') : null;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const errorLink = new ApolloLink((operation, forward) =>
  forward(operation).map((response) => {
    const isUnauthenticated = response.errors?.some(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (e) => e.extensions?.code === 'UNAUTHENTICATED' || (e as any).code === 'UNAUTHENTICATED'
    );
    if (isUnauthenticated) {
      _logoutHandler?.();
    }
    return response;
  })
);

const cache = new InMemoryCache({
  typePolicies: {
    Property: {
      fields: {
        photos: {
          merge: false,
        },
      },
    },
  },
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
