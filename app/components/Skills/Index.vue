<script setup lang="ts">
import { computed } from 'vue'
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
</script>

<template>
  <section v-if="skills && skills.length > 0" id="skills" class="container section-space">
    <h2 class="section-heading display-5 text-md-center mb-5">Skills</h2>

    <div class="row g-4">
      <div v-for="group in groups" :key="group.category" class="col-12 col-md-6">
        <div class="skill-card h-100 p-4">
          <h3 class="h5 fw-bold mb-4">{{ group.category }}</h3>

          <div class="d-flex flex-column gap-3">
            <div v-for="skill in group.items" :key="skill.id">
              <div class="d-flex justify-content-between align-items-center mb-1">
                <span class="skill-name">{{ skill.name }}</span>
                <span v-if="skill.level != null" class="skill-level">{{ skill.level }}%</span>
              </div>
              <div v-if="skill.level != null" class="skill-bar">
                <div class="skill-bar-fill" :style="{ width: `${skill.level}%` }"></div>
              </div>
            </div>
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
}

.skill-name {
  color: var(--portfolio-ink);
  font-weight: 500;
}

.skill-level {
  color: var(--portfolio-accent);
  font-size: 0.9rem;
  font-weight: 600;
}

.skill-bar {
  height: 6px;
  border-radius: 999px;
  background: var(--portfolio-line);
  overflow: hidden;
}

.skill-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--portfolio-accent) 0%, var(--portfolio-accent-2) 100%);
}
</style>
