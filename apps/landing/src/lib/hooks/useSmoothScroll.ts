import { useCallback } from 'react'

export const useSmoothScroll = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const id = sectionId.replace('#', '')

    if (id === '' || id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [])

  return scrollToSection
}
