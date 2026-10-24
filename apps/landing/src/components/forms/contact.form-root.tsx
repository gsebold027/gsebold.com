import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { useState } from 'react'

import axios, { AxiosContext } from '@/lib/facades/axios.facade'

import { ContactForm } from './contact.form'

const ContactFormRoot = () => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5 // 5 minutes
          }
        }
      })
  )

  return (
    <AxiosContext.Provider value={axios}>
      <QueryClientProvider client={queryClient}>
        <ContactForm />
      </QueryClientProvider>
    </AxiosContext.Provider>
  )
}

export default ContactFormRoot
