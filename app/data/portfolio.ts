export type ProjectStatus = 'Planning' | 'In Progress' | 'Completed' | 'Maintained' | 'Archived'

export type Project = {
  id: string

  title: string
  slug: string

  summary: string
  description: string

  coverImage?: string
  gallery: string[]

  technologies: string[]
  featured?: boolean
  badge?: string
  problem?: string
  solution?: string
  role?: string
  outcome?: string

  status?: string
  statusKey?: ProjectStatus

  startDate?: string
  endDate?: string

  client?: string

  websiteUrl?: string
  repositoryUrl?: string
  demoUrl?: string
}

export type Social = {
  label: string
  url: string
  icon?: string
}

export type ProfileData = {
  name: string
  fullname: string
  role: string
  location?: string
  email: string
  phone?: string
  education?: string
  languages?: string
  headline: string
  intro: string
  bio?: string
  avatar?: string
  funFacts: string[]
  socials: Social[]
}

export type Experience = {
  id: string

  role: string
  company: string
  location?: string

  startDate: string
  endDate?: string

  description?: string
  technologies: string[]
}

export type Achievement = {
  id: string
  title: string
  result: string
  summary: string
  description?: string
  organization: string
  achievementDate: string
  websiteUrl?: string
  teamSize?: number
  technologies: string[]
}

export type Skill = {
  id: string

  name: string
  category?: string
  level?: number
  icon?: string
}
