import * as z from 'zod'

export const createContactSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .min(2, { message: t('contact.fields.name.validation.min') })
      .max(50, { message: t('contact.fields.name.validation.max') })
      .regex(/^[a-zA-Z\s]+$/, { message: t('contact.fields.name.validation.format') })
      .transform((val) => val.trim()),

    email: z
      .email({ message: t('contact.fields.email.validation.invalid') })
      .min(5, { message: t('contact.fields.email.validation.min') })
      .max(100, { message: t('contact.fields.email.validation.max') })
      .transform((val) => val.toLowerCase().trim()),

    subject: z
      .string()
      .min(5, { message: t('contact.fields.subject.validation.min') })
      .max(100, { message: t('contact.fields.subject.validation.max') })
      .transform((val) => val.trim()),

    message: z
      .string()
      .min(20, { message: t('contact.fields.message.validation.min') })
      .max(600, { message: t('contact.fields.message.validation.max') })
      .transform((val) => val.trim())
  })
