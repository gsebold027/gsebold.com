import { Suspense, lazy } from 'react'

import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { Button } from '@/components/ui/button'
import { DotPattern } from '@/components/ui/dot-pattern'
import { Highlighter } from '@/components/ui/highlighter'
import { LineShadowText } from '@/components/ui/line-shadow-text'

const LanguageSwitcher = lazy(() =>
  import('@/components/theme/LanguageSwitcher').then((m) => ({ default: m.LanguageSwitcher }))
)

const RouteErrorBoundary = () => (
  <div className="min-h-screen flex items-center justify-center px-4">
    <div className="absolute top-0 flex items-center justify-between md:justify-end w-full h-14 px-4 gap-2">
      <ThemeToggle />
      <Suspense fallback={<div className="w-[70px] h-9" />}>
        <LanguageSwitcher />
      </Suspense>
    </div>
    <div className="text-center space-y-8 max-w-md" role="alert">
      <div className="space-y-4">
        <h1 className="text-8xl font-bold text-primary italic">
          <LineShadowText shadowColor="var(--primary)">500</LineShadowText>
        </h1>
        <h2 className="text-3xl font-semibold text-foreground">
          <Highlighter action="underline" color="#DA611B" animationDuration={300}>
            Something went wrong
          </Highlighter>
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          An unexpected error occurred.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => window.location.reload()}>Try again</Button>
      </div>
    </div>
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <DotPattern className="mask-[radial-gradient(60vh_circle_at_center,white,transparent)]" />
    </div>
  </div>
)

export { RouteErrorBoundary }
