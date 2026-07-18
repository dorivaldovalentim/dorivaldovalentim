<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { type Project } from '../../data/portfolio'

const { project } = defineProps<{
  project: Project | null
}>();

const emit = defineEmits(['closeProject'])

const modalTitle = computed(() => project?.title ?? 'Detalhes do projeto')

const formattedStartDate = computed(() => {
  if (!project?.startDate) return ''
  return new Date(project.startDate).toLocaleDateString('pt-PT', {
    year: 'numeric',
    month: 'long'
  })
})

const formattedEndDate = computed(() => {
  if (!project?.endDate) return 'Presente'
  return new Date(project.endDate).toLocaleDateString('pt-PT', {
    year: 'numeric',
    month: 'long'
  })
})

const dateRange = computed(() => {
  return `${formattedStartDate.value} - ${formattedEndDate.value}`
})

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('closeProject')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.classList.remove('modal-open')
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="project" class="modal fade show d-block project-modal" tabindex="-1" role="dialog"
      :aria-label="modalTitle" aria-modal="true" @click.self="emit('closeProject')">
      <div class="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
        <div class="modal-content project-modal-content border-0">
          <div class="position-relative">
            <img :src="project.coverImage" class="img-fluid w-100 project-modal-img" :alt="project.title" />
            <button type="button" class="btn-close btn-close-white project-modal-close" aria-label="Fechar"
              @click="emit('closeProject')" />
          </div>

          <div class="modal-body p-4 p-md-5">
            <div class="d-flex justify-content-between align-items-start mb-3 gap-3">
              <div class="flex-grow-1">
                <h3 class="modal-title display-5 fw-bold mb-2">{{ project.title }}</h3>
                <p class="project-modal-date mb-0">{{ dateRange }}</p>
              </div>
              <span v-if="project.status" class="badge rounded-pill project-status flex-shrink-0" :class="`status-${project.status.toLowerCase().replace(' ', '-')}`">
                {{ project.status }}
              </span>
            </div>

            <hr class="modal-divider" />

            <p class="project-modal-description mb-4">{{ project.description }}</p>

            <div class="row g-4 mb-4">
              <div v-if="project.client" class="col-md-6">
                <h5 class="h6 text-uppercase modal-label mb-2">Cliente</h5>
                <p class="modal-value mb-0">{{ project.client }}</p>
              </div>
              <div v-if="project.status" class="col-md-6">
                <h5 class="h6 text-uppercase modal-label mb-2">Status</h5>
                <p class="modal-value mb-0">{{ project.status }}</p>
              </div>
            </div>

            <h4 class="h5 fw-bold mb-3 modal-section-title">Tecnologias</h4>
            <div class="d-flex flex-wrap gap-2 mb-4">
              <span v-for="tech in project.technologies" :key="tech" class="badge rounded-pill project-badge">
                {{ tech }}
              </span>
            </div>

            <h4 class="h5 fw-bold mb-3 modal-section-title">Galeria</h4>
            <div class="gallery mb-4">
              <div class="row g-2">
                <div v-for="(image, idx) in project.gallery" :key="idx" class="col-12 col-sm-6">
                  <img :src="image" :alt="`${project.title} - imagem ${idx + 1}`" class="img-fluid rounded gallery-img" />
                </div>
              </div>
            </div>

            <div class="d-flex flex-wrap align-items-center gap-3">
              <a v-if="project.repositoryUrl" :href="project.repositoryUrl" class="btn btn-soft fw-bold d-inline-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                  </path>
                </svg>
                Repositório
              </a>

              <a v-if="project.demoUrl" :href="project.demoUrl" class="btn btn-brand fw-bold d-inline-flex align-items-center gap-2">
                <span aria-hidden="true">🔗</span>
                Demo
              </a>

              <a v-if="project.websiteUrl" :href="project.websiteUrl" class="project-link m-0">Ver mais detalhes</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="project" class="modal-backdrop fade show" @click="emit('closeProject')" />
  </Teleport>
</template>

<style scoped>
.project-modal {
  z-index: 1060;
}

.project-modal-content {
  overflow: hidden;
  border-radius: 8px;
  background: var(--portfolio-card);
  color: var(--portfolio-ink);
}

.project-modal-img {
  height: clamp(230px, 34vw, 390px);
  min-height: 100px;
  object-fit: cover;
  filter: brightness(0.86);
}

.project-modal-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 1.25rem;
  height: 1.25rem;
  opacity: 0.82;
  z-index: 10;
}

.modal-title {
  color: var(--portfolio-accent);
  font-size: clamp(1.75rem, 5vw, 2.5rem);
}

.project-modal-date {
  font-size: 0.95rem;
  color: var(--portfolio-accent);
  font-weight: 500;
  opacity: 0.9;
}

.project-modal-description {
  font-size: 1.08rem;
  font-weight: 500;
  line-height: 1.65;
  color: var(--portfolio-ink);
  opacity: 0.95;
}

.modal-divider {
  border-color: var(--portfolio-line);
  margin: 1.5rem 0;
  opacity: 0.5;
}

.modal-label {
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--portfolio-accent);
  font-weight: 600;
  opacity: 0.85;
}

.modal-value {
  font-size: 1rem;
  color: var(--portfolio-ink);
  font-weight: 500;
}

.modal-section-title {
  color: var(--portfolio-accent);
  font-weight: 600;
  text-transform: capitalize;
}

.modal-backdrop.show {
  opacity: 0.82;
  background-color: rgba(0, 0, 0, 0.5);
}

.project-badge {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.5rem 0.85rem;
}

.project-status {
  font-size: 0.8rem;
  padding: 0.5rem 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-completed {
  background-color: #10b981;
  color: white;
}

.status-in-progress {
  background-color: #f59e0b;
  color: white;
}

.status-maintained {
  background-color: #3b82f6;
  color: white;
}

.status-planning {
  background-color: #8b5cf6;
  color: white;
}

.status-archived {
  background-color: #6b7280;
  color: white;
}

.gallery-img {
  max-height: 200px;
  object-fit: cover;
  width: 100%;
  border: 1px solid var(--portfolio-line);
  transition: transform 200ms ease;
}

.gallery-img:hover {
  transform: scale(1.05);
}

.project-link {
  color: var(--portfolio-accent);
  font-weight: 600;
  text-decoration: none;
  transition: opacity 200ms ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.project-link:hover {
  opacity: 0.8;
}

.btn-soft {
  background-color: transparent;
  border: 1.5px solid var(--portfolio-accent);
  color: var(--portfolio-accent);
  transition: all 200ms ease;
}

.btn-soft:hover {
  background-color: var(--portfolio-accent);
  color: var(--portfolio-card);
}

.btn-brand {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  border: none;
  color: white;
  transition: all 200ms ease;
}

.btn-brand:hover {
  opacity: 0.9;
  transform: translateY(-2px);
}
</style>
