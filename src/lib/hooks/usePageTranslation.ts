import { useTranslation } from 'react-i18next'

type i18nNamespaces = 'landing-page' | 'forms'

export function usePageTranslation(namespace?: i18nNamespaces | i18nNamespaces[]) {
  const namespaces = namespace
    ? Array.isArray(namespace)
      ? [...namespace, 'common']
      : [namespace, 'common']
    : ['common']

  return useTranslation(namespaces)
}
