export const useProjects = () => {
  const projects = ref([])
  const loading = ref(false)
  const error = ref<any>(null)

  const fetchProjects = async () => {
    loading.value = true
    error.value = null
    try {      
      projects.value = await $fetch('/api/projects')      
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { projects, loading, error, fetchProjects }
}