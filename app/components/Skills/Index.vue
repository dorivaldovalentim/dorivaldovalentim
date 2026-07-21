<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { Skill } from '@/data/portfolio'

const skills = useSkills()

const groups = computed(() => {
  const list = skills.value ?? []
  const byCategory = new Map<string, Skill[]>()

  for (const skill of list) {
    const category = skill.category || 'Outros'
    if (!byCategory.has(category)) byCategory.set(category, [])
    byCategory.get(category)!.push(skill)
  }

  return Array.from(byCategory.entries()).map(([category, items]) => ({ category, items }))
})

const failedIcons = reactive(new Set<string>())
const onIconError = (icon: string) => failedIcons.add(icon)
</script>

<template>
  <section v-if="skills && skills.length > 0" id="skills" class="container section-space">
    <h2 class="section-heading display-5 text-md-center mb-5">Skills</h2>

    <div class="row g-4">
      <div
        v-for="(group, index) in groups"
        :key="group.category"
        class="col-12 col-sm-6 col-lg-4"
      >
        <div class="skill-card h-100 p-4 text-center" :style="{ animationDelay: `${index * 90}ms` }">
          <h3 class="h5 fw-bold mb-4 skill-category">{{ group.category }}</h3>

          <div class="d-flex flex-wrap justify-content-center gap-2">
            <span
              v-for="skill in group.items"
              :key="skill.id"
              class="badge rounded-pill skill-badge d-inline-flex align-items-center gap-2"
            >
              <img
                v-if="skill.icon && !failedIcons.has(skill.icon)"
                :src="`https://cdn.simpleicons.org/${skill.icon}`"
                :alt="skill.name"
                class="skill-icon"
                loading="lazy"
                @error="onIconError(skill.icon!)"
              />
              <span v-else class="skill-icon-fallback" aria-hidden="true">{ }</span>
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skill-card {
  border: 1px solid var(--portfolio-line);
  border-radius: 8px;
  background: var(--portfolio-card);
  opacity: 0;
  animation: skill-card-in 500ms ease both;
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;
}

.skill-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 1.4rem 3rem rgba(0, 0, 0, 0.24);
  border-color: var(--portfolio-accent);
}

@keyframes skill-card-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .skill-card {
    animation: none;
    opacity: 1;
  }
}

.skill-category {
  color: var(--portfolio-accent);
}

.skill-badge {
  background: var(--portfolio-bg-soft);
  border: 1px solid var(--portfolio-line);
  color: var(--portfolio-ink);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5rem 0.9rem;
  transition: transform 150ms ease, border-color 150ms ease;
}

.skill-badge:hover {
  transform: translateY(-2px);
  border-color: var(--portfolio-accent);
}

.skill-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.skill-icon-fallback {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--portfolio-accent);
}
</style>
