import { useEffect, useRef, useState } from 'react'

import { Menu } from 'lucide-react'

import { usePageTranslation, useSmoothScroll } from '@/lib/hooks'

import { Logo } from '../icons'
import { LanguageSwitcher, ThemeToggle } from '../theme'
import {
  Button,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '../ui'

export type NavBarLink = {
  href: string
  label: string
  active?: boolean
}

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#home')
  const containerRef = useRef<HTMLElement>(null)
  const { t } = usePageTranslation()
  const scrollToSection = useSmoothScroll()

  const defaultNavigationLinks: NavBarLink[] = [
    { href: '#home', label: t('header.nav.home') },
    { href: '#career', label: t('header.nav.career') },
    { href: '#technologies', label: t('header.nav.technologies') },
    // { href: '#projects', label: t('header.nav.projects') },
    { href: '#contact', label: t('header.nav.contact') }
  ]

  const handleNavClick = (href: string) => {
    scrollToSection(href)
    setIsSheetOpen(false)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`)
          }
        })
      },
      {
        rootMargin: '-100px 0px -66%',
        threshold: 0
      }
    )

    const sections = defaultNavigationLinks
      .map((link) => document.querySelector(link.href))
      .filter(Boolean)

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const checkWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        setIsMobile(width < 768)
      }
    }

    checkWidth()

    const resizeObserver = new ResizeObserver(checkWidth)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <header
      ref={containerRef}
      className="bg-background/80 bg-clip-padding backdrop-filter backdrop-blur-md h-20 border-b border-accent fixed top-0 z-20 w-dvw">
      <div className="mx-auto max-w-[calc(84rem)] h-full px-[clamp(1rem,_2.5vw_+_0rem,_2rem)] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Button
            variant="link"
            className="p-0"
            onClick={() => scrollToSection('#home')}
            aria-label={t('header.nav.home')}>
            <Logo />
          </Button>
          {!isMobile && (
            <NavigationMenu className="flex" aria-label={t('header.primary_navigation')}>
              <NavigationMenuList className="gap-1">
                {defaultNavigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <Button
                      variant="ghost"
                      className="text-secondary-foreground font-medium"
                      onClick={() => handleNavClick(link.href)}
                      aria-current={activeSection === link.href ? 'page' : undefined}
                      data-active={activeSection === link.href}>
                      {link.label}
                    </Button>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          {isMobile && (
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={t('header.open_menu')}>
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto flex flex-col gap-4">
                <SheetHeader className="px-2">
                  <SheetTitle className="sr-only">{t('header.mobile_menu')}</SheetTitle>
                  <SheetDescription className="sr-only">
                    {t('header.mobile_menu_description')}
                  </SheetDescription>
                  <Logo className="mb-0" size={24} />
                </SheetHeader>
                <Separator />
                <div className="flex justify-between items-center -mb-2"></div>
                <NavigationMenu className="max-h-fit min-w-full  [&_div]:min-w-full">
                  <NavigationMenuList className="gap-1 flex-col items-start min-w-full">
                    {defaultNavigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index} className="w-full">
                        <Button
                          variant="ghost"
                          className="text-secondary-foreground font-medium min-w-full justify-start px-2"
                          onClick={() => handleNavClick(link.href)}
                          aria-current={activeSection === link.href ? 'page' : undefined}
                          data-active={activeSection === link.href}>
                          {link.label}
                        </Button>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}

export default NavBar
