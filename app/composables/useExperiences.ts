import type { Experience } from '@/data/portfolio'

export const useExperiences = () => {
  const { data } = useAsyncData<Experience[]>('experiences', () => $fetch('/api/experiences'), { default: () => [] })
  return data
}
