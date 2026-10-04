import type { Experience } from '@/data/portfolio'

export const useExperiences = () => {
  const { locale } = useLocale()
  const { data } = useAsyncData<Experience[]>('experiences', () => $fetch('/api/experiences', { query: { locale: locale.value } }), { default: () => [], watch: [locale] })
  return data
}
