import { lazy, useEffect } from 'react'

import { Navigate, useParams } from 'react-router'

import { SUPPORTED_LANGS, SupportedLang } from '@/config/languages'

import Layout from './components/Layout'
import i18n from './lib/i18n'

export const LandingPage = lazy(() => import('@/pages/landing-page/LandingPage'))
export const NotFoundPage = lazy(() => import('@/pages/not-found-page/NotFoundPage'))
export const RouteErrorBoundary = lazy(() =>
  import('./components/shared/RouteErrorBoundary').then((m) => ({ default: m.RouteErrorBoundary }))
)

export const LangRedirect = () => {
  const detected = i18n.resolvedLanguage
  const lang: SupportedLang = detected === 'pt' ? 'pt' : 'en'
  return <Navigate to={`/${lang}`} replace />
}

export const LangLayout = () => {
  const { lang } = useParams<{ lang: string }>()
  const isValid = SUPPORTED_LANGS.includes(lang as SupportedLang)

  useEffect(() => {
    if (isValid && lang) {
      i18n.changeLanguage(lang)
    }
  }, [lang, isValid])

  if (!isValid) {
    return <Navigate to="/en" replace />
  }

  return <Layout />
}
