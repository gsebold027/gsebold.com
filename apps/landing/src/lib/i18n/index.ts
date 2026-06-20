import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { i18nConfig } from './config'
import { translations } from './locales/translations'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: translations,
    ...i18nConfig
  })

export default i18n
export { i18nConfig }
