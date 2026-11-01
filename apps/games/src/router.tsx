import { createBrowserRouter } from 'react-router'

import LangRedirect from './routes/LangRedirect'

// Lazy routes render nothing while their chunk loads (React Router warns without a fallback).
const Loading = () => null

// Pages load per route so the entry chunk stays React, the router and i18n.
export const routes = [
  { index: true, element: <LangRedirect /> },
  {
    path: ':lang',
    HydrateFallback: Loading,
    lazy: async () => ({ Component: (await import('./routes/LangLayout')).default }),
    children: [
      {
        index: true,
        lazy: async () => ({ Component: (await import('./pages/HubPage')).default })
      },
      {
        path: 'blackjack',
        lazy: async () => ({ Component: (await import('./pages/BlackjackPage')).default })
      }
    ]
  },
  {
    path: '*',
    HydrateFallback: Loading,
    lazy: async () => ({ Component: (await import('./pages/NotFoundPage')).default })
  }
]

export const router = createBrowserRouter(routes)
