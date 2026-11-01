import { ThemeToggle as SharedThemeToggle } from '@gsebold/ui/components/theme-toggle'

import { useTranslation } from 'react-i18next'

const ThemeToggle = () => {
  const { t } = useTranslation()

  return <SharedThemeToggle label={t('header.toggle_theme')} />
}

export { ThemeToggle }
