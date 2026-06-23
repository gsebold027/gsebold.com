import { ApiResponse } from './api-response'

export interface ContactFormFields {
  name: string
  email: string
  subject: string
  message: string
}

export const CONTACT_CONSTRAINTS = {
  name:    { min: 2,  max: 50  },
  email:   { min: 5,  max: 100 },
  subject: { min: 5,  max: 100 },
  message: { min: 20, max: 600 },
} as const

export interface ContactFormResponseData {
  emailId: string
}

export type ContactFormResponse = ApiResponse<ContactFormResponseData>
