import { Button } from '@gsebold/ui/components/button'
import { DotPattern } from '@gsebold/ui/components/dot-pattern'
import { LineShadowText } from '@gsebold/ui/components/line-shadow-text'

import { Suspense, lazy } from 'react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { useDocumentTitle } from '@/lib/hooks/useDocumentTitle'

// Lazy like landing's: the dropdown (Radix + flags) isn't needed for first paint.
const LanguageSwitcher = lazy(() =>
  import('@/components/theme/LanguageSwitcher').then((m) => ({ default: m.LanguageSwitcher }))
)

// Mirrors landing's 404, minus the rough-notation underline.
const NotFoundPage = () => {
  const { t, i18n } = useTranslation('not-found')
  const lang = i18n.resolvedLanguage === 'pt' ? 'pt' : 'en'
  useDocumentTitle(t('meta_title'))

  return (
    <div className="min-h-dvh flex items-center justify-center px-4">
      <div className="absolute top-0 flex items-center justify-end w-full h-14 px-4 gap-2">
        <ThemeToggle />
        <Suspense fallback={<div className="w-[70px] h-9" />}>
          <LanguageSwitcher />
        </Suspense>
      </div>
      <main className="text-center space-y-8 max-w-md">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-primary italic">
            <LineShadowText shadowColor="var(--primary)">404</LineShadowText>
          </h1>
          <h2 className="text-3xl font-semibold text-foreground">{t('title')}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t('description')}</p>
        </div>
        <Button asChild>
          <Link to={`/${lang}`}>{t('go_home')}</Link>
        </Button>
      </main>
      <div className="fixed inset-0 -z-10" aria-hidden="true">
        <DotPattern className="[mask-image:radial-gradient(60vh_circle_at_center,white,transparent)]" />
      </div>
    </div>
  )
}

export default NotFoundPage
