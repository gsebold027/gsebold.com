import { AxiosError } from 'axios'
import { describe, expect, it, vi } from 'vitest'

import { handleRetry } from './query.facade'

vi.mock('@/environments/environment', () => ({
  environment: {
    urls: { baseUrl: 'http://localhost:3001', domain: 'localhost' },
    localStorageKeys: { language: 'i18nextLng', theme: 'theme' }
  }
}))

const makeNetworkError = (): AxiosError => new AxiosError('Network Error')

const makeHttpError = (status: number): AxiosError => {
  const err = new AxiosError('Request failed')
  err.response = { status } as NonNullable<AxiosError['response']>
  return err
}

describe('handleRetry', () => {
  it('does not retry on non-Axios errors', () => {
    expect(handleRetry(0, new Error('generic'))).toBe(false)
  })

  describe('network errors (no response)', () => {
    it('retries on first failure', () => {
      expect(handleRetry(0, makeNetworkError())).toBe(true)
    })

    it('retries up to the third failure', () => {
      expect(handleRetry(2, makeNetworkError())).toBe(true)
    })

    it('stops retrying after three failures', () => {
      expect(handleRetry(3, makeNetworkError())).toBe(false)
    })
  })

  describe('5xx server errors', () => {
    it('retries on first failure', () => {
      expect(handleRetry(0, makeHttpError(500))).toBe(true)
    })

    it('retries up to the third failure', () => {
      expect(handleRetry(2, makeHttpError(503))).toBe(true)
    })

    it('stops retrying after three failures', () => {
      expect(handleRetry(3, makeHttpError(500))).toBe(false)
    })
  })

  describe('4xx client errors', () => {
    it('retries once on the first failure', () => {
      expect(handleRetry(0, makeHttpError(404))).toBe(true)
    })

    it('stops retrying after the second failure', () => {
      expect(handleRetry(1, makeHttpError(404))).toBe(false)
    })

    it('stops retrying on 400', () => {
      expect(handleRetry(1, makeHttpError(400))).toBe(false)
    })

    it('stops retrying on 401', () => {
      expect(handleRetry(1, makeHttpError(401))).toBe(false)
    })
  })
})
