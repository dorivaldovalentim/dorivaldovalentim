<script setup lang="ts">
const profile = useProfile()
const { t } = useLocale()
</script>

<template>
  <section class="hero-section d-flex align-items-center">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-12 col-lg-8">
          <p class="eyebrow mb-4">{{ t('heroEyebrow') }} · {{ profile?.location }}</p>
          <h1>{{ t('heroHeadline') }}<span class="hero-dot">.</span></h1>
          <p class="hero-role">{{ t('heroRole') }}</p>
          <p class="hero-intro">{{ t('heroIntro') }}</p>
          <div class="d-flex flex-wrap gap-3 mt-4">
            <a class="btn btn-brand btn-lg fw-bold" href="#projetos">{{ t('heroWork') }}</a>
            <NuxtLink class="btn btn-soft btn-lg fw-bold" to="/cv">{{ t('heroCv') }}</NuxtLink>
          </div>
        </div>
        <div class="col-12 col-lg-4 d-flex justify-content-lg-end">
          <div class="portrait-wrap">
            <img v-if="profile?.avatar" class="hero-avatar" :src="profile.avatar" :alt="`Retrato de ${profile.name}`" />
            <span class="availability"><i></i> {{ t('available') }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section { min-height: calc(100svh - 76px); padding: 5rem 0; }
.hero-section h1 { max-width: 900px; margin: 0; font-size: clamp(3.35rem, 9vw, 7.7rem); font-weight: 850; letter-spacing: -.075em; line-height: .86; }
.hero-dot { color: var(--portfolio-accent-2); }
.portrait-wrap { position: relative; width: min(100%, 340px); }
.hero-avatar { width: 100%; aspect-ratio: 4 / 5; border: 1px solid var(--portfolio-line); border-radius: 10rem 10rem var(--portfolio-radius) var(--portfolio-radius); object-fit: cover; filter: saturate(.82) contrast(1.04); box-shadow: var(--portfolio-shadow); }
.availability { position: absolute; right: -.5rem; bottom: 1rem; display: inline-flex; align-items: center; gap: .55rem; border: 1px solid var(--portfolio-line); border-radius: 999px; background: rgba(8,17,15,.9); padding: .65rem .9rem; font-size: .78rem; backdrop-filter: blur(12px); }
.availability i { width: .55rem; aspect-ratio: 1; border-radius: 50%; background: var(--portfolio-accent-2); box-shadow: 0 0 0 5px rgba(232,255,113,.12); }
.hero-role { margin: 1.5rem 0 .65rem; color: var(--portfolio-accent); font-size: clamp(1.25rem, 3vw, 1.8rem); }
.hero-intro { max-width: 680px; font-size: clamp(1.05rem, 2vw, 1.3rem); }
@media (max-width: 991.98px) { .portrait-wrap { width: min(75vw, 320px); } }
</style>
