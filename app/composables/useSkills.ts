import type { Skill } from '@/data/portfolio'

export const useSkills = () => {
  const { data } = useAsyncData<Skill[]>('skills', () => $fetch('/api/skills'), { default: () => [] })
  return data
}
