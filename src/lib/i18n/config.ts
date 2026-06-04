import { environment } from '@/environments/environment'

export const i18nConfig = {
  fallbackLng: 'en',
  debug: import.meta.env.DEV,

  interpolation: {
    escapeValue: false
  },

  detection: {
    order: ['path', 'localStorage', 'navigator', 'htmlTag'],
    lookupFromPathIndex: 0,
    caches: ['localStorage'],
    lookupLocalStorage: environment.localStorageKeys.language
  }
}
