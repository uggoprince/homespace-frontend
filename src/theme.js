/* eslint-disable import/no-unresolved */
import { indigo } from 'tailwindcss/colors';

import {
  createTheme,
} from '@mui/material';

const getTheme = (prefersDarkMode) => createTheme({
  palette: {
    mode: prefersDarkMode ? 'dark' : 'light',
    primary: {
      main: indigo[600],
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: prefersDarkMode ? indigo[400] : indigo[600],
            borderWidth: '2px',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: prefersDarkMode ? indigo[400] : indigo[600],
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:after': {
            borderBottomColor: prefersDarkMode ? indigo[400] : indigo[600],
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: prefersDarkMode ? indigo[400] : indigo[600],
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: prefersDarkMode ? indigo[400] : indigo[600],
          },
        },
      },
    },
  },
});

export default getTheme;
