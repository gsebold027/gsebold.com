import { useRef } from 'react'

import { MoonIcon, SunIcon } from 'lucide-react'
import { flushSync } from 'react-dom'

import { useTheme } from '@/contexts/ThemeProvider'
import { usePageTranslation } from '@/lib/hooks'

import { Button } from './ui'

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const { t } = usePageTranslation()

  const toggleTheme = async () => {
    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
      })
    }).ready

    const { top, left, width, height } = buttonRef.current.getBoundingClientRect()
    const y = top + height / 2
    const x = left + width / 2

    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom))

    document.documentElement.animate(
      {
        clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${maxRad}px at ${x}px ${y}px)`]
      },
      {
        duration: 700,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)'
      }
    )
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
