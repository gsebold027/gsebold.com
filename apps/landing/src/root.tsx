import '@fontsource/space-grotesk/700.css'

import { LazyMotion, MotionConfig } from 'motion/react'
import { Links, Meta, Outlet, Scripts, useLocation } from 'react-router'

import { ThemeProvider } from './contexts/ThemeProvider'
import { environment } from './environments/environment'
import './globals.css'
import './lib/i18n'

// Runs before first paint so the prerendered page shows the saved theme instead of flashing the
// default. Mirrors ThemeProvider's applyThemeClass; its hash is allowed by the CSP meta tag that
// scripts/csp-hashes.mjs adds after the build.
const themeScript = `(function(){var c=document.documentElement.classList;try{var t=localStorage.getItem(${JSON.stringify(environment.localStorageKeys.theme)})||'dark';if(t==='system')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';c.add(t)}catch(e){c.add('dark')}})()`

export const Layout = ({ children }: { children: React.ReactNode }) => {
  // The root Layout sits outside the matched routes in the browser, so useParams() is empty here;
  // the language is the first path segment (/en, /pt).
  const lang = useLocation().pathname.split('/')[1]

  return (
    <html lang={lang === 'pt' ? 'pt-BR' : 'en'} suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* Favicons & PWA */}
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Gsebold" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Google Search Console verification */}
        <meta
          name="google-site-verification"
          content="RInL3Q2fzfJJ0eDjEsN3jDHp0zRC4bxcfaEtebnNz5E"
        />

        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

// The query client and axios provider live in components/forms/contact.form-root.tsx, the only
// place that calls the API, so they load with the contact form instead of with every page.
const loadMotionFeatures = () => import('./lib/motion-features').then((m) => m.default)

const App = () => (
  <LazyMotion features={loadMotionFeatures}>
    <MotionConfig reducedMotion="user">
      <ThemeProvider defaultTheme="dark">
        <Outlet />
      </ThemeProvider>
    </MotionConfig>
  </LazyMotion>
)

// The SPA fallback (/, unknown paths) has nothing prerendered; render nothing until the client takes over.
export const HydrateFallback = () => null

// Default tags for the SPA fallback page; the landing and not-found routes replace them.
export const meta = () => [
  { title: 'Gustavo Sebold · Full-Stack Developer' },
  {
    name: 'description',
    content:
      'Full-stack developer from Curitiba, Brazil. Crafting modern web experiences with React, Node.js, TypeScript, and more.'
  }
]

export default App
