import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'

import { afterEach, expect } from 'vitest'

expect.extend(matchers)

// Testing Library only auto-cleans when vitest globals are on; they're off here.
afterEach(cleanup)

// jsdom has no ResizeObserver; DotPattern (@gsebold/ui) measures its container with one.
globalThis.ResizeObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
}
