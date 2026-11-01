import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

// A plain client-side SPA: games are client state only, so there is nothing to prerender.
// nginx serves index.html for every path (see nginx.conf).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}']
  }
})
