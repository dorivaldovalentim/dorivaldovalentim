import type { ProfileData } from '@/data/portfolio'

export const useProfile = () => {
  const { data } = useAsyncData<ProfileData>('profile', () => $fetch('/api/profile'))
  return data
}
