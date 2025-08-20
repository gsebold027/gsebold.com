import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'

import { ThemeProvider } from './components/ThemeProvider'
import './globals.css'
import './lib/i18n'
import { routes } from './routes'

const router = createBrowserRouter(routes, {})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
