import { afterEach, describe, expect, it, vi } from 'vitest'

import { requireEnv } from './require-env'

describe('requireEnv', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('returns the value when the variable is set', () => {
    vi.stubEnv('VITE_TEST_VAR', 'hello')
    expect(requireEnv('VITE_TEST_VAR')).toBe('hello')
  })

  it('throws with the variable name when it is missing', () => {
    expect(() => requireEnv('VITE_NONEXISTENT_VAR')).toThrow(
      'Missing required environment variable: VITE_NONEXISTENT_VAR'
    )
  })

  it('throws when the variable is set to an empty string', () => {
    vi.stubEnv('VITE_EMPTY_VAR', '')
    expect(() => requireEnv('VITE_EMPTY_VAR')).toThrow(
      'Missing required environment variable: VITE_EMPTY_VAR'
    )
  })
})
