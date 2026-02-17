import { useState } from 'react'

import { Check, Copy, Github, Heart, Linkedin } from 'lucide-react'
import { Link } from 'react-router'

import { socialLinks } from '@/config/social-links'
import { usePageTranslation, useSmoothScroll } from '@/lib/hooks'

import { Logo } from '../icons'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  Separator,
  ShineBorder
} from '../ui'
import { TypographyH3, TypographyH4, TypographyP } from '../ui/typography'
import { NavBarLink } from './NavBar'

const Footer = () => {
  const { t } = usePageTranslation()
  const [copied, setCopied] = useState(false)
  const scrollToSection = useSmoothScroll()

  const currentYear = new Date().getFullYear()
  const email = t('footer.email_value')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy email:', err)
    }
  }

  const defaultNavigationLinks: NavBarLink[] = [
    { href: '#home', label: t('header.nav.home') },
    { href: '#career', label: t('header.nav.career') },
    { href: '#technologies', label: t('header.nav.technologies') },
    // { href: '#projects', label: t('header.nav.projects') },
    { href: '#contact', label: t('header.nav.contact') }
  ]

  return (
    <footer
      className="bg-background py-[clamp(2rem,_4.5vw_+_0rem,_3rem)] relative overflow-hidden border-t border-accent"
      aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        {t('footer.footer_heading')}
      </h2>
      <div className="mx-auto max-w-[calc(84rem)] px-[clamp(1rem,_2.5vw_+_0rem,_2rem)] flex flex-col gap-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <section aria-labelledby="brand-heading">
            <h3 id="brand-heading" className="sr-only">
              {t('footer.brand_section')}
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3 items-center">
                <Logo
                  className="size-[clamp(1.25rem,_1.563vw_+_0.625rem,_1.875rem)]"
                  aria-hidden="true"
                />
                <TypographyH3 className="mb-0">Gustavo Sebold</TypographyH3>
              </div>
              <TypographyP className="text-muted-foreground">{t('footer.tagline')}</TypographyP>
              <ul className="flex gap-4 list-none p-0" aria-label={t('footer.social_links')}>
                <li>
                  <Button className="rounded-full" variant="secondary" size="icon" asChild>
                    <Link
                      to={socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t('footer.linkedin_profile')}>
                      <Linkedin aria-hidden="true" />
                    </Link>
                  </Button>
                </li>
                <li>
                  <Button className="rounded-full" variant="secondary" size="icon" asChild>
                    <Link
                      to={socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t('footer.github_profile')}>
                      <Github aria-hidden="true" />
                    </Link>
                  </Button>
                </li>
              </ul>
            </div>
          </section>

          {/* Navigation Section */}
          <section aria-labelledby="footer-navigation-heading">
            <div className="flex flex-col gap-3">
              <TypographyH4 id="footer-navigation-heading">{t('footer.navigation')}</TypographyH4>
              <nav aria-label={t('footer.footer_navigation')}>
                <NavigationMenu className="max-h-fit min-w-full [&_div]:min-w-full">
                  <NavigationMenuList className="gap-2 flex-col items-start min-w-full">
                    {defaultNavigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        <Button
                          variant="link"
                          className="text-secondary-foreground font-medium min-w-full justify-start hover:text-accent-foreground transition-colors p-0 h-auto"
                          onClick={() => scrollToSection(link.href)}>
                          {link.label}
                        </Button>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>
              </nav>
            </div>
          </section>

          {/* Contact Section */}
          <section className="md:col-span-2 relative" aria-labelledby="contact-heading">
            <h3 id="contact-heading" className="sr-only">
              {t('footer.contact_section')}
            </h3>
            <Card>
              <CardHeader>
                <CardTitle>{t('footer.contact_card.title')}</CardTitle>
                <CardDescription>{t('footer.contact_card.description')}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={copyEmail}
                  variant="link"
                  className="flex items-center gap-2 group text-accent-foreground p-0"
                  aria-label={
                    copied
                      ? t('footer.contact_card.email_copied')
                      : t('footer.contact_card.copy_email')
                  }
                  title={
                    copied
                      ? t('footer.contact_card.email_copied')
                      : t('footer.contact_card.copy_email')
                  }>
                  <span>{email}</span>
                  {copied ? (
                    <Check className="size-4 text-green-500" aria-hidden="true" />
                  ) : (
                    <Copy className="size-4" aria-hidden="true" />
                  )}
                </Button>
              </CardContent>
              <CardFooter>
                <Button
                  className="rounded-full"
                  variant="secondary"
                  onClick={() => scrollToSection('#home')}
                  aria-label={t('footer.back_to_top')}>
                  {t('footer.back_to_top')}
                </Button>
              </CardFooter>
              <ShineBorder />
            </Card>
          </section>
        </div>

        <Separator role="presentation" />

        {/* Copyright Section */}
        <div className="flex flex-col items-center md:justify-between md:flex-row gap-2">
          <TypographyP className="text-muted-foreground text-sm mb-0">
            © {currentYear} Gustavo Sebold
          </TypographyP>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>{t('footer.made_with')}</span>
            <Heart className="size-4 fill-red-500 text-red-500" aria-label={t('footer.love')} />
            <span>{t('footer.location')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
