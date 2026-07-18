<script setup lang="ts">
const profile = useProfile()
</script>

<template>
  <section class="hero-section d-flex align-items-center justify-content-center">
    <div class="container text-center">
      <img v-if="profile?.avatar" class="hero-avatar" :src="profile.avatar" :alt="`Foto de ${profile.name}`" />

      <div class="d-flex flex-column align-items-center mt-4">
        <h1 class="display-lg-3 fw-bold">{{ profile?.headline }}</h1>
        <p class="hero-role">{{ profile?.role }}</p>
        <p class="hero-intro">{{ profile?.intro }}</p>
      </div>

      <div class="d-flex flex-wrap justify-content-center gap-3">
        <a class="btn btn-brand btn-lg fw-bold" href="#projetos">Meus Projetos</a>
        <a class="btn btn-soft btn-lg fw-bold" href="#contacto">Entre em Contato</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  min-height: calc(100vh - 92px);
}

.hero-avatar {
  width: clamp(132px, 14vw, 190px);
  aspect-ratio: 1;
  border: 6px solid var(--portfolio-accent);
  border-radius: 999px;
  object-fit: cover;
  box-shadow: 0 0 0 8px rgba(99, 102, 241, 0.08);
}

.hero-role {
  color: var(--portfolio-accent);
  font-size: clamp(1.45rem, 3vw, 2rem);
}

.hero-intro {
  max-width: 760px;
  font-size: clamp(1.05rem, 2vw, 1.3rem);
}
</style>