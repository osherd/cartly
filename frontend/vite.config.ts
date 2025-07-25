import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Use environment variable for dynamic target, and DRY for repeated config
    proxy: [
      '/auth/users/login',
      '/auth/users/logout',
      '/auth/users/signup',
      '/auth/users/change-password',
    ].reduce<Record<string, object>>((acc, path) => {
      acc[path] = {
        target: process.env.VITE_API_URL || 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      };
      return acc;
    }, {}),
  },
})
