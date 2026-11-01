import type { Language } from '@gsebold/ui/components/language-switcher'

export const SUPPORTED_LANGS = ['en', 'pt'] as const
export type SupportedLang = (typeof SUPPORTED_LANGS)[number]

export const LANGUAGES: Language<SupportedLang>[] = [
  { value: 'en', label: 'English', flagReference: 'US' },
  { value: 'pt', label: 'Português', flagReference: 'BR' }
]
