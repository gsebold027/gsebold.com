import { lazy } from 'react'

import Layout from './components/Layout'

const LandingPage = lazy(() => import('@/pages/landing-page/LandingPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
]
