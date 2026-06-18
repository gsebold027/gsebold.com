import { Suspense, lazy } from 'react'

import { Outlet } from 'react-router'

import { usePageTranslation } from '@/lib/hooks'
import { cn } from '@/lib/utils'

import Footer from './sections/Footer'
import NavBar from './sections/NavBar'

const AnimatedGridPattern = lazy(() =>
  import('./ui/animated-grid-pattern').then((m) => ({ default: m.AnimatedGridPattern }))
)
const Toaster = lazy(() => import('./ui/sonner').then((m) => ({ default: m.Toaster })))

const Layout = () => {
  const { t } = usePageTranslation()

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <Suspense fallback={null}>
          <AnimatedGridPattern
            numSquares={30}
            maxOpacity={0.1}
            duration={3}
            repeatDelay={1}
            className={cn(
              '[mask-image:radial-gradient(100vw_circle_at_center,white,transparent)]',
              'inset-x-0 inset-y-[-50%] sm:inset-y-[-30%] h-[200%] skew-y-12'
            )}
          />
        </Suspense>
      </div>

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md">
        {t('layout.skip_to_content')}
      </a>

      <NavBar />

      <main
        id="main-content"
        className="mx-auto max-w-[calc(84rem)] px-[clamp(1rem,_2.5vw_+_0rem,_2rem)] z-10 relative w-full">
        <Outlet />
      </main>

      <Footer />
      <Suspense fallback={null}>
        <Toaster />
      </Suspense>
    </div>
  )
}

export default Layout
