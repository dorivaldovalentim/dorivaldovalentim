<script setup lang="ts">
import type { Project } from '~/data/portfolio'
import { projectCover } from '~/utils/projectCover'

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
  ogImage: () => projectCover(project.value?.coverImage),
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
            <p class="page-kicker">{{ project.badge || project.client || t('projects') }}</p>
            <h1>{{ project.title }}</h1>
            <p class="project-summary">{{ project.summary }}</p>
            <ProjectShare :title="project.title" :summary="project.summary" :slug="project.slug" />
          </div>
          <div class="project-hero-visual" :class="{ featured: project.featured }">
            <img :src="projectCover(project.coverImage)" :alt="project.title" />
          </div>
        </header>

        <section v-if="project.problem || project.solution || project.role || project.outcome" class="case-study">
          <p class="case-study-label">{{ t('productCaseStudy') }}</p>
          <div class="case-study-grid">
            <article v-if="project.problem"><span>01</span><h2>{{ t('problem') }}</h2><p>{{ project.problem }}</p></article>
            <article v-if="project.solution"><span>02</span><h2>{{ t('solution') }}</h2><p>{{ project.solution }}</p></article>
            <article v-if="project.role"><span>03</span><h2>{{ t('role') }}</h2><p>{{ project.role }}</p></article>
            <article v-if="project.outcome"><span>04</span><h2>{{ t('outcome') }}</h2><p>{{ project.outcome }}</p></article>
          </div>
        </section>

        <div class="project-content">
          <article class="surface project-description">
            <div v-if="project.description" class="project-rich-text" v-html="project.description"></div>
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
.project-hero-visual { overflow: hidden; border-radius: var(--portfolio-radius); box-shadow: var(--portfolio-shadow); }
.project-hero img { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
.project-hero-visual.featured { display: grid; aspect-ratio: 4/3; place-items: center; background: radial-gradient(circle at 30% 20%, rgba(108, 70, 190, .46), transparent 42%), linear-gradient(145deg, #151027, #091713); }
.project-hero-visual.featured img { width: 72%; height: auto; aspect-ratio: auto; object-fit: contain; filter: drop-shadow(0 1.5rem 3rem rgba(0,0,0,.35)); }
.project-summary { max-width: 620px; font-size: clamp(1.1rem, 2vw, 1.4rem); }
.case-study { margin-top: 6rem; }
.case-study-label { margin-bottom: 1rem; color: var(--portfolio-accent); font-size: .72rem; font-weight: 850; letter-spacing: .16em; text-transform: uppercase; }
.case-study-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.case-study article { min-height: 300px; overflow: hidden; border: 1px solid var(--portfolio-line); border-radius: 10px; padding: clamp(1.5rem, 4vw, 3rem); background: var(--portfolio-card); }
.case-study article > span { display: block; margin-bottom: 3rem; color: var(--portfolio-accent); font-size: .7rem; font-weight: 850; letter-spacing: .14em; }
.case-study h2 { margin-bottom: 1rem; color: var(--portfolio-ink); font-size: clamp(1.6rem, 3vw, 2.5rem); font-weight: 820; letter-spacing: -.035em; }
.case-study article p { margin: 0; color: var(--portfolio-muted); line-height: 1.7; }
.project-content { display: grid; grid-template-columns: 1.4fr .6fr; gap: 1.5rem; margin-top: 5rem; }
.project-description, .project-meta { padding: clamp(1.5rem, 4vw, 3rem); }
.project-rich-text { color: var(--portfolio-ink); font-size: 1.15rem; }
.project-rich-text :deep(p:last-child) { margin-bottom: 0; }
.project-rich-text :deep(a) { color: var(--portfolio-accent); text-decoration: underline; text-underline-offset: .2em; }
.project-rich-text :deep(ul), .project-rich-text :deep(ol) { color: var(--portfolio-muted); }
.tech-pill { border: 1px solid var(--portfolio-line); border-radius: 999px; padding: .45rem .75rem; color: var(--portfolio-accent); }
.project-meta { display: grid; gap: 1.4rem; }
.project-meta div { display: grid; gap: .2rem; }
.project-meta span { color: var(--portfolio-muted); font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; }
.project-meta a { color: var(--portfolio-accent); font-weight: 700; }
.project-gallery { margin-top: 6rem; }
.project-gallery h2 { margin-bottom: 2rem; font-size: 2.5rem; }
.empty-page { min-height: 70vh; padding-top: 8rem; }
@media (max-width: 767.98px) { .project-hero, .project-content, .case-study-grid { grid-template-columns: 1fr; } .project-hero { gap: 2rem; } }
</style>
