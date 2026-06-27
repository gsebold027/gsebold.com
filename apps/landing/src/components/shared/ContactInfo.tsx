import { ReactNode } from 'react'

import { TypographyH3 } from '../ui/typography/heading'
import { TypographyP } from '../ui/typography/paragraph'

type ContactInfoProps = {
  icon: ReactNode
  title: string
  value: string
}

const ContactInfo = ({ icon, title, value }: ContactInfoProps) => (
  <address aria-label={title} className="flex items-center gap-3 not-italic">
    <div
      className="bg-background text-secondary-foreground shadow-2xl aspect-square h-10 rounded-full flex items-center justify-center"
      aria-hidden="true">
      {icon}
    </div>
    <div>
      <TypographyH3
        className="text-sm mb-1"
        id={`${title.toLowerCase().replace(/\s+/g, '-')}-label`}>
        {title}
      </TypographyH3>
      <TypographyP
        className="text-base"
        aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-label`}>
        {value}
      </TypographyP>
    </div>
  </address>
)

export { ContactInfo }
