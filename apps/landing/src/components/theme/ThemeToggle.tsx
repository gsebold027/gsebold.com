import { ThemeToggle as SharedThemeToggle } from '@gsebold/ui/components/theme-toggle'

import { usePageTranslation } from '@/lib/hooks'

const ThemeToggle = () => {
  const { t } = usePageTranslation()

  return <SharedThemeToggle label={t('header.toggle_theme')} />
}

export { ThemeToggle }
