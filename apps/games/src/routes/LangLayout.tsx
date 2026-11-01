import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'
import { Outlet, useParams } from 'react-router'

import { Header } from '@/components/Header'
import { SUPPORTED_LANGS, SupportedLang } from '@/config/languages'
import i18n from '@/lib/i18n'
import NotFoundPage from '@/pages/NotFoundPage'

const isSupportedLang = (lang: string | undefined): lang is SupportedLang =>
  SUPPORTED_LANGS.includes(lang as SupportedLang)

const LangLayout = () => {
  const { lang } = useParams<{ lang: string }>()
  const { t } = useTranslation()
  const isValid = isSupportedLang(lang)

  useEffect(() => {
    if (!isValid) return
    i18n.changeLanguage(lang)
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
  }, [lang, isValid])

  if (!isValid) return <NotFoundPage />

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:ring-2 focus:ring-ring">
        {t('skip_to_content')}
      </a>
      <Header lang={lang} />
      <main id="main" className="mx-auto max-w-6xl px-4">
        <Outlet />
      </main>
    </>
  )
}

export default LangLayout
