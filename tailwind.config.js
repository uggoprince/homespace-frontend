/* eslint-disable import/no-extraneous-dependencies */
const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}',
    './dist/**/*.{html,js,jsx}',
    // './index.html',
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem', // px-4
        sm: '1.5rem', // px-6
        lg: '2rem', // px-8
      },
    },
    /* fontSize: {
      xs: '.75rem',
      sm: '.875rem',
      tiny: '.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    }, */
    extend: {
      /* transitionProperty: {
        width: 'width',
        hidden: 'hidden',
      }, */
      colors: {
        main: colors.indigo,
        primary: colors.indigo[600],
        primary2: colors.indigo[500],
        buttonColor: '#4f46e5',
        secondary: '#9f46e5',
        tertiary: '#468DE5',
        textColor: colors.slate[600],
        iconColor: colors.amber[500],
        darkMode: '#15202B', // colors.slate[900], // ,
      },
      fontFamily: {
        roboto: ['Roboto'],
        open_sans: ['Open Sans'],
      },
      backgroundImage: {
        'gradient-light': 'linear-gradient(to bottom, rgb(248 250 252), rgb(255 255 255), rgb(248 250 252))',
        'gradient-dark': 'linear-gradient(to bottom, rgb(2 6 23), rgb(15 23 42), rgb(2 6 23))',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
