import 'react-i18next'

import { translations } from './locales/translations'

declare module 'react-i18next' {
  type CustomTypeOptions = {
    defaultNS: 'common'
    resources: translations.en
  }
}
