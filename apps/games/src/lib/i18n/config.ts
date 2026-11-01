import {
  PREFERENCE_KEYS,
  PREFERENCE_MAX_AGE_SECONDS,
  sharedCookieDomain
} from '@gsebold/ui/lib/preferences'

export const i18nConfig = {
  fallbackLng: 'en',
  debug: import.meta.env.DEV,

  interpolation: {
    escapeValue: false
  },

  // Same detection as landing: the path decides on /en and /pt, and the shared cookie (see
  // @gsebold/ui/lib/preferences) carries the choice between gsebold.com apps and to "/".
  detection: {
    order: ['path', 'cookie', 'localStorage', 'navigator', 'htmlTag'],
    lookupFromPathIndex: 0,
    caches: ['cookie', 'localStorage'],
    lookupCookie: PREFERENCE_KEYS.language,
    lookupLocalStorage: PREFERENCE_KEYS.language,
    cookieMinutes: PREFERENCE_MAX_AGE_SECONDS / 60,
    cookieDomain: sharedCookieDomain(),
    cookieOptions: { path: '/', sameSite: 'lax' as const }
  }
}
