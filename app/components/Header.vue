<script setup lang="ts">
import { computed } from 'vue'

const profile = useProfile()
const route = useRoute()

const sections = [
  { label: 'Início', anchor: 'inicio' },
  { label: 'Sobre', anchor: 'sobre' },
  { label: 'Experiência', anchor: 'experiencia' },
  { label: 'Skills', anchor: 'skills' },
  { label: 'Projetos', anchor: 'projetos' },
  { label: 'Contacto', anchor: 'contacto' }
]

const isHome = computed(() => route.path === '/')

const links = computed(() =>
  sections.map((section) => ({
    label: section.label,
    href: isHome.value ? `#${section.anchor}` : `/#${section.anchor}`
  }))
)
</script>

<template>
  <header class="sticky-top site-topbar">
    <nav class="navbar navbar-expand-lg" data-bs-theme="dark">
      <div class="container-fluid">
        <NuxtLink class="navbar-brand" :to="isHome ? '#inicio' : '/#inicio'">
          <span>{{ profile?.fullname }}</span>
        </NuxtLink>

        <button class="navbar-toggler border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            <li v-for="link in links" :key="link.label" class="nav-item">
              <NuxtLink :to="link.href" class="nav-link">{{ link.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.site-topbar {
  border-bottom: 1px solid var(--portfolio-line);
  background: rgba(24, 34, 51, 0.94);
  backdrop-filter: blur(16px);
}

.navbar-brand {
  color: var(--portfolio-accent);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
}

.nav-link {
  color: var(--portfolio-muted);
}

.nav-link:hover {
  color: #818cf8;
}
</style>