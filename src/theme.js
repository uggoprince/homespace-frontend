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
});

export default getTheme;
