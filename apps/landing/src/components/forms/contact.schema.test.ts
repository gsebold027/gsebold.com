import { describe, expect, it } from 'vitest'

import { createContactSchema } from './contact.schema'

const t = (key: string) => key
const schema = createContactSchema(t)

const valid = {
  name: 'John Doe',
  email: 'john@example.com',
  subject: 'Hello there',
  message: 'This is a test message that is long enough to pass validation.'
}

describe('contactSchema', () => {
  it('passes with valid input', () => {
    expect(schema.safeParse(valid).success).toBe(true)
  })

  describe('name', () => {
    it('rejects names shorter than 2 characters', () => {
      const result = schema.safeParse({ ...valid, name: 'A' })
      expect(result.success).toBe(false)
      if (!result.success)
        expect(result.error.issues[0].message).toBe('contact.fields.name.validation.min')
    })

    it('rejects names longer than 50 characters', () => {
      expect(schema.safeParse({ ...valid, name: 'A'.repeat(51) }).success).toBe(false)
    })

    it('rejects names with numbers or special characters', () => {
      const result = schema.safeParse({ ...valid, name: 'John123' })
      expect(result.success).toBe(false)
      if (!result.success)
        expect(result.error.issues[0].message).toBe('contact.fields.name.validation.format')
    })

    it('accepts names with spaces', () => {
      expect(schema.safeParse({ ...valid, name: 'John Doe' }).success).toBe(true)
    })
  })

  describe('email', () => {
    it('rejects invalid email formats', () => {
      const result = schema.safeParse({ ...valid, email: 'not-an-email' })
      expect(result.success).toBe(false)
      if (!result.success)
        expect(result.error.issues[0].message).toBe('contact.fields.email.validation.invalid')
    })

    it('rejects emails shorter than 5 characters', () => {
      expect(schema.safeParse({ ...valid, email: 'a@b' }).success).toBe(false)
    })

    it('lowercases the email on success', () => {
      const result = schema.safeParse({ ...valid, email: 'JOHN@EXAMPLE.COM' })
      expect(result.success).toBe(true)
      if (result.success) expect(result.data.email).toBe('john@example.com')
    })
  })

  describe('subject', () => {
    it('rejects subjects shorter than 5 characters', () => {
      const result = schema.safeParse({ ...valid, subject: 'Hi' })
      expect(result.success).toBe(false)
      if (!result.success)
        expect(result.error.issues[0].message).toBe('contact.fields.subject.validation.min')
    })

    it('rejects subjects longer than 100 characters', () => {
      expect(schema.safeParse({ ...valid, subject: 'A'.repeat(101) }).success).toBe(false)
    })
  })

  describe('message', () => {
    it('rejects messages shorter than 20 characters', () => {
      const result = schema.safeParse({ ...valid, message: 'Too short' })
      expect(result.success).toBe(false)
      if (!result.success)
        expect(result.error.issues[0].message).toBe('contact.fields.message.validation.min')
    })

    it('rejects messages longer than 600 characters', () => {
      expect(schema.safeParse({ ...valid, message: 'A'.repeat(601) }).success).toBe(false)
    })
  })
})
