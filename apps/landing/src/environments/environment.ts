import { requireEnv } from './require-env'

export const environment = {
  urls: {
    baseUrl: requireEnv('VITE_API_BASE_URL'),
    domain: requireEnv('VITE_DOMAIN')
  }
}
