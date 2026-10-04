import { ref } from 'vue'

export const useProjects = () => {
  const { locale } = useLocale()
  const projects = ref([])
  const loading = ref(false)
  const error = ref<any>(null)

  const fetchProjects = async () => {
    loading.value = true
    error.value = null
    try {      
      projects.value = await $fetch('/api/projects', { query: { locale: locale.value } })
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  watch(locale, fetchProjects)

  return { projects, loading, error, fetchProjects }
}
