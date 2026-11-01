import { LanguageSwitcher as SharedLanguageSwitcher } from '@gsebold/ui/components/language-switcher'

import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'

import { LANGUAGES, SupportedLang } from '@/config/languages'

// The language is the first path segment (/en/blackjack), so switching swaps that segment and
// keeps the rest of the path; the detector then caches the choice in the shared cookie.
const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const changeLanguage = (lng: SupportedLang) => {
    const rest = pathname.split('/').slice(2).join('/')
    navigate(rest ? `/${lng}/${rest}` : `/${lng}`, { replace: true })
  }

  return (
    <SharedLanguageSwitcher
      languages={LANGUAGES}
      current={i18n.resolvedLanguage || i18n.language}
      onChange={changeLanguage}
      label={t('header.select_language')}
    />
  )
}

export { LanguageSwitcher }
