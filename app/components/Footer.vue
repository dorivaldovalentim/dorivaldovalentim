<script setup lang="ts">
const profile = useProfile()
const { t } = useLocale()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="p-4">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-md-between justify-content-center text-md-start text-center gap-3">
        <p class="mb-0">© {{ currentYear }} {{ profile?.fullname }}. {{ t('rights') }}</p>

        <SocialLinks class="mt-md-0 mt-2" :socials="profile?.socials ?? []" size="sm" :aria-label="t('socialLabel')" />
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--portfolio-bg-soft);
}

</style>
