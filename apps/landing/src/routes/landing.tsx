import { SUPPORTED_LANGS, SupportedLang } from '@/config/languages'
import { environment } from '@/environments/environment'
import i18n from '@/lib/i18n'
import LandingPage from '@/pages/landing-page/LandingPage'
import { notFoundMeta } from '@/pages/not-found-page/meta'

import type { Route } from './+types/landing'

const KEYWORDS =
  'full-stack developer, desenvolvedor full-stack, React, Node.js, TypeScript, NestJS, PostgreSQL, TailwindCSS, Docker, Kubernetes, Curitiba, Brazil, Brasil, web developer, desenvolvedor web, frontend, backend, software engineer, engenheiro de software'

// Written into the prerendered HTML, so crawlers and link previews get the right language.
export const meta = ({ params }: Route.MetaArgs) => {
  // An unsupported language renders the 404 page (see lang-layout), so it gets the 404 tags.
  if (!SUPPORTED_LANGS.includes(params.lang as SupportedLang)) return notFoundMeta()

  const lang = params.lang === 'pt' ? 'pt' : 'en'
  const t = i18n.getFixedT(lang, 'landing-page')
  const domain = environment.urls.domain
  const canonicalUrl = `${domain}/${lang}`
  const ogImage = `${domain}/og-image.webp`
  const title = t('meta.title')
  const ogDescription = t('meta.og_description')

  return [
    { title },
    { name: 'description', content: t('meta.description') },
    { name: 'keywords', content: KEYWORDS },
    { name: 'author', content: 'Gustavo Sebold' },
    { tagName: 'link', rel: 'canonical', href: canonicalUrl },

    // Multilingual signals for Google
    { tagName: 'link', rel: 'alternate', hrefLang: 'pt-BR', href: `${domain}/pt` },
    { tagName: 'link', rel: 'alternate', hrefLang: 'en', href: `${domain}/en` },
    { tagName: 'link', rel: 'alternate', hrefLang: 'x-default', href: `${domain}/en` },

    { name: 'robots', content: 'index, follow' },

    // Open Graph (Facebook, LinkedIn, WhatsApp)
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:title', content: title },
    { property: 'og:description', content: ogDescription },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: lang === 'pt' ? 'pt_BR' : 'en_US' },
    { property: 'og:locale:alternate', content: lang === 'pt' ? 'en_US' : 'pt_BR' },

    // Twitter / X card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:url', content: canonicalUrl },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: ogDescription },
    { name: 'twitter:image', content: ogImage }
  ]
}

export default LandingPage
