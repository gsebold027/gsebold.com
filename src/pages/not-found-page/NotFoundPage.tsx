import { Link } from 'react-router'

import { LanguageSwitcher, ThemeToggle } from '@/components/theme'
import { Button, Highlighter, LineShadowText } from '@/components/ui'
import { DotPattern } from '@/components/ui/dot-pattern'
import { usePageTranslation } from '@/lib/hooks'

import SeoHead from './SeoHead'

const NotFoundPage = () => {
  const { t, i18n } = usePageTranslation('not-found-page')
  const lang = i18n.resolvedLanguage === 'pt' ? 'pt' : 'en'

  return (
    <>
      <SeoHead />

      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="absolute top-0 flex items-center justify-between md:justify-end w-full h-14 px-4 gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
        <div className="text-center space-y-8 max-w-md">
          <div className="space-y-4">
            <h1 className="text-8xl font-bold text-primary italic">
              <LineShadowText shadowColor="var(--primary)">404</LineShadowText>
            </h1>
            <h2 className="text-3xl font-semibold text-foreground">
              <Highlighter action="underline" color="#DA611B">
                {t('pageNotFound')}
              </Highlighter>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {t('pageNotFoundDescription')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to={`/${lang}`}>{t('goHome')}</Link>
            </Button>
          </div>
        </div>
        <div className="fixed inset-0 -z-10" aria-hidden="true">
          <DotPattern className="[mask-image:radial-gradient(60vh_circle_at_center,white,transparent)]" />
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
