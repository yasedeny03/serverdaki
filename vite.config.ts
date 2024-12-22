import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://57.128.191.15:3000', // Updated target to match the server IP
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://57.128.191.15:3000', // Updated target for uploads
        changeOrigin: true,
      },
    },
  },
});
