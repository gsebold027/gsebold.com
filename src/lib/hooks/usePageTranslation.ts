import { useTranslation } from 'react-i18next'

type i18nNamespaces = 'common' | 'forms' | 'landing-page' | 'not-found-page'

export function usePageTranslation(namespace?: i18nNamespaces | i18nNamespaces[]) {
  const namespaces = namespace
    ? Array.isArray(namespace)
      ? [...namespace, 'common']
      : [namespace, 'common']
    : ['common']

  return useTranslation(namespaces)
}
