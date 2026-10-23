import type { Achievement } from '@/data/portfolio'

export const useAchievements = () => {
  const { locale } = useLocale()
  const { data } = useAsyncData<Achievement[]>('achievements', () => $fetch('/api/achievements', { query: { locale: locale.value } }), { default: () => [], watch: [locale] })
  return data
}
