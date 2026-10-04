<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import type { Project } from '../../data/portfolio'

const props = defineProps<{ project: Project | null }>()
const emit = defineEmits(['closeProject'])
const { t } = useLocale()
const modalTitle = computed(() => props.project?.title ?? t('details'))

const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape') emit('closeProject')
}

onMounted(() => window.addEventListener('keydown', handleEscape))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleEscape)
  document.body.classList.remove('modal-open')
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <div v-if="project" class="modal fade show d-block project-modal" tabindex="-1" role="dialog" :aria-label="modalTitle" aria-modal="true" @click.self="emit('closeProject')">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content project-modal-content border-0">
          <div class="position-relative">
            <img v-if="project.coverImage" :src="project.coverImage" class="project-modal-img" :alt="project.title" />
            <button type="button" class="btn-close btn-close-white project-modal-close" :aria-label="t('close')" @click="emit('closeProject')" />
          </div>

          <div class="modal-body p-4 p-md-5">
            <div class="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
              <h3 class="modal-title fw-bold mb-0">{{ project.title }}</h3>
              <span v-if="project.status" class="project-status">{{ project.status }}</span>
            </div>
            <p class="project-summary">{{ project.summary }}</p>
            <div class="d-flex flex-wrap gap-2 my-4">
              <span v-for="tech in project.technologies" :key="tech" class="project-badge">{{ tech }}</span>
            </div>
            <div class="d-flex flex-wrap gap-3 align-items-center">
              <NuxtLink :to="`/projetos/${project.slug}`" class="btn btn-brand btn-lg fw-bold" @click="emit('closeProject')">
                {{ t('viewProject') }} <span aria-hidden="true">→</span>
              </NuxtLink>
              <a v-if="project.websiteUrl" :href="project.websiteUrl" class="btn btn-soft btn-lg" target="_blank" rel="noopener noreferrer">
                {{ t('website') }} <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div class="modal-share mt-4 pt-4">
              <ProjectShare :title="project.title" :summary="project.summary" :slug="project.slug" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="project" class="modal-backdrop fade show" @click="emit('closeProject')" />
  </Teleport>
</template>

<style scoped>
.project-modal { z-index: 1060; }
.project-modal-content { overflow: hidden; border: 1px solid var(--portfolio-line) !important; border-radius: var(--portfolio-radius); background: var(--portfolio-card); color: var(--portfolio-ink); box-shadow: var(--portfolio-shadow); }
.project-modal-img { display: block; width: 100%; height: clamp(220px, 36vw, 360px); object-fit: cover; filter: brightness(.82); }
.project-modal-close { position: absolute; top: 1.1rem; right: 1.1rem; z-index: 2; padding: .8rem; border-radius: 50%; background-color: rgba(8,17,15,.72); }
.modal-title { color: var(--portfolio-ink); font-size: clamp(2rem, 5vw, 3.3rem); letter-spacing: -.045em; }
.project-summary { max-width: 680px; margin: 0; font-size: 1.1rem; }
.project-status, .project-badge { display: inline-flex; border: 1px solid var(--portfolio-line); border-radius: 999px; padding: .45rem .75rem; }
.project-status { background: var(--portfolio-accent); color: var(--portfolio-dark); font-size: .75rem; font-weight: 800; }
.project-badge { color: var(--portfolio-accent); font-size: .8rem; }
.modal-backdrop.show { opacity: .82; background: #000; }
.modal-share { border-top: 1px solid var(--portfolio-line); }
</style>
