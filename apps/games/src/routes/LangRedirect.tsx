import { Navigate } from 'react-router'

import { SupportedLang } from '@/config/languages'
import i18n from '@/lib/i18n'

// "/" has no language in the path, so the detector falls through to the shared cookie, then the
// browser language.
const LangRedirect = () => {
  const lang: SupportedLang = i18n.resolvedLanguage === 'pt' ? 'pt' : 'en'
  return <Navigate to={`/${lang}`} replace />
}

export default LangRedirect
