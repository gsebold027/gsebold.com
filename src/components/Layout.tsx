import { Outlet } from 'react-router'

import { cn } from '@/lib/utils'

import Footer from './sections/Footer'
import NavBar from './sections/NavBar'
import { AnimatedGridPattern } from './ui'

const Layout = () => (
  <>
    <div className="fixed inset-0 -z-10">
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
    </div>
    <NavBar />
    <main className="mx-auto max-w-[calc(84rem)] px-[clamp(1rem,_2.5vw_+_0rem,_2rem)] z-10 relative">
      <Outlet />
    </main>
    <Footer />
  </>
)

export default Layout
