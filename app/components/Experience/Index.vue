<script setup lang="ts">
const experiences = useExperiences()

const formatDate = (value?: string) => {
  if (!value) return 'Presente'
  return new Date(value).toLocaleDateString('pt-PT', { year: 'numeric', month: 'long' })
}
</script>

<template>
  <section v-if="experiences && experiences.length > 0" id="experiencia" class="container section-space">
    <h2 class="section-heading display-5 text-md-center mb-5">Experiência</h2>

    <ol class="timeline">
      <li v-for="experience in experiences" :key="experience.id" class="timeline-item">
        <div class="timeline-marker" aria-hidden="true"></div>

        <div class="timeline-card">
          <div class="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
            <div>
              <h3 class="h5 fw-bold mb-1">{{ experience.role }}</h3>
              <p class="timeline-company mb-0">{{ experience.company }}<span v-if="experience.location"> · {{ experience.location }}</span></p>
            </div>
            <span class="timeline-date">{{ formatDate(experience.startDate) }} - {{ formatDate(experience.endDate) }}</span>
          </div>

          <div v-if="experience.description" class="timeline-description" v-html="experience.description"></div>

          <div v-if="experience.technologies?.length" class="d-flex flex-wrap gap-2 mt-3">
            <span v-for="tech in experience.technologies" :key="tech" class="badge rounded-pill timeline-badge">
              {{ tech }}
            </span>
          </div>
        </div>
      </li>
    </ol>
  </section>
</template>

<style scoped>
.timeline {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 2rem;
  position: relative;
}

.timeline-item {
  position: relative;
  padding-left: 2rem;
}

.timeline-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 1.5rem;
  bottom: -2rem;
  width: 2px;
  background: var(--portfolio-line);
}

.timeline-marker {
  position: absolute;
  left: 0;
  top: 0.35rem;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: var(--portfolio-accent);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.16);
}

.timeline-card {
  border: 1px solid var(--portfolio-line);
  border-radius: 8px;
  background: var(--portfolio-card);
  padding: 1.5rem;
}

.timeline-company {
  color: var(--portfolio-accent);
  font-weight: 500;
}

.timeline-date {
  color: var(--portfolio-muted);
  font-size: 0.9rem;
  white-space: nowrap;
}

.timeline-description {
  color: var(--portfolio-ink);
  opacity: 0.85;
  font-size: 0.98rem;
  line-height: 1.6;
}

.timeline-badge {
  background: #39465a;
  color: #818cf8;
  font-size: 0.75rem;
}
</style>
