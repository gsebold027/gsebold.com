import { LanguageSwitcher as SharedLanguageSwitcher } from '@gsebold/ui/components/language-switcher'

import { useNavigate } from 'react-router'

import { LANGUAGES, SupportedLang } from '@/config/languages'
import { usePageTranslation } from '@/lib/hooks'

// The language lives in the path (/en, /pt), so switching navigates; the detector then caches it.
const LanguageSwitcher = () => {
  const { i18n, t } = usePageTranslation()
  const navigate = useNavigate()

  return (
    <SharedLanguageSwitcher
      languages={LANGUAGES}
      current={i18n.resolvedLanguage || i18n.language}
      onChange={(lng: SupportedLang) => navigate(`/${lng}`, { replace: true })}
      label={t('header.select_language')}
    />
  )
}

export { LanguageSwitcher }
