import { CONTACT_CONSTRAINTS as C } from '@gsebold/schemas'

import * as z from 'zod'

export const createContactSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(C.name.min, { message: t('contact.fields.name.validation.min') })
      .max(C.name.max, { message: t('contact.fields.name.validation.max') })
      .regex(/^[a-zA-Z\s]+$/, { message: t('contact.fields.name.validation.format') })
      .transform((val) => val.trim()),

    email: z
      .email({ message: t('contact.fields.email.validation.invalid') })
      .min(C.email.min, { message: t('contact.fields.email.validation.min') })
      .max(C.email.max, { message: t('contact.fields.email.validation.max') })
      .transform((val) => val.toLowerCase().trim()),

    subject: z
      .string()
      .min(C.subject.min, { message: t('contact.fields.subject.validation.min') })
      .max(C.subject.max, { message: t('contact.fields.subject.validation.max') })
      .transform((val) => val.trim()),

    message: z
      .string()
      .min(C.message.min, { message: t('contact.fields.message.validation.min') })
      .max(C.message.max, { message: t('contact.fields.message.validation.max') })
      .transform((val) => val.trim())
  })
