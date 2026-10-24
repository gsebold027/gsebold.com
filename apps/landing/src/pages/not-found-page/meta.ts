import { environment } from '@/environments/environment'
import i18n from '@/lib/i18n'

// Shared by the catch-all route and by /:lang when the language isn't supported.
export const notFoundMeta = () => {
  const lang = i18n.resolvedLanguage === 'pt' ? 'pt' : 'en'
  const t = i18n.getFixedT(lang, 'not-found-page')
  const domain = environment.urls.domain
  const ogImage = `${domain}/og-image.png`
  const title = t('meta.title')
  const ogDescription = t('meta.og_description')

  return [
    { title },
    { name: 'description', content: t('meta.description') },
    { name: 'author', content: 'Gustavo Sebold' },
    { tagName: 'link', rel: 'canonical', href: domain },
    { name: 'robots', content: 'noindex, nofollow' },

    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: domain },
    { property: 'og:title', content: title },
    { property: 'og:description', content: ogDescription },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: lang === 'pt' ? 'pt_BR' : 'en_US' },
    { property: 'og:locale:alternate', content: lang === 'pt' ? 'en_US' : 'pt_BR' },

    // Twitter / X card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: domain },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: ogDescription },
    { name: 'twitter:image', content: ogImage }
  ]
}
