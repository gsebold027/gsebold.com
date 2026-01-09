import { useEffect, useRef, useState } from 'react'

import { Menu } from 'lucide-react'

import { usePageTranslation } from '@/lib/hooks'

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
  SheetHeader,
  SheetTrigger
} from '../ui'

type NavBarLink = {
  href: string
  label: string
  active?: boolean
}

const NavBar = () => {
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const { t } = usePageTranslation()

  const defaultNavigationLinks: NavBarLink[] = [
    { href: '#', label: t('header.nav.home') },
    { href: '#carrer', label: t('header.nav.career') },
    { href: '#technologies', label: t('header.nav.technologies') },
    { href: '#projects', label: t('header.nav.projects') },
    { href: '#contact', label: t('header.nav.contact') }
  ]

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
      className="bg-background/80 bg-clip-padding backdrop-filter backdrop-blur-md  h-20 border-b border-accent fixed top-0 z-20 w-dvw">
      <div className="mx-auto max-w-[calc(84rem)] h-full px-[clamp(1rem,_2.5vw_+_0rem,_2rem)] flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          {!isMobile && (
            <NavigationMenu className="flex">
              <NavigationMenuList className="gap-1">
                {defaultNavigationLinks.map((link, index) => (
                  <NavigationMenuItem key={index}>
                    <Button
                      variant="ghost"
                      className="text-secondary-foreground font-medium"
                      onClick={(e) => e.preventDefault()}>
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label={t('header.open_menu')}>
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto flex flex-col gap-4">
                <SheetHeader className="px-2">
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
                          onClick={(e) => e.preventDefault()}>
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
