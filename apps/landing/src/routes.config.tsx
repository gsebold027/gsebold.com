import { Suspense } from 'react'

import { LandingPage, LangLayout, LangRedirect, NotFoundPage, RouteErrorBoundary } from './routes'

export const routes = [
  {
    path: '/',
    element: <LangRedirect />
  },
  {
    path: '/:lang',
    element: <LangLayout />,
    errorElement: (
      <Suspense fallback={null}>
        <RouteErrorBoundary />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <LandingPage />
      }
    ]
  },
  {
    path: '*',
    element: (
      <Suspense fallback={null}>
        <NotFoundPage />
      </Suspense>
    )
  }
]
