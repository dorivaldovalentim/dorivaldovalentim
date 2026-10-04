<script setup lang="ts">
import { computed } from 'vue'

const profile = useProfile()
const route = useRoute()
const { locale, t, toggleLocale } = useLocale()

const sections = computed(() => [
  { label: t('navHome'), anchor: 'inicio' },
  { label: t('navAbout'), anchor: 'sobre' },
  { label: t('navExperience'), anchor: 'experiencia' },
  { label: t('navSkills'), anchor: 'skills' },
  { label: t('navProjects'), anchor: 'projetos' },
  { label: t('navContact'), anchor: 'contacto' },
  { label: t('navCv'), href: '/cv' }
])

const isHome = computed(() => route.path === '/')

const links = computed(() =>
  sections.value.map((section) => ({
    label: section.label,
    href: section.href ?? (isHome.value ? `#${section.anchor}` : `/#${section.anchor}`)
  }))
)
</script>

<template>
  <header class="sticky-top site-topbar">
    <nav class="navbar navbar-expand-lg" data-bs-theme="dark">
      <div class="container">
        <NuxtLink class="navbar-brand" :to="isHome ? '#inicio' : '/#inicio'">
          <span class="brand-mark">DV</span><span class="brand-name">{{ profile?.fullname }}</span>
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
          <button class="language-switch ms-lg-3" type="button" :aria-label="locale === 'pt' ? 'Switch to English' : 'Mudar para português'" @click="toggleLocale">
            <span :class="{ active: locale === 'pt' }">PT</span><i></i><span :class="{ active: locale === 'en' }">EN</span>
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.site-topbar {
  border-bottom: 1px solid var(--portfolio-line);
  background: rgba(8, 17, 15, 0.82);
  backdrop-filter: blur(16px);
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: .75rem;
  color: var(--portfolio-accent);
  font-size: 1rem;
  font-weight: 700;
}

.brand-mark { display: grid; width: 2.6rem; aspect-ratio: 1; place-items: center; border-radius: 50%; background: var(--portfolio-accent); color: var(--portfolio-dark); font-size: .85rem; font-weight: 900; }
.brand-name { color: var(--portfolio-ink); }

.nav-link {
  color: var(--portfolio-muted);
}

.nav-link:hover {
  color: var(--portfolio-accent);
}

@media (max-width: 420px) { .brand-name { display: none; } }
.language-switch { display: inline-flex; align-items: center; gap: .4rem; align-self: center; border: 1px solid var(--portfolio-line); border-radius: 999px; background: transparent; color: var(--portfolio-muted); padding: .4rem .65rem; font-size: .7rem; font-weight: 800; }
.language-switch i { width: 1px; height: .8rem; background: var(--portfolio-line); }
.language-switch .active { color: var(--portfolio-accent-2); }
</style>
