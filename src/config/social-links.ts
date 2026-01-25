export const socialLinks = {
  linkedin: 'https://linkedin.com/in/gustavosebold',
  github: 'https://github.com/gustavosebold',
  email: 'gustavosebold027@gmail.com'
} as const

export type SocialLink = keyof typeof socialLinks
