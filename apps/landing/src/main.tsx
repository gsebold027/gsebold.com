import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { StrictMode, useMemo } from 'react'

import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider, createBrowserRouter } from 'react-router'

import { ThemeProvider } from './contexts/ThemeProvider'
import './globals.css'
import axios, { AxiosContext } from './lib/facades/axios.facade'
import './lib/i18n'
import { routes } from './routes'

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const axiosValue = useMemo(() => axios, [])

  return <AxiosContext.Provider value={axiosValue}>{children}</AxiosContext.Provider>
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5 // 5 minutes
    }
  }
})

const router = createBrowserRouter(routes, {})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <AxiosProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark">
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </AxiosProvider>
    </HelmetProvider>
  </StrictMode>
)
