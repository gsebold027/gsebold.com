import { act, render, screen, waitFor } from '@testing-library/react'

import { RouterProvider, createMemoryRouter } from 'react-router'
import { afterEach, describe, expect, it } from 'vitest'

import i18n from '@/lib/i18n'

import { routes } from './router'

const renderAt = async (path: string) => {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  await act(async () => {
    render(<RouterProvider router={router} />)
  })
  return router
}

describe('routes', () => {
  afterEach(async () => {
    await i18n.changeLanguage('en')
  })

  it('redirects / to the detected language', async () => {
    await i18n.changeLanguage('pt')
    const router = await renderAt('/')
    await waitFor(() => expect(router.state.location.pathname).toBe('/pt'))
  })

  it('renders the hub in the path language', async () => {
    await renderAt('/pt')
    expect(await screen.findByRole('heading', { level: 1, name: 'Jogos' })).toBeInTheDocument()
    expect(document.documentElement.lang).toBe('pt-BR')
  })

  it('renders the 404 page for an unsupported language', async () => {
    await renderAt('/xx')
    expect(await screen.findByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })

  it('renders the 404 page for an unknown path', async () => {
    await renderAt('/en/nope')
    expect(await screen.findByRole('heading', { name: 'Page not found' })).toBeInTheDocument()
  })
})
