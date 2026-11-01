import { Card, CardDescription, CardHeader, CardTitle } from '@gsebold/ui/components/card'
import { TypographyH1, TypographyP } from '@gsebold/ui/components/typography'

import { ArrowRight, Spade } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'

import { useDocumentTitle } from '@/lib/hooks/useDocumentTitle'

const HubPage = () => {
  const { t } = useTranslation('hub')
  const { lang } = useParams<{ lang: string }>()
  useDocumentTitle(t('meta.title'))

  return (
    <>
      <section className="py-[clamp(3rem,_8vw,_6rem)]" aria-labelledby="hub-heading">
        <TypographyP className="text-base font-pixel text-primary-text mb-2" aria-hidden="true">
          {t('greeting')}
        </TypographyP>
        <TypographyH1 id="hub-heading" className="mb-4 font-display font-bold tracking-[-0.03em]">
          {t('title')}
        </TypographyH1>
        <TypographyP className="max-w-xl text-muted-foreground">{t('subtitle')}</TypographyP>
      </section>

      <ul className="grid gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-3" aria-label={t('list_label')}>
        <li>
          {/* Press feedback (scale 0.98, 160ms ease-out); the hover border only on hover-capable
              pointers so a tap doesn't leave it stuck. */}
          <Link
            to={`/${lang}/blackjack`}
            className="group block h-full rounded-xl transition-transform duration-150 ease-out active:scale-[0.98]">
            <Card className="h-full transition-colors duration-150 [@media(hover:hover)]:group-hover:border-primary/60">
              <CardHeader>
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary-text">
                    <Spade size={20} aria-hidden="true" />
                  </span>
                  <ArrowRight size={18} className="text-muted-foreground" aria-hidden="true" />
                </div>
                <CardTitle>{t('games.blackjack.title')}</CardTitle>
                <CardDescription>{t('games.blackjack.description')}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </li>
      </ul>
    </>
  )
}

export default HubPage
