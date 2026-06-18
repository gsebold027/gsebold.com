import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  envDir: './src/environments',
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    visualizer({ open: true, gzipSize: true, brotliSize: true })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: '/',
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'CHUNK_SIZE_WARNING') throw new Error(warning.message)
        warn(warning)
      },
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router/') ||
            id.includes('/scheduler/')
          )
            return 'vendor-react'
          if (
            id.includes('/motion/') ||
            id.includes('/motion-dom/') ||
            id.includes('/framer-motion/')
          )
            return 'vendor-motion'
          if (id.includes('@radix-ui') || id.includes('/sonner/')) return 'vendor-ui'
          if (id.includes('@tanstack') || id.includes('/axios/') || id.includes('/zod/'))
            return 'vendor-query'
          if (id.includes('i18next')) return 'vendor-i18n'
          if (id.includes('lucide-react')) return 'vendor-icons'
          return 'vendor-misc'
        }
      }
    }
  },
  preview: {
    allowedHosts: process.env.VITE_ALLOWED_HOSTS
      ? process.env.VITE_ALLOWED_HOSTS.split(',').map((host) => host.trim())
      : ['localhost']
  }
})
