import { Button } from '@gsebold/ui/components/button'
import { TypographyH1, TypographyP } from '@gsebold/ui/components/typography'

import { ArrowLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router'

import { BlackjackTable } from '@/games/blackjack/components/BlackjackTable'
import { useDocumentTitle } from '@/lib/hooks/useDocumentTitle'

const BlackjackPage = () => {
  const { t } = useTranslation('blackjack')
  const { lang } = useParams<{ lang: string }>()
  useDocumentTitle(t('meta_title'))

  return (
    <div className="mx-auto max-w-2xl py-8 sm:py-12">
      <Button variant="ghost" size="sm" className="-ml-3 mb-4 text-muted-foreground" asChild>
        <Link to={`/${lang}`}>
          <ArrowLeft aria-hidden="true" />
          {t('back_to_games')}
        </Link>
      </Button>
      <TypographyH1 className="mb-2 font-display font-bold tracking-[-0.03em]">
        {t('title')}
      </TypographyH1>
      <TypographyP className="mb-8 font-pixel text-sm text-muted-foreground">
        {t('rules')}
      </TypographyP>
      <BlackjackTable />
    </div>
  )
}

export default BlackjackPage
