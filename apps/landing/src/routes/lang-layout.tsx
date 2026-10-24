import { useEffect } from 'react'

import { useParams } from 'react-router'

import Layout from '@/components/Layout'
import { RouteErrorBoundary } from '@/components/shared/RouteErrorBoundary'
import { SUPPORTED_LANGS, SupportedLang } from '@/config/languages'
import i18n from '@/lib/i18n'
import NotFoundPage from '@/pages/not-found-page/NotFoundPage'

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

  if (!isValid) return <NotFoundPage />

  return <Layout />
}

export const ErrorBoundary = RouteErrorBoundary

export default LangLayout
