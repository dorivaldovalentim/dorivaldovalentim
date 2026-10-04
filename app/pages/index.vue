<script setup lang="ts">
const profile = useProfile()
const { locale, t } = useLocale()

useSeoMeta({
  title: () => profile.value?.role ?? 'Dorivaldo Valentim',
  description: () => profile.value?.intro ?? '',
  ogTitle: () => `${profile.value?.fullname ?? 'Dorivaldo Valentim'} · ${profile.value?.role ?? ''}`,
  ogDescription: () => profile.value?.intro ?? '',
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
