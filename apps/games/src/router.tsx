import { createBrowserRouter } from 'react-router'

import LangRedirect from './routes/LangRedirect'

// Pages load per route so the entry chunk stays React, the router and i18n.
export const routes = [
  { index: true, element: <LangRedirect /> },
  {
    path: ':lang',
    lazy: async () => ({ Component: (await import('./routes/LangLayout')).default }),
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import('./pages/HubPage')).default })
      }
    ]
  },
  {
    path: '*',
    lazy: async () => ({ Component: (await import('./pages/NotFoundPage')).default })
  }
]

export const router = createBrowserRouter(routes)
