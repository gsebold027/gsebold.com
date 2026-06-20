import { requireEnv } from './require-env'

export const environment = {
  localStorageKeys: {
    language: 'i18nextLng',
    theme: 'theme'
  },
  urls: {
    baseUrl: requireEnv('VITE_API_BASE_URL'),
    domain: requireEnv('VITE_DOMAIN')
  }
}
