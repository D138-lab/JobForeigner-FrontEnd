import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'legacy',
        includePaths: ['.'],
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
