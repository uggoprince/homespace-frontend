'use client';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
// @ts-expect-error -- no type declarations for this deep import
import createUploadLink from 'apollo-upload-client/public/createUploadLink.js';
import { getLocalStorage } from './localStorage';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  link: authLink.concat(httpLink),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});
