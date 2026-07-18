<script setup lang="ts">
const profile = useProfile()
</script>

<template>
  <section id="contacto" class="contact-section section-space">
    <div class="container">
      <h2 class="section-heading text-md-center">Contato</h2>
      <p class="text-md-center">
        Tem uma pergunta, uma proposta ou apenas quer dizer oi? Fique à vontade para me contatar.
      </p>

      <form :action="`mailto:${profile?.email}`" method="post" class="contact-form" enctype="text/plain">
        <div class="row">
          <div class="col-12 col-md-6 mb-3">
            <input type="text" name="nome" class="form-control" placeholder="Seu Nome" aria-label="Seu Nome" />
          </div>

          <div class="col-12 col-md-6 mb-3">
            <input type="email" name="email" class="form-control" placeholder="Seu Email" aria-label="Seu Email" />
          </div>

          <div class="col-12 mb-4">
            <textarea name="mensagem" rows="6" class="form-control" placeholder="Sua Mensagem" aria-label="Sua Mensagem" />
          </div>

          <div class="col-12 text-center">
            <button class="btn btn-brand btn-lg fw-bold" type="submit">Enviar Mensagem</button>
          </div>
        </div>
      </form>

      <div class="social-block">
        <p>Ou me encontre nas redes sociais:</p>
        <div class="d-flex flex-wrap gap-3 justify-content-center" aria-label="Redes sociais">
          <a v-for="social in profile?.socials ?? []" :key="social.label" :href="social.url">
            {{ social.label }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  min-height: 100vh;
}

.contact-form input,
.contact-form textarea {
  border: 1px solid #344055;
  border-radius: 8px;
  background: var(--portfolio-card);
  color: var(--portfolio-ink);
  font: inherit;
  font-size: 1.12rem;
  outline: none;
  padding: 1.1rem 1.25rem;
}

.contact-form textarea {
  resize: vertical;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--portfolio-accent);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.12);
}

.contact-form ::placeholder {
  color: #a7b0bd;
}
</style>