import { lazy, useEffect } from 'react'

import { Navigate, useParams } from 'react-router'

import Layout from './components/Layout'
import { SUPPORTED_LANGS, SupportedLang } from './components/theme/LanguageSwitcher'
import i18n from './lib/i18n'

const LandingPage = lazy(() => import('@/pages/landing-page/LandingPage'))
const NotFoundPage = lazy(() => import('@/pages/not-found-page/NotFoundPage'))

const LangRedirect = () => {
  const detected = i18n.resolvedLanguage
  const lang: SupportedLang = detected === 'pt' ? 'pt' : 'en'
  return <Navigate to={`/${lang}`} replace />
}

const LangLayout = () => {
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

export const routes = [
  {
    path: '/',
    element: <LangRedirect />
  },
  {
    path: '/:lang',
    element: <LangLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]
