<script setup lang="ts">
const profile = useProfile()

useHead({
  title: () => (profile.value ? `${profile.value.name} - ${profile.value.role}` : 'Dorivaldo Valentim'),
  meta: [
    {
      name: 'description',
      content: () => profile.value?.intro ?? ''
    }
  ]
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
