import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/lang-redirect.tsx'),
  route(':lang', 'routes/lang-layout.tsx', [index('routes/landing.tsx')]),
  route('*', 'routes/not-found.tsx')
] satisfies RouteConfig
