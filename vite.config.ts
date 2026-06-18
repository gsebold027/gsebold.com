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
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'CHUNK_SIZE_WARNING') throw new Error(warning.message)
        warn(warning)
      },
      output: {
        manualChunks: (id) => (id.includes('node_modules') ? 'vendor' : undefined)
      }
    }
  },
  preview: {
    allowedHosts: process.env.VITE_ALLOWED_HOSTS
      ? process.env.VITE_ALLOWED_HOSTS.split(',').map((host) => host.trim())
      : ['localhost']
  }
})
