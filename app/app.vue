<script setup lang="ts">
import { profile } from './data/portfolio'

useHead({
  title: `${profile.name} - ${profile.role}`,
  meta: [
    {
      name: 'description',
      content: profile.intro
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
    </main>

    <Footer></Footer>
  </div>
</template>
