import { Suspense, lazy, useEffect } from 'react'

import { useParams } from 'react-router'

import Layout from '@/components/Layout'
import { SUPPORTED_LANGS, SupportedLang } from '@/config/languages'
import i18n from '@/lib/i18n'

// Lazy so /en and /pt don't download the 404 and error pages (and rough-notation with them).
const NotFoundPage = lazy(() => import('@/pages/not-found-page/NotFoundPage'))
const RouteErrorBoundary = lazy(() =>
  import('@/components/shared/RouteErrorBoundary').then((m) => ({
    default: m.RouteErrorBoundary
  }))
)

const LangLayout = () => {
  const { lang } = useParams<{ lang: string }>()
  const isValid = SUPPORTED_LANGS.includes(lang as SupportedLang)

  // Prerendering has no URL for the language detector to read, so set the language from the
  // route before the page renders. In the browser the detector already matches the path.
  if (import.meta.env.SSR && isValid && i18n.language !== lang) {
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    if (isValid && lang) {
      i18n.changeLanguage(lang)
    }
  }, [lang, isValid])

  if (!isValid)
    return (
      <Suspense fallback={null}>
        <NotFoundPage />
      </Suspense>
    )

  return <Layout />
}

export const ErrorBoundary = () => (
  <Suspense fallback={null}>
    <RouteErrorBoundary />
  </Suspense>
)

export default LangLayout
