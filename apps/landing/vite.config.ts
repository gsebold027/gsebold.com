import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'

import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
// React Router builds twice: the client bundle that ships, and a server bundle used only to
// prerender /en and /pt. The bundle report only applies to the client build.
// No manualChunks: grouping by package put code only lazy parts use (dropdown, rough-notation,
// zod) into chunks every page preloads. Rollup's own split follows the import graph.
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
