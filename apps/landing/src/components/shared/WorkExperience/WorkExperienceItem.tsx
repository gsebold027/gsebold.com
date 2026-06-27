import { Badge } from '@/components/ui'
import { TypographyH4, TypographyP } from '@/components/ui/typography'
import { usePageTranslation } from '@/lib/hooks'
import { WorkExperienceData } from '@/lib/types'
import { formatWorkPeriod } from '@/lib/utils'

type WorkExperienceItemProps = {
  data: WorkExperienceData
}

const WorkExperienceItem = ({ data }: WorkExperienceItemProps) => {
  const { i18n, t } = usePageTranslation('work-experience')
  const currentLanguage = i18n.resolvedLanguage || i18n.language

  return (
    <div className="flex justify-between w-full flex-row gap-6 md:gap-12 lg:gap-24">
      <div className="h-8 items-center mt-2 w-full max-w-44 hidden md:flex">
        <TypographyP className="text-sm font-mono">
          {formatWorkPeriod(
            data.period.start,
            data.period.end,
            t('current_position'),
            currentLanguage
          )}
        </TypographyP>
      </div>
      <div className="flex relative items-center" aria-hidden="true">
        <div className="absolute top-[1.375rem] left-1/2 -translate-1/2">
          <div className="border border-foreground w-8 md:w-10 absolute top-1/2 -left-1 -translate-y-1/2 z-10"></div>
          <div className="rounded-full bg-background border-2 border-foreground size-[1.125rem] z-20 relative"></div>
        </div>
        <div className="border h-full w-0 border-muted-foreground"></div>
      </div>
      <div className="flex-1 mt-2 flex flex-col gap-2 mb-3">
        <TypographyH4 className="text-2xl">
          {data.company} - {t(`positions.${data.position}`)}
        </TypographyH4>

        <div className="h-8 flex items-center md:hidden">
          <TypographyP className="text-sm font-mono">
            {formatWorkPeriod(
              data.period.start,
              data.period.end,
              t('current_position'),
              currentLanguage
            )}
          </TypographyP>
        </div>
        <div className="flex gap-1 flex-wrap">
          {data.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <ul className="list-disc pl-5 space-y-1">
          {data.responsibilities.map((responsibility) => (
            <li key={responsibility} className="text-sm">
              {t(`responsibilities.${responsibility}`)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { WorkExperienceItem }
