<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { type Project } from '../../data/portfolio'

const { project } = defineProps<{
  project: Project | null
}>();

const emit = defineEmits(['closeProject'])

const modalTitle = computed(() => project?.title ?? 'Detalhes do projeto')

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
            <img :src="project.image" class="img-fluid w-100 project-modal-img" :alt="project.title" />
            <button type="button" class="btn-close btn-close-white project-modal-close" aria-label="Fechar"
              @click="emit('closeProject')" />
          </div>

          <div class="modal-body p-4 p-md-5">
            <h3 class="modal-title display-5 fw-bold mb-2">{{ project.title }}</h3>
            <p class="project-modal-date mb-4">{{ project.date }}</p>
            <p class="project-modal-description mb-4">{{ project.description }}</p>

            <h4 class="h4 fw-bold mb-3">Tecnologias</h4>
            <div class="d-flex flex-wrap gap-2 mb-4">
              <span v-for="tag in project.tags" :key="tag" class="badge rounded-pill project-badge">
                {{ tag }}
              </span>
            </div>

            <div class="d-flex flex-wrap align-items-center gap-3">
              <a :href="project.demoUrl" class="btn btn-soft fw-bold d-inline-flex align-items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                  </path>
                </svg>
                Repositório
              </a>

              <a :href="project.demoUrl" class="btn btn-brand fw-bold d-inline-flex align-items-center gap-2">
                <span aria-hidden="true">🔗</span>
                Demo
              </a>

              <a :href="project.url" class="project-link m-0">Ver mais detalhes</a>
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
}

.project-modal-date,
.project-modal-description {
  color: var(--portfolio-muted);
}

.project-modal-description {
  max-width: 760px;
  font-size: 1.08rem;
  font-weight: 600;
  line-height: 1.55;
}

.modal-backdrop.show {
  opacity: 0.82;
}

.project-badge {
  background: #39465a;
  color: #818cf8;
}
</style>