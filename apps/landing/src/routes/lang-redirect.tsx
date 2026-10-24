import { Navigate } from 'react-router'

import { SupportedLang } from '@/config/languages'
import i18n from '@/lib/i18n'

// "/" is not prerendered: it loads the SPA fallback and redirects to the visitor's language.
const LangRedirect = () => {
  const lang: SupportedLang = i18n.resolvedLanguage === 'pt' ? 'pt' : 'en'
  return <Navigate to={`/${lang}`} replace />
}

export default LangRedirect
