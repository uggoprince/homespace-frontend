import { indigo } from 'tailwindcss/colors';

import {
  createTheme,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[600],
    },
  },
});

export default theme;
