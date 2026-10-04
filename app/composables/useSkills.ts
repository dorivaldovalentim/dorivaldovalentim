import type { Skill } from '@/data/portfolio'

export const useSkills = () => {
  const { locale } = useLocale()
  const { data } = useAsyncData<Skill[]>('skills', () => $fetch('/api/skills', { query: { locale: locale.value } }), { default: () => [], watch: [locale] })
  return data
}
