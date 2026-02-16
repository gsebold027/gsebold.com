import { MutationOptions, usePost } from '@/lib/facades/query.facade'
import { ContactMeFormTypePayload, ContactMeFormTypeResponse } from '@/lib/types'

export const useContactMe = (
  options?: MutationOptions<ContactMeFormTypePayload, ContactMeFormTypeResponse>
) =>
  usePost<ContactMeFormTypePayload, ContactMeFormTypeResponse>(`/contact/email/contactMe`, {
    ...options
  })
