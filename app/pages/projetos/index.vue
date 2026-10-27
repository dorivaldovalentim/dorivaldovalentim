<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'
import { ref, watch, computed, onMounted } from 'vue'
import { type Project, type ProjectStatus } from '~/data/portfolio'
import { projectCover } from '~/utils/projectCover'

const { projects, loading, error, fetchProjects } = useProjects()
const { locale, t } = useLocale()

const selectedProject = ref<Project | null>(null)
const searchQuery = ref('')
const selectedStatus = ref<ProjectStatus | 'all'>('all')
const selectedTechnology = ref('all')
const selectedClient = ref('all')

onMounted(async () => {
  await fetchProjects()
})

const normalizeText = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLocaleLowerCase(locale.value === 'pt' ? 'pt-AO' : 'en')

const matchesSearch = (project: Project) => {
  const query = normalizeText(searchQuery.value.trim())
  return !query || [project.title, project.summary, project.client ?? '', ...project.technologies]
    .some(value => normalizeText(value).includes(query))
}

const matchesTechnology = (project: Project) => selectedTechnology.value === 'all' || project.technologies
  .some(technology => normalizeText(technology) === selectedTechnology.value)

const matchesClient = (project: Project) => selectedClient.value === 'all' || normalizeText(project.client ?? '') === selectedClient.value

const filteredProjects = computed(() => projects.value.filter(project =>
  (selectedStatus.value === 'all' || project.statusKey === selectedStatus.value) &&
  matchesTechnology(project) &&
  matchesClient(project) &&
  matchesSearch(project)
))

const technologyOptions = computed(() => {
  const labels = new Map<string, string>()

  projects.value.flatMap(project => project.technologies).forEach((technology) => {
    const value = normalizeText(technology)
    const current = labels.get(value)
    if (!current || technology !== technology.toLocaleLowerCase()) labels.set(value, technology)
  })

  return [...labels].map(([value, label]) => ({
    value,
    label,
    count: projects.value.filter(project =>
      (selectedStatus.value === 'all' || project.statusKey === selectedStatus.value) &&
      project.technologies.some(technology => normalizeText(technology) === value) &&
      matchesClient(project) &&
      matchesSearch(project)
    ).length
  })).filter(option => option.count > 0 || option.value === selectedTechnology.value)
    .sort((a, b) => a.label.localeCompare(b.label, locale.value))
})

const clientOptions = computed(() => {
  const labels = new Map<string, string>()

  projects.value.forEach((project) => {
    if (project.client?.trim()) labels.set(normalizeText(project.client), project.client.trim())
  })

  return [...labels].map(([value, label]) => ({
    value,
    label,
    count: projects.value.filter(project =>
      normalizeText(project.client ?? '') === value &&
      (selectedStatus.value === 'all' || project.statusKey === selectedStatus.value) &&
      matchesTechnology(project) &&
      matchesSearch(project)
    ).length
  })).filter(option => option.count > 0 || option.value === selectedClient.value)
    .sort((a, b) => a.label.localeCompare(b.label, locale.value))
})

const hasActiveFilters = computed(() => Boolean(searchQuery.value.trim()) || selectedStatus.value !== 'all' || selectedTechnology.value !== 'all' || selectedClient.value !== 'all')

const clearFilters = () => {
  searchQuery.value = ''
  selectedStatus.value = 'all'
  selectedTechnology.value = 'all'
  selectedClient.value = 'all'
}

const openProject = (project: Project) => {
  selectedProject.value = project
}

const closeProject = () => {
  selectedProject.value = null
}

const statusOptions = computed(() => {
  const options: { value: ProjectStatus | 'all', label: string }[] = [
    { value: 'all', label: t('all') },
    { value: 'Planning', label: t('planning') },
    { value: 'In Progress', label: t('inProgress') },
    { value: 'Completed', label: t('completed') },
    { value: 'Maintained', label: t('maintained') },
    { value: 'Archived', label: t('archived') }
  ]

  return options.map(status => ({
    ...status,
    count: projects.value.filter(project =>
      (status.value === 'all' || project.statusKey === status.value) &&
      matchesTechnology(project) &&
      matchesClient(project) &&
      matchesSearch(project)
    ).length
  })).filter(status => status.value === 'all' || status.count > 0 || status.value === selectedStatus.value)
})

watch(selectedProject, (project) => {
  if (import.meta.client) {
    document.body.classList.toggle('modal-open', Boolean(project))
    document.body.style.overflow = project ? 'hidden' : ''
  }
})

useSeoMeta({
  title: () => t('projects'),
  description: () => t('projectsLead')
})
</script>

<template>
  <div>
    <Header />

    <section class="container section-space">
      <div class="mb-5">
        <h1 class="display-4 fw-bold mb-3">{{ t('projectsTitle') }}</h1>
        <p class="lead text-muted">{{ t('projectsLead') }}</p>
      </div>

      <div class="filters-panel mb-5" role="search" :aria-label="t('filters')">
        <div class="filters-main">
          <div class="search-field">
            <span class="search-icon" aria-hidden="true"></span>
            <input
              v-model="searchQuery"
              type="search"
              class="form-control"
              :placeholder="t('searchProjects')"
              :aria-label="t('searchProjects')"
            />
            <button v-if="searchQuery" type="button" class="clear-search" :aria-label="t('clearSearch')" @click="searchQuery = ''">×</button>
          </div>
          <select v-model="selectedTechnology" class="form-select technology-select" :aria-label="t('filterTechnology')">
            <option value="all">{{ t('filterTechnology') }}</option>
            <option v-for="technology in technologyOptions" :key="technology.value" :value="technology.value">
              {{ technology.label }} ({{ technology.count }})
            </option>
          </select>
          <select v-model="selectedClient" class="form-select client-select" :aria-label="t('filterClient')">
            <option value="all">{{ t('filterClient') }}</option>
            <option v-for="client in clientOptions" :key="client.value" :value="client.value">
              {{ client.label }} ({{ client.count }})
            </option>
          </select>
        </div>

        <div class="status-filters" :aria-label="t('filterStatus')">
          <button
            v-for="status in statusOptions"
            :key="status.value"
            type="button"
            class="status-filter"
            :class="{ active: selectedStatus === status.value }"
            :aria-pressed="selectedStatus === status.value"
            @click="selectedStatus = status.value"
          >
            <span>{{ status.label }}</span><span class="status-count">{{ status.count }}</span>
          </button>
        </div>

        <div class="filters-meta" aria-live="polite">
          <span><strong>{{ filteredProjects.length }}</strong> {{ t(filteredProjects.length === 1 ? 'resultFound' : 'resultsFound') }}</span>
          <button v-if="hasActiveFilters" type="button" class="clear-filters" @click="clearFilters">{{ t('clearFilters') }}</button>
        </div>
      </div>

      <!-- Resultados -->
      <div v-if="filteredProjects.length > 0" class="row g-4 g-xl-5">
        <div v-for="project in filteredProjects" :key="project.id" class="col-12 col-md-6 col-lg-4" :class="{ 'featured-result': project.featured }">
          <article
            class="card project-card h-100 overflow-hidden border-0"
            role="button"
            tabindex="0"
            @click="openProject(project)"
            @keydown.enter.prevent="openProject(project)"
            @keydown.space.prevent="openProject(project)"
          >
            <div class="position-relative">
              <img :src="projectCover(project.coverImage)" class="card-img-top project-card-img" :class="{ 'featured-cover': project.featured }" :alt="project.title" />
              <span v-if="project.featured" class="featured-label">{{ project.badge || t('featuredProduct') }}</span>
              <span v-if="project.status" class="badge project-card-status" :class="project.statusKey ? `status-${project.statusKey.toLowerCase().replace(' ', '-')}` : ''">
                {{ project.status }}
              </span>
            </div>

            <div class="card-body project-body d-flex flex-column p-4">
              <h3 class="card-title h5 fw-bold">{{ project.title }}</h3>
              <p class="card-text">{{ project.summary }}</p>

              <div class="d-flex flex-wrap gap-1 mt-auto pt-3">
                <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="badge rounded-pill project-badge">
                  {{ tech }}
                </span>
                <span v-if="project.technologies.length > 3" class="badge rounded-pill project-badge">
                  +{{ project.technologies.length - 3 }}
                </span>
              </div>

              <NuxtLink class="project-link mt-3" :to="`/projetos/${project.slug}`" @click.stop>
                {{ t('details') }} <span aria-hidden="true">→</span>
              </NuxtLink>
            </div>
          </article>
        </div>
      </div>

      <!-- Mensagem vazia -->
      <div v-else class="text-center py-5">
        <p class="text-muted">{{ t('noneProjects') }}</p>
        <button v-if="hasActiveFilters" type="button" class="btn btn-brand mt-2" @click="clearFilters">{{ t('clearFilters') }}</button>
      </div>
    </section>

    <ProjectsModal :project="selectedProject" @close-project="closeProject" />

    <Footer />
  </div>
</template>

<style scoped>
.project-card {
  border: 1px solid var(--portfolio-line);
  border-radius: 8px;
  background: var(--portfolio-card);
  overflow: hidden;
  cursor: pointer;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease;
}

.project-card:hover,
.project-card:focus-visible {
  transform: translateY(-4px);
  box-shadow: 0 1.4rem 3rem rgba(0, 0, 0, 0.24);
}

.project-card:focus-visible {
  outline: 3px solid rgba(99, 102, 241, 0.72);
  outline-offset: 4px;
}

.project-card-img {
  display: block;
  width: 100%;
  height: 200px;
  object-fit: cover;
  filter: brightness(0.74);
}
.featured-cover { object-fit: contain; padding: 3rem; background: radial-gradient(circle at 30% 20%, rgba(108, 70, 190, .42), transparent 42%), #101a17; filter: none; }
.featured-label { position: absolute; top: 1rem; left: 1rem; max-width: calc(100% - 7rem); border: 1px solid rgba(255,255,255,.18); border-radius: 999px; padding: .42rem .7rem; background: rgba(8,17,15,.72); color: #dff56d; font-size: .65rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase; }
.featured-result { order: -1; }

.project-card-status {
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 0.75rem;
}

.status-completed {
  background-color: #10b981;
}

.status-in-progress {
  background-color: #f59e0b;
}

.status-maintained {
  background-color: #3b82f6;
}

.status-planning {
  background-color: #8b5cf6;
}

.status-archived {
  background-color: #6b7280;
}

.project-body {
  min-height: auto;
}

.card-title {
  color: var(--portfolio-ink);
}

.card-text {
  color: var(--portfolio-ink);
  opacity: 0.8;
  font-size: 0.95rem;
}

.project-badge {
  background: #39465a;
  color: #818cf8;
  font-size: 0.75rem;
}

.project-link {
  color: var(--portfolio-accent);
  font-weight: 500;
  font-size: 0.9rem;
}

.form-control,
.form-select {
  background-color: var(--portfolio-card);
  border-color: var(--portfolio-line);
  color: var(--portfolio-ink);
}

.form-control:focus,
.form-select:focus {
  background-color: var(--portfolio-card);
  border-color: var(--portfolio-accent);
  color: var(--portfolio-ink);
}

.form-control::placeholder {
  color: var(--portfolio-muted);
}

.filters-panel {
  display: grid;
  gap: 1.15rem;
  padding: clamp(1rem, 3vw, 1.5rem);
  border: 1px solid var(--portfolio-line);
  border-radius: var(--portfolio-radius);
  background: color-mix(in srgb, var(--portfolio-card) 88%, transparent);
}

.filters-main { display: grid; grid-template-columns: minmax(280px, 1fr) minmax(210px, 220px) minmax(250px, 270px); gap: .75rem; }
.search-field { position: relative; }
.search-field .form-control { min-height: 50px; padding-left: 2.75rem; padding-right: 2.75rem; border-radius: 999px; }
.search-icon { position: absolute; z-index: 2; top: 50%; left: 1rem; width: .85rem; height: .85rem; border: 2px solid var(--portfolio-muted); border-radius: 50%; transform: translateY(-58%); pointer-events: none; }
.search-icon::after { content: ''; position: absolute; right: -.38rem; bottom: -.28rem; width: .42rem; height: 2px; background: var(--portfolio-muted); transform: rotate(45deg); }
.clear-search { position: absolute; z-index: 2; top: 50%; right: .55rem; width: 2rem; height: 2rem; border: 0; border-radius: 50%; background: transparent; color: var(--portfolio-muted); font-size: 1.35rem; line-height: 1; transform: translateY(-50%); }
.clear-search:hover { background: var(--portfolio-line); color: var(--portfolio-ink); }
.technology-select, .client-select { min-height: 50px; border-radius: 999px; padding-left: 1rem; }
.status-filters { display: flex; flex-wrap: wrap; gap: .5rem; }
.status-filter { display: inline-flex; align-items: center; gap: .55rem; border: 1px solid var(--portfolio-line); border-radius: 999px; background: transparent; padding: .55rem .8rem; color: var(--portfolio-muted); font-size: .84rem; font-weight: 700; transition: border-color 160ms ease, background 160ms ease, color 160ms ease; }
.status-filter:hover { border-color: var(--portfolio-accent); color: var(--portfolio-ink); }
.status-filter.active { border-color: var(--portfolio-accent); background: var(--portfolio-accent); color: var(--portfolio-dark); }
.status-count { display: inline-grid; min-width: 1.45rem; height: 1.45rem; place-items: center; border-radius: 999px; background: rgba(127, 127, 127, .18); font-size: .72rem; }
.status-filter.active .status-count { background: rgba(8, 17, 15, .16); }
.filters-meta { display: flex; align-items: center; justify-content: space-between; gap: 1rem; border-top: 1px solid var(--portfolio-line); padding-top: .9rem; color: var(--portfolio-muted); font-size: .85rem; }
.filters-meta strong { color: var(--portfolio-ink); }
.clear-filters { border: 0; background: transparent; padding: .2rem 0; color: var(--portfolio-accent); font-weight: 700; }
.clear-filters:hover { text-decoration: underline; }

@media (max-width: 991.98px) {
  .filters-main { grid-template-columns: 1fr; }
}

@media (max-width: 767.98px) {
  .status-filters { flex-wrap: nowrap; margin-inline: -.25rem; padding: .1rem .25rem .45rem; overflow-x: auto; scrollbar-width: thin; }
  .status-filter { flex: 0 0 auto; }
}
</style>
