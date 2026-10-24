import type { Config } from '@react-router/dev/config'

// Static site: no server at runtime. /en and /pt are rendered to HTML at build time; every other
// path (/, unknown routes) is served the SPA fallback and rendered in the browser.
export default {
  appDirectory: 'src',
  buildDirectory: 'dist',
  ssr: false,
  prerender: ['/en', '/pt']
} satisfies Config
