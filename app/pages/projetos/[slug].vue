<script setup lang="ts">
import type { Project } from '~/data/portfolio'

const route = useRoute()
const { locale, t } = useLocale()
const requestUrl = useRequestURL()

const { data: project } = await useAsyncData<Project | null>(
  `project-${route.params.slug}`,
  async () => {
    const projects = await $fetch<Project[]>('/api/projects', { query: { locale: locale.value } })
    return projects.find(item => item.slug === route.params.slug) ?? null
  },
  { watch: [locale] }
)

const formatDate = (value?: string) => value
  ? new Date(value).toLocaleDateString(locale.value === 'pt' ? 'pt-PT' : 'en-US', { year: 'numeric', month: 'long' })
  : t('present')

useSeoMeta({
  title: () => project.value?.title ?? t('projectNotFound'),
  description: () => project.value?.summary ?? '',
  ogTitle: () => project.value?.title ?? '',
  ogDescription: () => project.value?.summary ?? '',
  ogImage: () => project.value?.coverImage ?? '',
  ogUrl: () => new URL(route.fullPath, requestUrl.origin).toString(),
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <div>
    <Header />
    <main v-if="project" class="project-page">
      <div class="container">
        <NuxtLink to="/projetos" class="back-link">{{ t('backProjects') }}</NuxtLink>
        <header class="project-hero">
          <div>
            <p class="page-kicker">{{ project.client || t('projects') }}</p>
            <h1>{{ project.title }}</h1>
            <p class="project-summary">{{ project.summary }}</p>
            <ProjectShare :title="project.title" :summary="project.summary" :slug="project.slug" />
          </div>
          <img v-if="project.coverImage" :src="project.coverImage" :alt="project.title" />
        </header>

        <div class="project-content">
          <article class="surface project-description">
            <p>{{ project.description }}</p>
            <div class="d-flex flex-wrap gap-2 mt-4">
              <span v-for="tech in project.technologies" :key="tech" class="tech-pill">{{ tech }}</span>
            </div>
          </article>
          <aside class="surface project-meta">
            <div><span>{{ t('status') }}</span><strong>{{ project.status }}</strong></div>
            <div><span>{{ t('client') }}</span><strong>{{ project.client || '—' }}</strong></div>
            <div><span>{{ t('experience') }}</span><strong>{{ formatDate(project.startDate) }} — {{ formatDate(project.endDate) }}</strong></div>
            <a v-if="project.websiteUrl" :href="project.websiteUrl" target="_blank" rel="noopener noreferrer">{{ t('website') }} ↗</a>
            <a v-if="project.demoUrl" :href="project.demoUrl" target="_blank" rel="noopener noreferrer">{{ t('demo') }} ↗</a>
            <a v-if="project.repositoryUrl" :href="project.repositoryUrl" target="_blank" rel="noopener noreferrer">{{ t('repository') }} ↗</a>
          </aside>
        </div>

        <section v-if="project.gallery?.length" class="project-gallery">
          <h2>{{ t('gallery') }}</h2>
          <GalleryLightbox :images="project.gallery" :title="project.title" />
        </section>
      </div>
    </main>
    <main v-else class="container empty-page"><p>{{ t('projectNotFound') }}</p></main>
    <Footer />
  </div>
</template>

<style scoped>
.project-page { padding: 4rem 0 8rem; }
.back-link { display: inline-block; margin-bottom: 2rem; color: var(--portfolio-accent); }
.project-hero { display: grid; grid-template-columns: 1.05fr .95fr; align-items: center; gap: 4rem; min-height: 65vh; }
.project-hero h1 { margin: .6rem 0 1.5rem; font-size: clamp(3.5rem, 10vw, 8rem); font-weight: 850; letter-spacing: -.07em; line-height: .85; }
.project-hero img { width: 100%; aspect-ratio: 4/3; border-radius: var(--portfolio-radius); object-fit: cover; box-shadow: var(--portfolio-shadow); }
.project-summary { max-width: 620px; font-size: clamp(1.1rem, 2vw, 1.4rem); }
.project-content { display: grid; grid-template-columns: 1.4fr .6fr; gap: 1.5rem; margin-top: 5rem; }
.project-description, .project-meta { padding: clamp(1.5rem, 4vw, 3rem); }
.project-description > p { color: var(--portfolio-ink); font-size: 1.15rem; }
.tech-pill { border: 1px solid var(--portfolio-line); border-radius: 999px; padding: .45rem .75rem; color: var(--portfolio-accent); }
.project-meta { display: grid; gap: 1.4rem; }
.project-meta div { display: grid; gap: .2rem; }
.project-meta span { color: var(--portfolio-muted); font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; }
.project-meta a { color: var(--portfolio-accent); font-weight: 700; }
.project-gallery { margin-top: 6rem; }
.project-gallery h2 { margin-bottom: 2rem; font-size: 2.5rem; }
.empty-page { min-height: 70vh; padding-top: 8rem; }
@media (max-width: 767.98px) { .project-hero, .project-content { grid-template-columns: 1fr; } .project-hero { gap: 2rem; } }
</style>
