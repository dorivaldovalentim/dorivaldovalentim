<script setup lang="ts">
import { useProjects } from '~/composables/useProjects'
import { computed, ref, watch, onMounted } from 'vue'
import { type Project } from '../../data/portfolio'
import { projectCover } from '~/utils/projectCover'

const { projects, loading, error, fetchProjects } = useProjects()
const { t } = useLocale()

const selectedProject = ref<Project | null>(null)
const featuredProject = computed(() => projects.value.find((project: Project) => project.featured))
const supportingProjects = computed(() => projects.value.filter((project: Project) => !project.featured).slice(0, featuredProject.value ? 1 : 2))

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
      <h2 class="section-heading display-5 text-md-center">{{ t('projects') }}</h2>
      <NuxtLink to="/projetos" class="btn btn-brand fw-bold d-inline-flex align-items-center gap-2">
        {{ t('allProjects') }} <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>

    <article v-if="featuredProject" class="featured-project" @click="openProject(featuredProject)">
      <div class="featured-visual">
        <span>{{ featuredProject.badge || t('featuredProduct') }}</span>
        <img :src="projectCover(featuredProject.coverImage)" :alt="featuredProject.title" />
      </div>
      <div class="featured-copy">
        <p class="featured-kicker">{{ t('productCaseStudy') }}</p>
        <h3>{{ featuredProject.title }}</h3>
        <p>{{ featuredProject.summary }}</p>
        <div class="featured-tech">
          <span v-for="tech in featuredProject.technologies.slice(0, 6)" :key="tech">{{ tech }}</span>
        </div>
        <NuxtLink :to="`/projetos/${featuredProject.slug}`" class="btn btn-brand align-self-start" @click.stop>
          {{ t('viewCaseStudy') }} <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </article>

    <div v-if="supportingProjects.length" class="row g-4 g-xl-5 mt-2">
      <div v-for="project in supportingProjects" :key="project.id" class="col-12">
        <article
          class="card project-card h-100 overflow-hidden border-0"
          role="button"
          tabindex="0"
          @click="openProject(project)"
          @keydown.enter.prevent="openProject(project)"
          @keydown.space.prevent="openProject(project)"
        >
          <img :src="projectCover(project.coverImage)" class="card-img-top project-card-img" :alt="project.title" />

          <div class="card-body project-body d-flex flex-column p-4">
            <h3 class="card-title h4 fw-bold">{{ project.title }}</h3>
            <p class="card-text">{{ project.summary }}</p>

            <div class="d-flex flex-wrap gap-2 mt-auto pt-4">
              <span v-for="tech in project.technologies" :key="tech" class="badge rounded-pill project-badge">
                {{ tech }}
              </span>
            </div>

            <NuxtLink class="project-link mt-4" :to="`/projetos/${project.slug}`" @click.stop>
              {{ t('details') }} <span aria-hidden="true">→</span>
            </NuxtLink>
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
.featured-project { display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); min-height: 470px; overflow: hidden; border: 1px solid var(--portfolio-line); border-radius: 12px; background: var(--portfolio-card); cursor: pointer; }
.featured-visual { position: relative; display: grid; min-height: 100%; place-items: center; overflow: hidden; background: radial-gradient(circle at 30% 20%, rgba(108, 70, 190, .46), transparent 42%), linear-gradient(145deg, #151027, #091713); }
.featured-visual::after { position: absolute; width: 340px; height: 340px; border: 1px solid rgba(158, 201, 74, .25); border-radius: 50%; box-shadow: 0 0 0 55px rgba(72, 42, 132, .08), 0 0 0 110px rgba(158, 201, 74, .04); content: ''; }
.featured-visual > span { position: absolute; z-index: 2; top: 1.5rem; left: 1.5rem; border: 1px solid rgba(255,255,255,.18); border-radius: 999px; padding: .5rem .8rem; background: rgba(8,17,15,.58); color: #dff56d; font-size: .7rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.featured-visual img { position: relative; z-index: 1; width: min(72%, 420px); height: auto; object-fit: contain; filter: drop-shadow(0 1.5rem 3rem rgba(0,0,0,.3)); }
.featured-copy { display: flex; flex-direction: column; justify-content: center; padding: clamp(2rem, 5vw, 4rem); }
.featured-kicker { margin: 0 0 .75rem; color: var(--portfolio-accent); font-size: .72rem; font-weight: 850; letter-spacing: .16em; text-transform: uppercase; }
.featured-copy h3 { margin: 0 0 1.1rem; color: var(--portfolio-ink); font-size: clamp(2.8rem, 6vw, 5rem); font-weight: 880; letter-spacing: -.06em; line-height: .9; }
.featured-copy > p:not(.featured-kicker) { max-width: 650px; margin-bottom: 1.6rem; color: var(--portfolio-muted); font-size: 1.1rem; line-height: 1.7; }
.featured-tech { display: flex; flex-wrap: wrap; gap: .45rem; margin-bottom: 2rem; }
.featured-tech span { border: 1px solid var(--portfolio-line); border-radius: 999px; padding: .38rem .65rem; color: var(--portfolio-accent); font-size: .72rem; font-weight: 750; }
@media (max-width: 767.98px) { .featured-project { grid-template-columns: 1fr; } .featured-visual { min-height: 300px; } }
</style>
