<script setup lang="ts">
const profile = useProfile()
const { locale, t } = useLocale()
const form = reactive({ name: '', email: '', message: '', website: '' })
const pending = ref(false)
const feedback = ref<'success' | 'error' | null>(null)

const submit = async () => {
  pending.value = true
  feedback.value = null

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: { ...form, locale: locale.value }
    })
    form.name = ''
    form.email = ''
    form.message = ''
    form.website = ''
    feedback.value = 'success'
  } catch {
    feedback.value = 'error'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <section id="contacto" class="contact-section section-space">
    <div class="container">
      <h2 class="section-heading text-md-center">{{ t('contact') }}</h2>
      <p class="text-md-center">
        {{ t('contactLead') }}
      </p>
      <div v-if="profile?.phone" class="text-center mb-4">
        <span class="contact-phone">{{ profile.phone }}</span>
      </div>

      <form class="contact-form" @submit.prevent="submit">
        <div class="row">
          <div class="col-12 col-md-6 mb-3">
            <input v-model="form.name" type="text" name="name" class="form-control" :placeholder="t('name')" :aria-label="t('name')" autocomplete="name" minlength="2" maxlength="120" required />
          </div>

          <div class="col-12 col-md-6 mb-3">
            <input v-model="form.email" type="email" name="email" class="form-control" :placeholder="t('email')" :aria-label="t('email')" autocomplete="email" maxlength="254" required />
          </div>

          <div class="col-12 mb-4">
            <textarea v-model="form.message" name="message" rows="6" class="form-control" :placeholder="t('message')" :aria-label="t('message')" minlength="10" maxlength="5000" required />
          </div>

          <div class="contact-trap" aria-hidden="true">
            <label for="contact-website">Website</label>
            <input id="contact-website" v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" />
          </div>

          <div class="col-12 text-center">
            <button class="btn btn-brand btn-lg fw-bold" type="submit" :disabled="pending">
              {{ pending ? t('sending') : t('send') }}
            </button>
            <p v-if="feedback" class="contact-feedback mt-3 mb-0" :class="`is-${feedback}`" role="status" aria-live="polite">
              {{ feedback === 'success' ? t('sent') : t('sendError') }}
            </p>
          </div>
        </div>
      </form>

      <div class="social-block">
        <p>{{ t('socialLead') }}</p>
        <div class="d-flex flex-wrap gap-3 justify-content-center" :aria-label="t('socialLabel')">
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

.contact-phone { color: var(--portfolio-accent); font-weight: 700; }
.contact-trap { position: absolute; left: -10000px; width: 1px; height: 1px; overflow: hidden; }
.contact-feedback { font-weight: 700; }
.contact-feedback.is-success { color: #6ee7b7; }
.contact-feedback.is-error { color: #fca5a5; }
.contact-form button:disabled { cursor: wait; opacity: .68; }
</style>
