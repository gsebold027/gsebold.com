import { ThemeProvider } from '@gsebold/ui/components/theme-provider'

import { StrictMode } from 'react'

import { LazyMotion, MotionConfig } from 'motion/react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'

import './globals.css'
import './lib/i18n'
import { router } from './router'

// Same shell as landing: motion features load lazily, and reduced-motion follows the OS setting.
const loadMotionFeatures = () => import('./lib/motion-features').then((m) => m.default)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LazyMotion features={loadMotionFeatures}>
      <MotionConfig reducedMotion="user">
        <ThemeProvider defaultTheme="dark">
          <RouterProvider router={router} />
        </ThemeProvider>
      </MotionConfig>
    </LazyMotion>
  </StrictMode>
)
