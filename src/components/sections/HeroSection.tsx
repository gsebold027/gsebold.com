import { useRef } from 'react'

import { ChevronsDown, Mouse } from 'lucide-react'

import { usePageTranslation, useSmoothScroll } from '@/lib/hooks'

import { Button } from '../ui'
import { TypographyH1, TypographyH2, TypographyP } from '../ui/typography'

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  const { t } = usePageTranslation('landing-page')
  const scrollToSection = useSmoothScroll()

  const scrollPastCurrent = () => {
    const el = heroRef.current
    if (!el) return

    const heroBottom = el.getBoundingClientRect().bottom + window.scrollY

    const FIXED_HEADER_OFFSET = 80

    window.scrollTo({
      top: heroBottom - FIXED_HEADER_OFFSET,
      behavior: 'smooth'
    })
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-dvh py-[clamp(1rem,_2.5vw_+_0rem,_2rem)] flex items-center relative"
      aria-labelledby="hero-heading">
      <div className="max-w-4xl xl:px-0">
        <TypographyP className="text-base font-mono text-primary mb-2" aria-hidden="true">
          {t('hero.greeting')}
        </TypographyP>
        <TypographyH1 id="hero-heading" className="mb-4">
          Gustavo Sebold
        </TypographyH1>
        <TypographyH2 className="mb-[clamp(1rem,_2.5vw_+_0rem,_2rem)] text-muted-foreground">
          {t('hero.tagline')}
        </TypographyH2>
        <TypographyP className="max-w-xl mb-8">{t('hero.description')}</TypographyP>
        <Button
          variant="outline"
          size="lg"
          onClick={() => scrollToSection('#contact')}
          aria-label={t('hero.cta_aria_label')}>
          {t('hero.cta')}
        </Button>
      </div>

      <Button
        className="text-muted-foreground absolute left-1/2 bottom-5 translate-x-[-50%] flex-col h-auto hover:bg-transparent px-2"
        variant="ghost"
        onClick={scrollPastCurrent}
        aria-label={t('hero.scroll_next_section')}>
        <Mouse size={24} aria-hidden="true" />
        <ChevronsDown size={24} aria-hidden="true" />
        <span className="sr-only">{t('hero.scroll_next_section')}</span>
      </Button>
    </section>
  )
}

export default HeroSection
