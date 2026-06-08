import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
    dedupe: ['react', 'react-dom', 'zustand'],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'zustand',
      'use-sync-external-store',
      'use-sync-external-store/shim',
      'use-sync-external-store/shim/with-selector',
      '@emailjs/browser',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
    ],
  },
})
