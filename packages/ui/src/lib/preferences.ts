// Theme and language are shared by every gsebold.com app through cookies on the parent domain.
// localStorage is per origin, so it is only a fallback: hosts where the cookie can't be set on a
// parent domain (localhost, IPs, preview hosts) and visitors who chose before the cookie existed.

export const PREFERENCE_KEYS = {
  theme: 'theme',
  // i18next's own localStorage key, kept so choices saved before the cookie still apply.
  language: 'i18nextLng'
} as const

export const PREFERENCE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

// "gsebold.com" and "games.gsebold.com" both share "gsebold.com". On localhost or an IP there is
// no parent domain, so the cookie stays host-only (cookies ignore ports, so local apps still share).
export const sharedCookieDomain = (): string | undefined => {
  if (typeof location === 'undefined') return undefined
  const { hostname } = location
  if (hostname === 'localhost' || /^[\d.]+$/.test(hostname) || hostname.includes(':')) {
    return undefined
  }
  return hostname.split('.').slice(-2).join('.')
}

export const readPreference = (key: string): string | null => {
  const match = document.cookie.match(new RegExp(`(?:^|; )${key}=([^;]*)`))
  if (match) return decodeURIComponent(match[1])
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export const writePreference = (key: string, value: string) => {
  const domain = sharedCookieDomain()
  document.cookie = [
    `${key}=${encodeURIComponent(value)}`,
    'path=/',
    `max-age=${PREFERENCE_MAX_AGE_SECONDS}`,
    'samesite=lax',
    domain && `domain=${domain}`,
    location.protocol === 'https:' && 'secure'
  ]
    .filter(Boolean)
    .join('; ')
  try {
    localStorage.setItem(key, value)
  } catch {
    // Storage blocked: the cookie alone carries the preference.
  }
}
