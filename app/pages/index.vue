<script setup lang="ts">
const profile = useProfile()
const { locale, t } = useLocale()

useSeoMeta({
  title: () => t('heroRole'),
  description: () => t('heroIntro'),
  ogTitle: () => `${profile.value?.fullname ?? 'Dorivaldo Valentim'} · ${t('heroRole')}`,
  ogDescription: () => t('heroIntro'),
  ogImage: () => profile.value?.avatar ?? '',
  twitterImage: () => profile.value?.avatar ?? ''
})
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <Header />

    <main id="inicio">
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </main>

    <Footer></Footer>
  </div>
</template>
