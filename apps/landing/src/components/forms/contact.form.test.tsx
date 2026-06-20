import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { toast } from 'sonner'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { ContactForm } from './contact.form'
import { useContactMe } from './contact.service'

vi.mock('@/environments/environment', () => ({
  environment: {
    urls: { baseUrl: 'http://localhost:3001', domain: 'localhost' },
    localStorageKeys: { language: 'i18nextLng', theme: 'theme' }
  }
}))

vi.mock('@/lib/hooks', () => ({
  usePageTranslation: () => ({ t: (key: string) => key })
}))

vi.mock('./contact.service', () => ({
  useContactMe: vi.fn()
}))

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), warning: vi.fn(), error: vi.fn() }
}))

const mockMutate = vi.fn()

const setupMutation = (overrides: Record<string, unknown> = {}) => {
  vi.mocked(useContactMe).mockReturnValue({
    mutate: mockMutate,
    isPending: false,
    ...overrides
  } as unknown as ReturnType<typeof useContactMe>)
}

beforeEach(() => {
  vi.clearAllMocks()
  setupMutation()
})

afterEach(() => {
  cleanup()
})

const fillAndSubmit = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByPlaceholderText('contact.fields.name.placeholder'), 'John Doe')
  await user.type(
    screen.getByPlaceholderText('contact.fields.email.placeholder'),
    'john@example.com'
  )
  await user.type(screen.getByPlaceholderText('contact.fields.subject.placeholder'), 'Hello there')
  await user.type(
    screen.getByPlaceholderText('contact.fields.message.placeholder'),
    'This is a test message that is long enough to pass validation.'
  )
  await user.click(screen.getByRole('button', { name: 'contact.submit_button' }))
}

describe('ContactForm', () => {
  it('renders all form fields', () => {
    render(<ContactForm />)
    expect(screen.getByPlaceholderText('contact.fields.name.placeholder')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('contact.fields.email.placeholder')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('contact.fields.subject.placeholder')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('contact.fields.message.placeholder')).toBeInTheDocument()
  })

  it('shows validation errors when submitted with empty fields', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await user.click(screen.getByRole('button', { name: 'contact.submit_button' }))

    await waitFor(() => {
      expect(screen.getAllByRole('alert').length).toBeGreaterThanOrEqual(1)
    })
  })

  it('disables the submit button while the mutation is pending', () => {
    setupMutation({ isPending: true })
    render(<ContactForm />)

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls mutate with the form values on a valid submission', async () => {
    const user = userEvent.setup()
    render(<ContactForm />)

    await fillAndSubmit(user)

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Hello there',
        message: 'This is a test message that is long enough to pass validation.'
      })
    })
  })

  it('shows a success toast after a successful submission', async () => {
    const user = userEvent.setup()

    vi.mocked(useContactMe).mockImplementation(
      (options) =>
        ({
          mutate: () =>
            options?.onSuccess?.(
              undefined as never,
              undefined as never,
              undefined as never,
              undefined as never
            ),
          isPending: false
        }) as unknown as ReturnType<typeof useContactMe>
    )

    render(<ContactForm />)

    await fillAndSubmit(user)

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'contact.notifications.success.title',
        expect.objectContaining({ description: 'contact.notifications.success.description' })
      )
    })
  })

  it('shows a warning toast after a failed submission', async () => {
    const user = userEvent.setup()

    vi.mocked(useContactMe).mockImplementation(
      (options) =>
        ({
          mutate: () =>
            options?.onError?.(
              new Error('Server error'),
              undefined as never,
              undefined as never,
              undefined as never
            ),
          isPending: false
        }) as unknown as ReturnType<typeof useContactMe>
    )

    render(<ContactForm />)

    await fillAndSubmit(user)

    await waitFor(() => {
      expect(toast.warning).toHaveBeenCalledWith(
        'contact.notifications.warning.title',
        expect.objectContaining({ description: 'contact.notifications.warning.description' })
      )
    })
  })
})
