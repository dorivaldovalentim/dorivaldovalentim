<script setup lang="ts">
import type { Social } from '@/data/portfolio'

const props = withDefaults(defineProps<{
  socials: Social[]
  size?: 'sm' | 'md'
}>(), { size: 'md' })

const iconAliases: Record<string, string> = {
  envelope: 'gmail',
  email: 'gmail'
}

const iconName = (social: Social) =>
  String(social.icon || social.label).toLowerCase().replace(/\s+/g, '')

const iconUrl = (social: Social) => {
  const icon = iconName(social)
  return `https://cdn.simpleicons.org/${iconAliases[icon] || icon}/A7F3D0`
}

const opensNewTab = (url: string) => /^https?:\/\//i.test(url)
</script>

<template>
  <div class="social-icons" :class="`is-${props.size}`">
    <a
      v-for="social in props.socials"
      :key="social.label"
      :href="social.url"
      :aria-label="social.label"
      :title="social.label"
      :target="opensNewTab(social.url) ? '_blank' : undefined"
      :rel="opensNewTab(social.url) ? 'noopener noreferrer' : undefined"
    >
      <svg
        v-if="iconName(social) === 'linkedin'"
        class="social-icon"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
        <path d="M2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
      <img v-else :src="iconUrl(social)" alt="" loading="lazy" />
    </a>
  </div>
</template>

<style scoped>
.social-icons { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .8rem; }
.social-icons a { display: grid; place-items: center; width: 3rem; aspect-ratio: 1; border: 1px solid var(--portfolio-line); border-radius: 50%; background: rgba(167, 243, 208, .04); transition: border-color .2s ease, background .2s ease, transform .2s ease; }
.social-icons a:hover { border-color: var(--portfolio-accent); background: rgba(167, 243, 208, .1); transform: translateY(-3px); }
.social-icons img, .social-icon { width: 1.2rem; height: 1.2rem; object-fit: contain; }
.social-icon { fill: var(--portfolio-accent); }
.social-icons.is-sm { gap: .55rem; }
.social-icons.is-sm a { width: 2.35rem; }
.social-icons.is-sm img, .social-icons.is-sm .social-icon { width: 1rem; height: 1rem; }
</style>
