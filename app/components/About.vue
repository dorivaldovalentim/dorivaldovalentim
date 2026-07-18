<script setup lang="ts">
const profile = useProfile()
</script>

<template>
  <section id="sobre" class="container section-space about-section">
    <div class="d-flex flex-wrap">
      <div class="col-12 col-md-6 pe-md-3">
        <h2 class="section-heading display-5 fw-bold mb-md-4">Sobre Mim</h2>
        <div v-html="profile?.bio"></div>
      </div>

      <div class="fun-card col-12 col-md-6 py-5 px-4">
        <h3>Curiosidades Divertidas</h3>
        <ul>
          <li v-for="fact in profile?.funFacts ?? []" :key="fact">
            <span aria-hidden="true">✦</span>
            <p>{{ fact }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fun-card {
  border: 1px solid var(--portfolio-line);
  border-radius: 8px;
  background: var(--portfolio-card);
}

.fun-card h3,
.skill-card h3 {
  margin: 0 0 1.5rem;
  color: var(--portfolio-ink);
  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 900;
}

.fun-card ul {
  display: grid;
  gap: 1.1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.fun-card li {
  display: grid;
  grid-template-columns: 20px 1fr;
  gap: 1rem;
  font-size: clamp(1rem, 1.8vw, 1.16rem);
  line-height: 1.45;
}

.fun-card li span {
  color: var(--portfolio-accent);
}

.fun-card li p {
  margin: 0;
  font-size: inherit;
}
</style>