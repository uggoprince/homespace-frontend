/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: process.env.PORT || 5000 },
  define: {
    port: `"${process.env.PORT}"`,
    PROPERTY_DETAILS_FROM_SEARCH: `"${process.env.PROPERTY_DETAILS_FROM_SEARCH}"`,
    WEB_URL: `"${process.env.WEB_URL}"`,
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress "use client" directive warnings
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return;
        }
        warn(warning);
      },
    },
  },
});
