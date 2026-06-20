import { Accordion, AccordionContent, AccordionItem, SingleAccordionTrigger } from '@/components/ui'
import { usePageTranslation } from '@/lib/hooks'

import { WorkExperienceItem } from './WorkExperienceItem'
import { workExperienceData } from './work-experience.data'

const WorkExperience = () => {
  const { t } = usePageTranslation('work-experience')

  const recentExperiences = workExperienceData.slice(0, 1)
  const olderExperiences = workExperienceData.slice(1)

  return (
    <div className="flex flex-col items-center mb-8">
      {recentExperiences.map((experience) => (
        <WorkExperienceItem key={experience.id} data={experience} />
      ))}
      <Accordion className="w-full" type="single" collapsible>
        <AccordionItem value="shipping">
          <AccordionContent className="overflow-visible">
            {olderExperiences.map((experience) => (
              <WorkExperienceItem key={experience.id} data={experience} />
            ))}
          </AccordionContent>
          <SingleAccordionTrigger>{t('show_previous')}</SingleAccordionTrigger>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

export { WorkExperience }
