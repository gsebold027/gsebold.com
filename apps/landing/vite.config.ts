import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'

import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
// React Router builds twice: the client bundle that ships, and a server bundle used only to
// prerender /en and /pt. Chunking and the bundle report only apply to the client build.
export default defineConfig(({ isSsrBuild }) => ({
  envDir: './src/environments',
  plugins: [
    reactRouter(),
    tailwindcss(),
    tsconfigPaths(),
    !isSsrBuild && visualizer({ open: true, gzipSize: true, brotliSize: true })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  base: '/',
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: isSsrBuild
        ? undefined
        : {
            manualChunks: {
              'react-vendor': ['react', 'react-dom'],
              motion: ['motion'],
              i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
              router: ['react-router'],
              query: ['@tanstack/react-query', '@tanstack/react-form'],
              radix: [
                '@radix-ui/react-accordion',
                '@radix-ui/react-dialog',
                '@radix-ui/react-dropdown-menu',
                '@radix-ui/react-label',
                '@radix-ui/react-navigation-menu',
                '@radix-ui/react-separator',
                '@radix-ui/react-slot'
              ],
              utils: ['axios', 'zod', 'lucide-react', 'clsx', 'tailwind-merge']
            }
          },
      onwarn(warning, warn) {
        if (warning.code === 'CHUNK_SIZE_WARNING') throw new Error(warning.message)
        warn(warning)
      }
    }
  },
  preview: {
    allowedHosts: process.env.VITE_ALLOWED_HOSTS
      ? process.env.VITE_ALLOWED_HOSTS.split(',').map((host) => host.trim())
      : ['localhost']
  }
}))
