import { Suspense, lazy, useEffect } from 'react'

import { Navigate, useParams } from 'react-router'

import { SUPPORTED_LANGS, SupportedLang } from '@/config/languages'

import Layout from './components/Layout'
import i18n from './lib/i18n'

const LandingPage = lazy(() => import('@/pages/landing-page/LandingPage'))
const NotFoundPage = lazy(() => import('@/pages/not-found-page/NotFoundPage'))
const RouteErrorBoundary = lazy(() =>
  import('./components/shared/RouteErrorBoundary').then((m) => ({ default: m.RouteErrorBoundary }))
)

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
    errorElement: (
      <Suspense fallback={null}>
        <RouteErrorBoundary />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <LandingPage />
      }
    ]
  },
  {
    path: '*',
    element: (
      <Suspense fallback={null}>
        <NotFoundPage />
      </Suspense>
    )
  }
]
