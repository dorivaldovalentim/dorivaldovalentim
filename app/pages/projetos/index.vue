<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'
import { ref, watch, computed, onMounted } from 'vue'
import { type Project } from '~/data/portfolio'

const { projects, loading, error, fetchProjects } = useProjects()

const selectedProject = ref<Project | null>(null)
const searchQuery = ref('')
const selectedStatus = ref<string>('all')

onMounted(async () => {
  await fetchProjects()
})

const filteredProjects = computed(() => {
  let filtered = projects.value

  if (selectedStatus.value !== 'all') {
    filtered = filtered.filter(p => p.status === selectedStatus.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.technologies.some(t => t.toLowerCase().includes(query))
    )
  }

  return filtered
})

const openProject = (project: Project) => {
  selectedProject.value = project
}

const closeProject = () => {
  selectedProject.value = null
}

const statusOptions = [
  { value: 'all', label: 'Todos' },
  { value: 'Planning', label: 'Planejamento' },
  { value: 'In Progress', label: 'Em Progresso' },
  { value: 'Completed', label: 'Completo' },
  { value: 'Maintained', label: 'Mantido' },
  { value: 'Archived', label: 'Arquivado' }
]

watch(selectedProject, (project) => {
  if (import.meta.client) {
    document.body.classList.toggle('modal-open', Boolean(project))
    document.body.style.overflow = project ? 'hidden' : ''
  }
})

useHead({
  title: 'Projetos - Dorivaldo Valentim',
  meta: [
    {
      name: 'description',
      content: 'Confira todos os meus projetos de desenvolvimento web fullstack'
    }
  ]
})
</script>

<template>
  <div>
    <section class="container section-space">
      <div class="mb-5">
        <h1 class="display-4 fw-bold mb-3">Meus Projetos</h1>
        <p class="lead text-muted">Explore todos os projetos que desenvolvi ao longo da minha carreira como desenvolvedor web fullstack.</p>
      </div>

      <!-- Filtros -->
      <div class="row g-3 mb-5">
        <div class="col-12 col-md-6">
          <input
            v-model="searchQuery"
            type="text"
            class="form-control"
            placeholder="Buscar projetos, tecnologias..."
            aria-label="Buscar projetos"
          />
        </div>
        <div class="col-12 col-md-6">
          <select
            v-model="selectedStatus"
            class="form-select"
            aria-label="Filtrar por status"
          >
            <option v-for="status in statusOptions" :key="status.value" :value="status.value">
              {{ status.label }}
            </option>
          </select>
        </div>
      </div>

      <!-- Resultados -->
      <div v-if="filteredProjects.length > 0" class="row g-4 g-xl-5">
        <div v-for="project in filteredProjects" :key="project.id" class="col-12 col-md-6 col-lg-4">
          <article
            class="card project-card h-100 overflow-hidden border-0"
            role="button"
            tabindex="0"
            @click="openProject(project)"
            @keydown.enter.prevent="openProject(project)"
            @keydown.space.prevent="openProject(project)"
          >
            <div class="position-relative">
              <img :src="project.coverImage" class="card-img-top project-card-img" :alt="project.title" />
              <span v-if="project.status" class="badge project-card-status" :class="`status-${project.status.toLowerCase().replace(' ', '-')}`">
                {{ project.status }}
              </span>
            </div>

            <div class="card-body project-body d-flex flex-column p-4">
              <h3 class="card-title h5 fw-bold">{{ project.title }}</h3>
              <p class="card-text">{{ project.summary }}</p>

              <div class="d-flex flex-wrap gap-1 mt-auto pt-3">
                <span v-for="(tech, idx) in project.technologies" :key="tech" class="badge rounded-pill project-badge">
                  {{ tech }}
                </span>
                <span v-if="project.technologies.length > 3" class="badge rounded-pill project-badge">
                  +{{ project.technologies.length - 3 }}
                </span>
              </div>

              <span class="project-link mt-3">Ver Detalhes <span aria-hidden="true">→</span></span>
            </div>
          </article>
        </div>
      </div>

      <!-- Mensagem vazia -->
      <div v-else class="text-center py-5">
        <p class="text-muted">Nenhum projeto encontrado com os critérios selecionados.</p>
      </div>
    </section>

    <ProjectsModal :project="selectedProject" @close-project="closeProject" />
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
</style>
