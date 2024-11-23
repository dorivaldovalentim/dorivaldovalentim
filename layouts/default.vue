<script setup lang="ts">
useSeoMeta({
  description: "Dorivaldo Valentim",
  ogTitle: "Dorivaldo Valentim",
  ogDescription: "Dorivaldo Valentim",
  ogImage: "/favicon.jpg",
  ogUrl: "./",
  twitterTitle: "Dorivaldo Valentim",
  twitterDescription: "Dorivaldo Valentim",
  twitterImage: "/favicon.jpg",
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: "pt_AO",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.jpg",
    },
  ],
  script: [
    {
      type: "text/javascript",
      src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
    }
  ],
});
</script>

<template>
  <div>
    <Menu />
    <slot />
    <Footer />
  </div>
</template>

<style scoped></style>
