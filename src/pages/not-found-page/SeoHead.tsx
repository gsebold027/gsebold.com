import { Helmet } from 'react-helmet-async'

import { environment } from '@/environments/environment'
import { usePageTranslation } from '@/lib/hooks'

const OG_IMAGE = `${environment.urls.domain}/og-image.png`

const SeoHead = () => {
  const { t, i18n } = usePageTranslation('not-found-page')
  const lang = i18n.resolvedLanguage || 'en'

  return (
    <Helmet>
      <html lang={lang} />
      <title>{t('meta.title')}</title>
      <meta name="description" content={t('meta.description')} />
      <meta name="author" content="Gustavo Sebold" />
      <link rel="canonical" href={environment.urls.domain} />

      {/* === INDEXING === */}
      <meta name="robots" content={'noindex, nofollow'} />

      {/* === OPEN GRAPH === */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={environment.urls.domain} />
      <meta property="og:title" content={t('meta.title')} />
      <meta property="og:description" content={t('meta.og_description')} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={lang === 'pt' ? 'pt_BR' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'pt' ? 'en_US' : 'pt_BR'} />

      {/* === TWITTER / X CARD === */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={environment.urls.domain} />
      <meta name="twitter:title" content={t('meta.title')} />
      <meta name="twitter:description" content={t('meta.og_description')} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  )
}

export default SeoHead
