<script setup lang="ts">
const profile = useProfile()
const experiences = useExperiences()
const skills = useSkills()
const { locale, t } = useLocale()

const groupedSkills = computed(() => {
  const groups = new Map<string, string[]>()
  for (const skill of skills.value ?? []) {
    const category = skill.category || 'Outros'
    groups.set(category, [...(groups.get(category) ?? []), skill.name])
  }
  return Array.from(groups, ([category, items]) => ({ category, items }))
})

const formatDate = (value?: string) => value
  ? new Date(value).toLocaleDateString(locale.value === 'pt' ? 'pt-PT' : 'en-US', { year: 'numeric', month: 'short' })
  : t('present')

const printCv = () => window.print()

useSeoMeta({
  title: () => locale.value === 'pt' ? 'Currículo' : 'Résumé',
  description: () => locale.value === 'pt' ? `Currículo profissional de ${profile.value?.fullname ?? 'Dorivaldo Valentim'}.` : `Professional résumé of ${profile.value?.fullname ?? 'Dorivaldo Valentim'}.`,
  ogTitle: () => locale.value === 'pt' ? 'Currículo · Dorivaldo Valentim' : 'Résumé · Dorivaldo Valentim'
})
</script>

<template>
  <div>
    <Header class="no-print" />
    <main class="cv-page">
      <div class="container">
        <div class="cv-actions no-print">
          <NuxtLink to="/" class="btn btn-soft">{{ t('backPortfolio') }}</NuxtLink>
          <button class="btn btn-brand fw-bold" type="button" @click="printCv">{{ t('savePdf') }}</button>
        </div>

        <article class="cv-sheet">
          <header class="cv-header">
            <div>
              <p class="cv-label">{{ t('cvLabel') }}</p>
              <h1>{{ profile?.fullname }}</h1>
              <p class="cv-role">{{ profile?.role }}</p>
            </div>
            <img v-if="profile?.avatar" :src="profile.avatar" :alt="`Foto de ${profile.name}`" />
          </header>

          <div class="cv-grid">
            <aside>
              <section>
                <h2>{{ t('contact') }}</h2>
                <a :href="`mailto:${profile?.email}`">{{ profile?.email }}</a>
                <p v-if="profile?.phone">{{ profile.phone }}</p>
                <p>{{ profile?.location }}</p>
                <a v-for="social in profile?.socials ?? []" :key="social.label" :href="social.url">{{ social.label }}</a>
              </section>
              <section v-if="profile?.education">
                <h2>{{ locale === 'pt' ? 'Educação' : 'Education' }}</h2>
                <p>{{ profile.education }}</p>
              </section>
              <section v-if="profile?.languages">
                <h2>{{ locale === 'pt' ? 'Idiomas' : 'Languages' }}</h2>
                <p>{{ profile.languages }}</p>
              </section>
              <section v-for="group in groupedSkills" :key="group.category">
                <h2>{{ group.category }}</h2>
                <p>{{ group.items.join(' · ') }}</p>
              </section>
            </aside>

            <div class="cv-main">
              <section>
                <h2>{{ t('profile') }}</h2>
                <p>{{ profile?.intro }}</p>
                <div class="cv-bio" v-html="profile?.bio"></div>
              </section>

              <section>
                <h2>{{ t('experience') }}</h2>
                <article v-for="experience in experiences ?? []" :key="experience.id" class="cv-entry">
                  <div class="cv-entry-head">
                    <div><h3>{{ experience.role }}</h3><p>{{ experience.company }} · {{ experience.location }}</p></div>
                    <span>{{ formatDate(experience.startDate) }} — {{ formatDate(experience.endDate) }}</span>
                  </div>
                  <div v-html="experience.description"></div>
                </article>
                <p v-if="!experiences?.length">{{ t('noneExperience') }}</p>
              </section>
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<style scoped>
.cv-page { min-height: 100vh; padding: 3rem 0 6rem; background: #dce5e0; color: #15221e; }
.cv-actions { display: flex; justify-content: space-between; gap: 1rem; margin-bottom: 1.5rem; }
.cv-sheet { max-width: 980px; margin: auto; background: #fff; box-shadow: 0 30px 90px rgba(0,0,0,.2); }
.cv-header { display: flex; align-items: center; justify-content: space-between; gap: 2rem; padding: 3.5rem; background: #10231e; color: #fff; }
.cv-header h1 { margin: 0; font-size: clamp(2.8rem, 7vw, 5.2rem); font-weight: 850; letter-spacing: -.06em; line-height: .9; }
.cv-label { margin-bottom: 1rem; color: #9ee6c1; font-size: .72rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
.cv-role { margin: 1.2rem 0 0; color: #c5d5cf; font-size: 1.2rem; }
.cv-header img { width: 130px; aspect-ratio: 1; border: 4px solid #9ee6c1; border-radius: 50%; object-fit: cover; }
.cv-grid { display: grid; grid-template-columns: 280px 1fr; }
.cv-grid aside { padding: 2.8rem; background: #edf3f0; }
.cv-grid aside section + section, .cv-main section + section { margin-top: 2.5rem; }
.cv-grid h2 { margin-bottom: 1rem; color: #10231e; font-size: .78rem; font-weight: 850; letter-spacing: .13em; text-transform: uppercase; }
.cv-grid aside a, .cv-grid aside p { display: block; margin: 0 0 .55rem; color: #4e625b; font-size: .9rem; overflow-wrap: anywhere; }
.cv-main { padding: 2.8rem 3.5rem 4rem; }
.cv-main p, .cv-bio, .cv-main li { color: #4e625b; }
.cv-entry { padding-block: 1.25rem; border-top: 1px solid #dce5e0; }
.cv-entry-head { display: flex; justify-content: space-between; gap: 1rem; }
.cv-entry h3 { margin: 0; font-size: 1.1rem; }
.cv-entry span { color: #6d7e78; font-size: .78rem; white-space: nowrap; }
@media (max-width: 767.98px) { .cv-grid { grid-template-columns: 1fr; } .cv-header, .cv-main, .cv-grid aside { padding: 2rem; } .cv-header img { width: 92px; } .cv-entry-head { display: block; } }
@media print { .no-print { display: none !important; } .cv-page { padding: 0; background: #fff; } .container { max-width: none; padding: 0; } .cv-sheet { max-width: none; box-shadow: none; } .cv-header, .cv-grid aside { print-color-adjust: exact; -webkit-print-color-adjust: exact; } .cv-grid { grid-template-columns: 250px 1fr; } }
</style>
