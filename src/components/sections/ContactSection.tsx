import { Mail, MapPin } from 'lucide-react'

import { usePageTranslation } from '@/lib/hooks'

import { ContactForm } from '../forms'
import { ContactInfo } from '../shared'
import { TypographyH2, TypographyP } from '../ui/typography'

const ContactSection = () => {
  const { t } = usePageTranslation('landing-page')

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-[clamp(1rem,_2.5vw_+_0rem,_2rem)] flex items-center relative gap-8 md:gap-16 flex-col md:flex-row">
      <div className="w-full">
        <TypographyP className="text-base font-mono text-primary mb-2" aria-hidden="true">
          {t('contact.section_label')}
        </TypographyP>
        <TypographyH2 id="contact-heading" className="mb-[clamp(1rem,_2.5vw_+_0rem,_2rem)]">
          {t('contact.title')}
        </TypographyH2>
        <TypographyP className="max-w-xl mb-8">{t('contact.description')}</TypographyP>
        <div
          className="flex flex-col gap-4"
          role="list"
          aria-label={t('contact.contact_info_aria')}>
          <div role="listitem">
            <ContactInfo
              icon={<Mail />}
              title={t('contact.email_label')}
              value={t('contact.email_value')}
            />
          </div>
          <div role="listitem">
            <ContactInfo
              icon={<MapPin />}
              title={t('contact.location_label')}
              value={t('contact.location_value')}
            />
          </div>
        </div>
      </div>
      <ContactForm />
    </section>
  )
}

export default ContactSection
