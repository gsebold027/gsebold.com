import { Logo } from '@gsebold/ui/components/logo'

import { Suspense, lazy } from 'react'

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { ThemeToggle } from './theme/ThemeToggle'

// Lazy like landing's: the dropdown (Radix + flags) isn't needed for first paint.
const LanguageSwitcher = lazy(() =>
  import('./theme/LanguageSwitcher').then((m) => ({ default: m.LanguageSwitcher }))
)

type HeaderProps = {
  lang: string
}

const Header = ({ lang }: HeaderProps) => {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
        <Link
          to={`/${lang}`}
          className="flex items-center gap-3 rounded-md font-pixel text-sm"
          aria-label={t('header.home')}>
          <Logo size={28} aria-hidden="true" />
          <span aria-hidden="true">games</span>
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Suspense fallback={<div className="w-[70px] h-9" />}>
            <LanguageSwitcher />
          </Suspense>
        </div>
      </div>
    </header>
  )
}

export { Header }
