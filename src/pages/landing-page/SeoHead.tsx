import { Helmet } from 'react-helmet-async'

import { environment } from '@/environments/environment'
import { usePageTranslation } from '@/lib/hooks'

const OG_IMAGE = `${environment.urls.domain}/og-image.webp`

const SeoHead = () => {
  const { t, i18n } = usePageTranslation('landing-page')
  const lang = i18n.resolvedLanguage || 'en'
  const title = t('meta.title')

  return (
    <Helmet>
      {/* === CORE === */}
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={t('meta.description')} />
      <meta
        name="keywords"
        content="full-stack developer, desenvolvedor full-stack, React, Node.js, TypeScript, NestJS, PostgreSQL, TailwindCSS, Docker, Kubernetes, Curitiba, Brazil, Brasil, web developer, desenvolvedor web, frontend, backend, software engineer, engenheiro de software"
      />
      <meta name="author" content="Gustavo Sebold" />
      <link rel="canonical" href={environment.urls.domain} />

      {/* === INDEXING (enable when live) === */}
      <meta name="robots" content="index, follow" />

      {/* === OPEN GRAPH (Facebook, LinkedIn, WhatsApp) === */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={environment.urls.domain} />
      <meta property="og:title" content="Gustavo Sebold · Full-Stack Developer" />
      <meta property="og:description" content={t('meta.og_description')} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={lang === 'pt' ? 'pt_BR' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'pt' ? 'en_US' : 'pt_BR'} />

      {/* === TWITTER / X CARD === */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={environment.urls.domain} />
      <meta name="twitter:title" content="Gustavo Sebold · Full-Stack Developer" />
      <meta name="twitter:description" content={t('meta.og_description')} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  )
}

export default SeoHead
