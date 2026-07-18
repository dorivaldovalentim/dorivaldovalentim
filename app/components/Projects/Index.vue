<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'
import { ref, watch, onMounted } from 'vue'
import { type Project } from '../../data/portfolio'

const { projects, loading, error, fetchProjects } = useProjects()

const selectedProject = ref<Project | null>(null)

onMounted(async () => {
  await fetchProjects()
})

const openProject = (project: Project) => {
  selectedProject.value = project
}

const closeProject = () => {
  selectedProject.value = null
}

watch(selectedProject, (project) => {
  if (import.meta.client) {
    document.body.classList.toggle('modal-open', Boolean(project))
    document.body.style.overflow = project ? 'hidden' : ''
  }
})
</script>

<template>
  <section id="projetos" class="container section-space">
    <div class="d-flex justify-content-between align-items-center mb-5">
      <h2 class="section-heading display-5 text-md-center">Projetos</h2>
      <NuxtLink to="/projetos" class="btn btn-brand fw-bold d-inline-flex align-items-center gap-2">
        Ver Todos <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>

    <div class="row g-4 g-xl-5">
      <div v-for="project in projects.slice(0, 2)" :key="project.id" class="col-12 col-md-6">
        <article
          class="card project-card h-100 overflow-hidden border-0"
          role="button"
          tabindex="0"
          @click="openProject(project)"
          @keydown.enter.prevent="openProject(project)"
          @keydown.space.prevent="openProject(project)"
        >
          <img :src="project.coverImage" class="card-img-top project-card-img" :alt="project.title" />

          <div class="card-body project-body d-flex flex-column p-4">
            <h3 class="card-title h4 fw-bold">{{ project.title }}</h3>
            <p class="card-text">{{ project.summary }}</p>

            <div class="d-flex flex-wrap gap-2 mt-auto pt-4">
              <span v-for="tech in project.technologies" :key="tech" class="badge rounded-pill project-badge">
                {{ tech }}
              </span>
            </div>

            <span class="project-link mt-4">Ver Detalhes <span aria-hidden="true">→</span></span>
          </div>
        </article>
      </div>
    </div>
    
    <ProjectsModal :project="selectedProject" @close-project="closeProject" />
  </section>
</template>

<style scoped>
.project-card,
.skill-card {
  border: 1px solid var(--portfolio-line);
  border-radius: 8px;
  background: var(--portfolio-card);
}

.project-card {
  overflow: hidden;
  min-height: 520px;
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
  height: clamp(210px, 22vw, 280px);
  object-fit: cover;
  filter: brightness(0.74);
}

.project-body {
  min-height: 250px;
}

.card-title {
  color: var(--portfolio-ink);
}

.card-text {
  color: var(--portfolio-ink);
  opacity: 0.8;
  font-size: 1.15rem;
}

.project-badge {
  background: #39465a;
  color: #818cf8;
}

.project-link {
  color: var(--portfolio-accent);
  font-weight: 500;
}
</style>
