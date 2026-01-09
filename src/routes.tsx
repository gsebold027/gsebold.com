import Layout from './components/Layout'
import LandingPage from './pages/landing-page/LandingPage'

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
  }
]
