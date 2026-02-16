export type ContactMeFormTypePayload = {
  name: string
  email: string
  subject: string
  message: string
}

export type ContactMeFormTypeResponse = {
  success: boolean
  message: string
  data: {
    success: boolean
    data: {
      emailId: string
      timestamp: string
    }
  }
}
