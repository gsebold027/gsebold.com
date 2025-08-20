import App from './App'
import Layout from './components/Layout'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      }
    ]
  }
]
