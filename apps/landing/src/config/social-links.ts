export const socialLinks = {
  linkedin: 'https://www.linkedin.com/in/gustavo-sebold',
  github: 'https://github.com/gsebold027',
  email: 'gustavosebold027@gmail.com'
} as const

export type SocialLink = keyof typeof socialLinks
