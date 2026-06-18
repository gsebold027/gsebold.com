import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  envDir: './src/environments',
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    chunkSplitPlugin({
      strategy: 'unbundle',
      customSplitting: {
        'framer-motion': [/node_modules\/framer-motion\//],
        i18n: [/node_modules\/i18next/, /node_modules\/react-i18next\//],
        router: [/node_modules\/react-router/, /node_modules\/@react-router\//],
        query: [/node_modules\/@tanstack\//],
        axios: [/node_modules\/axios\//],
        lucide: [/node_modules\/lucide-react\//]
      }
    }),
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
      }
    }
  },
  preview: {
    allowedHosts: process.env.VITE_ALLOWED_HOSTS
      ? process.env.VITE_ALLOWED_HOSTS.split(',').map((host) => host.trim())
      : ['localhost']
  }
})
