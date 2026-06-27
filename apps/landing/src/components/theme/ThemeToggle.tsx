import { startTransition, useRef } from 'react'

import { MoonIcon, SunIcon } from 'lucide-react'

import { useTheme } from '@/contexts/ThemeProvider'
import { usePageTranslation } from '@/lib/hooks'

import { Button } from '../ui/button'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const { t } = usePageTranslation()

  const toggleTheme = () => {
    if (!buttonRef.current) return

    const newTheme = theme === 'light' ? 'dark' : 'light'

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const y = top + height / 2
    const x = left + width / 2
    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom))

    document.documentElement.style.setProperty('--vt-x', `${x}px`)
    document.documentElement.style.setProperty('--vt-y', `${y}px`)
    document.documentElement.style.setProperty('--vt-max-rad', `${maxRad}px`)

    startTransition(() => {
      setTheme(newTheme)
    })
  }

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      className="min-w-9"
      onClick={toggleTheme}
      aria-label={t('header.toggle_theme')}>
      {theme === 'light' ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
    </Button>
  )
}

export { ThemeToggle }
