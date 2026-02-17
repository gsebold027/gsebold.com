export type WorkExperienceData = {
  id: string
  company: string
  position: string
  period: {
    start: Date
    end: Date | null // null for current job
  }
  tags: string[]
  responsibilities: string[]
  current?: boolean
}

export type WorkExperienceTranslations = {
  company: string
  position: string
  responsibilities: string[]
}
