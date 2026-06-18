export const SUPPORTED_LANGS = ['en', 'pt'] as const
export type SupportedLang = (typeof SUPPORTED_LANGS)[number]
