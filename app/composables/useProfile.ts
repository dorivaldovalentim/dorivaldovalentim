import type { ProfileData } from '@/data/portfolio'

export const useProfile = () => {
  const { locale } = useLocale()
  const { data } = useAsyncData<ProfileData>('profile', () => $fetch('/api/profile', { query: { locale: locale.value } }), { watch: [locale] })
  return data
}
