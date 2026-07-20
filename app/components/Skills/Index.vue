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

    <div class="d-flex flex-column gap-4">
      <div v-for="group in groups" :key="group.category">
        <h3 class="h6 text-uppercase skill-category mb-3">{{ group.category }}</h3>

        <div class="d-flex flex-wrap gap-2">
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
  </section>
</template>

<style scoped>
.skill-category {
  color: var(--portfolio-accent);
  font-weight: 600;
  letter-spacing: 0.06em;
}

.skill-badge {
  background: var(--portfolio-card);
  border: 1px solid var(--portfolio-line);
  color: var(--portfolio-ink);
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.55rem 1rem;
}

.skill-icon {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.skill-icon-fallback {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--portfolio-accent);
}
</style>
