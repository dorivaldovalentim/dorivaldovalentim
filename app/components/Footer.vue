<script setup lang="ts">
const profile = useProfile()

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="p-4">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-md-between justify-content-center text-md-start text-center gap-3">
        <p class="mb-0">© {{ currentYear }} {{ profile?.fullname }}. Todos os direitos reservados.</p>

        <div class="social-links mt-md-0 mt-2" aria-label="Redes sociais">
          <a v-for="social in profile?.socials ?? []" :key="social.label" :href="social.url">
            {{ social.label }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--portfolio-bg-soft);
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem;
}

.social-links a {
  color: var(--portfolio-muted);
  font-weight: 500;
}

.social-links a:hover {
  color: var(--portfolio-ink);
}
</style>