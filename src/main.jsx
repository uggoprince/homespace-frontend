/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React, { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ApolloClient, ApolloProvider, InMemoryCache, createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from 'apollo-link-http';
import { createUploadLink } from 'apollo-upload-client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, useMediaQuery } from '@mui/material';
import App from './App';
import './index.css';
import { store } from './Utils/Store';
import getTheme from './theme';
import { getLocalStorage } from './Utils/LocalStorage';
import LayoutFixer from './layouts/LayoutFixer';

// function adjustContentPadding() {
//   const header = document.getElementById('fixed-header');
//   const content = document.getElementById('page-content');

//   const headerHeight = header.offsetHeight;
//   content.style.paddingTop = `${headerHeight}px`;
// }

// // Run on load
// window.addEventListener('load', adjustContentPadding);
// // Run on resize
// window.addEventListener('resize', adjustContentPadding);
// // Optional: run if header height might change from content changes
// new ResizeObserver(adjustContentPadding).observe(document.getElementById('fixed-header'));

const API_URL = import.meta.env.VITE_API_URL;
const httpLink = createUploadLink({
  uri: API_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = getLocalStorage('token');
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': 'https://homespace.vercel.app/',
    },
  };
});

const cache = new InMemoryCache({
  addTypename: true,
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

// eslint-disable-next-line no-unused-vars
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});

function Root() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => getTheme(prefersDarkMode), [prefersDarkMode]);

  return (
    <Router>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <LayoutFixer />
            <App />
          </ThemeProvider>
        </Provider>
      </ApolloProvider>
    </Router>
  );
}

const root = createRoot(document.getElementById('root'));

root.render(<Root />);
