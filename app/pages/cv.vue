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

const initials = computed(() => (profile.value?.fullname ?? 'Dorivaldo Valentim')
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map(part => part[0])
  .join(''))

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

        <article v-if="profile" class="cv-sheet">
          <header class="cv-header">
            <div class="cv-identity">
              <div class="cv-kicker-row">
                <p class="cv-label">{{ t('cvLabel') }}</p>
                <span class="cv-edition">Portfolio · 2026</span>
              </div>
              <h1>{{ profile?.fullname }}</h1>
              <p class="cv-role">{{ profile?.role }}</p>
              <p v-if="profile?.headline" class="cv-headline">{{ profile.headline }}</p>
            </div>
            <div class="cv-portrait" aria-hidden="true">
              <img v-if="profile?.avatar" :src="profile.avatar" :alt="`Foto de ${profile.name}`" />
              <span v-else>{{ initials }}</span>
            </div>
          </header>

          <div class="cv-contact-strip">
            <a :href="`mailto:${profile.email}`"><small>Email</small>{{ profile.email }}</a>
            <a v-if="profile.phone" :href="`tel:${profile.phone.replace(/[^\d+]/g, '')}`"><small>{{ locale === 'pt' ? 'Telefone' : 'Phone' }}</small>{{ profile.phone }}</a>
            <p v-if="profile.location"><small>{{ locale === 'pt' ? 'Localização' : 'Location' }}</small>{{ profile.location }}</p>
          </div>

          <div class="cv-grid">
            <aside>
              <section v-if="profile.socials?.length">
                <h2>{{ t('contact') }}</h2>
                <div class="cv-socials">
                  <a v-for="social in profile.socials" :key="social.label" :href="social.url" target="_blank" rel="noopener noreferrer">
                    {{ social.label }} <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </section>
              <section v-if="profile?.education">
                <h2>{{ locale === 'pt' ? 'Educação' : 'Education' }}</h2>
                <p>{{ profile.education }}</p>
              </section>
              <section v-if="profile?.languages">
                <h2>{{ locale === 'pt' ? 'Idiomas' : 'Languages' }}</h2>
                <p>{{ profile.languages }}</p>
              </section>
              <section class="cv-skills">
                <h2>{{ locale === 'pt' ? 'Competências' : 'Skills' }}</h2>
                <div v-for="group in groupedSkills" :key="group.category" class="cv-skill-group">
                  <h3>{{ group.category }}</h3>
                  <div class="cv-tags">
                    <span v-for="skill in group.items" :key="skill">{{ skill }}</span>
                  </div>
                </div>
              </section>
            </aside>

            <div class="cv-main">
              <section class="cv-profile">
                <div class="cv-section-title">
                  <span>01 /</span>
                  <h2>{{ t('profile') }}</h2>
                </div>
                <p class="cv-intro">{{ profile?.intro }}</p>
                <div class="cv-bio" v-html="profile?.bio"></div>
              </section>

              <section class="cv-experience">
                <div class="cv-section-title">
                  <span>02 /</span>
                  <h2>{{ t('experience') }}</h2>
                </div>
                <article v-for="experience in experiences ?? []" :key="experience.id" class="cv-entry">
                  <span class="cv-entry-dot" aria-hidden="true"></span>
                  <div class="cv-entry-head">
                    <div>
                      <h3>{{ experience.role }}</h3>
                      <p>{{ experience.company }}<span v-if="experience.location"> · {{ experience.location }}</span></p>
                    </div>
                    <time>{{ formatDate(experience.startDate) }} — {{ formatDate(experience.endDate) }}</time>
                  </div>
                  <div class="cv-entry-description" v-html="experience.description"></div>
                  <div v-if="experience.technologies?.length" class="cv-entry-tech">
                    <span v-for="technology in experience.technologies" :key="technology">{{ technology }}</span>
                  </div>
                </article>
                <p v-if="!experiences?.length">{{ t('noneExperience') }}</p>
              </section>
            </div>
          </div>

          <footer class="cv-footer">
            <strong>{{ initials }}</strong>
            <span>{{ profile.role }}</span>
            <span>{{ profile.email }}</span>
          </footer>
        </article>

        <div v-else class="cv-loading" aria-live="polite">
          <span></span><span></span><span></span>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.cv-page { --cv-forest: #0b211a; --cv-green: #57d69a; --cv-lime: #dff56d; --cv-paper: #fbfcf9; --cv-soft: #eef3ed; --cv-ink: #15221e; --cv-muted: #5f7069; min-height: 100vh; padding: 3rem 0 6rem; background: radial-gradient(circle at 15% 10%, #eff7f1 0, #d9e3dd 42%, #cbd7d1 100%); color: var(--cv-ink); }
.cv-actions { display: flex; justify-content: space-between; gap: 1rem; max-width: 1040px; margin: 0 auto 1.5rem; }
.cv-sheet { position: relative; max-width: 1040px; margin: auto; overflow: hidden; background: var(--cv-paper); box-shadow: 0 35px 100px rgba(10, 32, 25, .2); }
.cv-sheet::before { position: absolute; z-index: 2; top: 0; left: 0; width: 7px; height: 100%; background: linear-gradient(var(--cv-green), var(--cv-lime)); content: ''; }
.cv-header { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 3rem; min-height: 310px; padding: 4.2rem 4.5rem 3.8rem; overflow: hidden; background: var(--cv-forest); color: #fff; }
.cv-header::after { position: absolute; right: -120px; bottom: -210px; width: 480px; height: 480px; border: 1px solid rgba(223, 245, 109, .22); border-radius: 50%; box-shadow: 0 0 0 45px rgba(87, 214, 154, .05), 0 0 0 90px rgba(87, 214, 154, .035); content: ''; }
.cv-identity { position: relative; z-index: 1; max-width: 680px; }
.cv-header h1 { max-width: 650px; margin: 0; font-size: clamp(3rem, 6vw, 5.4rem); font-weight: 850; letter-spacing: -.065em; line-height: .88; }
.cv-label { display: inline-flex; align-items: center; gap: .7rem; margin-bottom: 1.35rem; color: var(--cv-lime); font-size: .68rem; font-weight: 850; letter-spacing: .2em; text-transform: uppercase; }
.cv-label::before { width: 34px; height: 2px; background: var(--cv-green); content: ''; }
.cv-role { margin: 1.4rem 0 .55rem; color: #fff; font-size: 1.15rem; font-weight: 750; letter-spacing: .02em; }
.cv-headline { max-width: 600px; margin: 0; color: #b9cec6; font-size: .94rem; line-height: 1.55; }
.cv-portrait { position: relative; z-index: 1; display: grid; width: 150px; min-width: 150px; aspect-ratio: 1; place-items: center; border: 1px solid rgba(255,255,255,.18); border-radius: 28px; background: linear-gradient(145deg, rgba(87,214,154,.2), rgba(223,245,109,.06)); color: var(--cv-lime); font-size: 2.2rem; font-weight: 850; transform: rotate(3deg); }
.cv-portrait::before { position: absolute; inset: -10px 10px 10px -10px; z-index: -1; border: 1px solid var(--cv-green); border-radius: inherit; content: ''; opacity: .65; }
.cv-portrait img { width: 100%; height: 100%; border-radius: inherit; object-fit: cover; filter: saturate(.82) contrast(1.04); }
.cv-contact-strip { display: grid; grid-template-columns: 1.45fr 1.25fr .9fr; gap: 0; padding: 0 4.5rem; background: #15372d; color: #d9e7e1; }
.cv-contact-strip > * { display: flex; align-items: center; gap: .6rem; min-width: 0; margin: 0; padding: 1.1rem 1rem; border-right: 1px solid rgba(255,255,255,.1); color: inherit; font-size: .78rem; overflow-wrap: anywhere; }
.cv-contact-strip > *:first-child { padding-left: 0; }
.cv-contact-strip > *:last-child { border-right: 0; }
.cv-contact-strip span { display: grid; width: 24px; height: 24px; flex: 0 0 24px; place-items: center; border-radius: 50%; background: rgba(87,214,154,.15); color: var(--cv-green); font-weight: 800; }
.cv-grid { display: grid; grid-template-columns: 275px 1fr; }
.cv-grid aside { padding: 3.4rem 2.4rem 3.6rem; border-right: 1px solid #dfe7e1; background: var(--cv-soft); }
.cv-grid aside section + section { margin-top: 2.7rem; }
.cv-grid aside h2 { display: flex; align-items: center; gap: .65rem; margin: 0 0 1rem; color: var(--cv-forest); font-size: .74rem; font-weight: 850; letter-spacing: .13em; text-transform: uppercase; }
.cv-grid aside h2 > span { color: #46a97e; font-size: .6rem; letter-spacing: 0; }
.cv-grid aside a, .cv-grid aside p { display: block; margin: 0; color: var(--cv-muted); font-size: .84rem; line-height: 1.65; overflow-wrap: anywhere; }
.cv-socials { display: grid; gap: .45rem; }
.cv-socials a { display: flex; justify-content: space-between; padding-bottom: .4rem; border-bottom: 1px solid #d7e1da; color: #30483f; font-weight: 700; }
.cv-skills { break-inside: avoid; }
.cv-skill-group + .cv-skill-group { margin-top: 1.25rem; }
.cv-skill-group h3 { margin: 0 0 .6rem; color: #6a7c75; font-size: .66rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
.cv-tags, .cv-entry-tech { display: flex; flex-wrap: wrap; gap: .38rem; }
.cv-tags span { padding: .32rem .5rem; border: 1px solid #cfdbd4; border-radius: 5px; background: rgba(255,255,255,.55); color: #30483f; font-size: .66rem; font-weight: 700; line-height: 1.2; }
.cv-main { padding: 3.4rem 4rem 4rem; }
.cv-main section + section { margin-top: 3rem; }
.cv-section-title { display: flex; align-items: center; gap: .8rem; margin-bottom: 1.25rem; }
.cv-section-title > span { display: grid; width: 30px; height: 30px; place-items: center; border-radius: 50%; background: var(--cv-forest); color: var(--cv-lime); font-size: .61rem; font-weight: 850; }
.cv-section-title h2 { margin: 0; color: var(--cv-forest); font-size: .8rem; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; }
.cv-intro { margin: 0 0 .8rem; color: #213d33; font-size: 1.05rem; font-weight: 650; line-height: 1.65; }
.cv-bio, .cv-main p, .cv-main li { color: var(--cv-muted); font-size: .9rem; line-height: 1.7; }
.cv-bio :deep(p:last-child) { margin-bottom: 0; }
.cv-experience { position: relative; }
.cv-entry { position: relative; margin-left: 14px; padding: 0 0 2rem 2rem; border-left: 1px solid #cad8d0; break-inside: avoid; }
.cv-entry:last-of-type { padding-bottom: 0; border-left-color: transparent; }
.cv-entry-dot { position: absolute; top: .15rem; left: -6px; width: 11px; height: 11px; border: 3px solid var(--cv-paper); border-radius: 50%; background: #46bd88; box-shadow: 0 0 0 1px #46bd88; }
.cv-entry-head { display: flex; justify-content: space-between; gap: 1rem; margin-bottom: .65rem; }
.cv-entry h3 { margin: 0 0 .25rem; color: var(--cv-ink); font-size: 1.08rem; font-weight: 820; letter-spacing: -.015em; }
.cv-entry-head p { margin: 0; color: #3f5a50; font-size: .8rem; font-weight: 700; }
.cv-entry time { flex: 0 0 auto; padding-top: .12rem; color: #71827b; font-size: .69rem; font-weight: 700; white-space: nowrap; }
.cv-entry-description :deep(p) { margin-bottom: .75rem; }
.cv-entry-tech span { padding: .28rem .5rem; border-radius: 999px; background: #e7f2eb; color: #337657; font-size: .63rem; font-weight: 750; }
.cv-footer { display: flex; align-items: center; gap: 1rem; padding: 1.15rem 4.5rem; border-top: 1px solid #dfe7e1; color: #6d7d76; font-size: .68rem; }
.cv-footer strong { display: grid; width: 28px; height: 28px; place-items: center; border-radius: 50%; background: var(--cv-forest); color: var(--cv-lime); font-size: .62rem; }
.cv-footer span:last-child { margin-left: auto; }
.cv-loading { display: flex; align-items: center; justify-content: center; gap: .55rem; min-height: 500px; max-width: 1040px; margin: auto; background: var(--cv-paper); }
.cv-loading span { width: 9px; height: 9px; border-radius: 50%; background: var(--cv-green); animation: cv-pulse 1s ease-in-out infinite alternate; }
.cv-loading span:nth-child(2) { animation-delay: .2s; }.cv-loading span:nth-child(3) { animation-delay: .4s; }
.cv-page { --cv-forest: #10271f; --cv-green: #35b77d; --cv-lime: #dff56d; --cv-paper: #fcfcf8; --cv-soft: #f1f3ed; --cv-ink: #14211c; --cv-muted: #5c6963; background: #dce4df; }
.cv-sheet { border-radius: 2px; box-shadow: 0 24px 70px rgba(11, 31, 24, .16); }
.cv-sheet::before { width: 5px; background: var(--cv-lime); }
.cv-header { display: grid; grid-template-columns: minmax(0, 1fr) 144px; align-items: end; gap: 4rem; min-height: 270px; padding: 3.6rem 4.5rem 3.2rem; }
.cv-header::after { top: -155px; right: 72px; bottom: auto; width: 390px; height: 390px; border-color: rgba(223, 245, 109, .13); box-shadow: none; }
.cv-kicker-row { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1.5rem; }
.cv-label, .cv-edition { margin: 0; font-size: .62rem; font-weight: 800; letter-spacing: .18em; text-transform: uppercase; }
.cv-label { gap: .65rem; color: var(--cv-lime); }
.cv-label::before { width: 28px; height: 1px; }
.cv-edition { color: #789087; }
.cv-header h1 { max-width: 700px; font-size: clamp(3.2rem, 6vw, 5rem); font-weight: 760; }
.cv-role { margin: 1.15rem 0 .45rem; font-size: 1.05rem; font-weight: 720; }
.cv-headline { max-width: 580px; color: #aabdb5; font-size: .88rem; }
.cv-portrait { width: 144px; min-width: 144px; border-radius: 28px; font-size: 2.1rem; }
.cv-portrait::before { inset: -9px 9px 9px -9px; }
.cv-contact-strip { grid-template-columns: 1.5fr 1fr .8fr; border-bottom: 1px solid #dfe5df; background: #fff; color: #263b33; }
.cv-contact-strip > * { display: grid; gap: .16rem; padding: 1.15rem 1.25rem; border-right-color: #e3e8e3; color: #263b33; font-size: .77rem; font-weight: 650; }
.cv-contact-strip small { color: #829089; font-size: .55rem; font-weight: 800; letter-spacing: .13em; text-transform: uppercase; }
.cv-grid { grid-template-columns: 250px 1fr; }
.cv-grid aside { padding: 3.2rem 2.2rem 3.6rem 2.6rem; border-right-color: #dfe5df; }
.cv-grid aside section + section { margin-top: 2.45rem; }
.cv-grid aside h2 { display: block; margin-bottom: .9rem; padding-top: .65rem; border-top: 2px solid var(--cv-forest); font-size: .65rem; letter-spacing: .15em; }
.cv-grid aside a, .cv-grid aside p { font-size: .78rem; }
.cv-socials { gap: .5rem; }
.cv-socials a { padding-bottom: 0; border-bottom: 0; color: #2f473d; }
.cv-socials a span { color: var(--cv-green); }
.cv-skill-group + .cv-skill-group { margin-top: 1.2rem; }
.cv-skill-group h3 { margin-bottom: .55rem; color: #738079; font-size: .58rem; letter-spacing: .1em; }
.cv-tags, .cv-entry-tech { gap: .35rem; }
.cv-tags span { padding: .27rem .45rem; border-color: #d0d9d2; border-radius: 2px; background: rgba(255,255,255,.7); color: #32483f; font-size: .62rem; font-weight: 680; }
.cv-main { padding: 3.2rem 4rem 4rem; }
.cv-section-title { align-items: baseline; gap: .72rem; margin-bottom: 1.25rem; padding-bottom: .65rem; border-bottom: 1px solid #dbe2dc; }
.cv-section-title > span { display: block; width: auto; height: auto; border-radius: 0; background: transparent; color: var(--cv-green); font-size: .61rem; letter-spacing: .08em; }
.cv-section-title h2 { font-size: .72rem; letter-spacing: .17em; }
.cv-intro { font-size: 1.02rem; font-weight: 620; line-height: 1.62; }
.cv-bio, .cv-main p, .cv-main li { font-size: .84rem; line-height: 1.68; }
.cv-entry { margin-left: 0; padding: 0 0 2.1rem; border-left: 0; }
.cv-entry-dot { top: .1rem; left: -1rem; width: 3px; height: 1.85rem; border: 0; border-radius: 0; background: var(--cv-green); box-shadow: none; }
.cv-entry-head { display: grid; grid-template-columns: minmax(0, 1fr) auto; }
.cv-entry h3 { font-size: 1.04rem; font-weight: 790; letter-spacing: -.02em; }
.cv-entry-head p { color: #3b554a; font-size: .77rem; }
.cv-entry time { font-size: .64rem; font-weight: 750; }
.cv-entry-tech span { padding: .25rem .46rem; border-radius: 2px; background: #e8efe9; color: #38775a; font-size: .59rem; }
.cv-footer { padding: 1rem 4.5rem; border-top-color: #dfe5df; color: #77837d; font-size: .62rem; }
.cv-footer strong { width: 25px; height: 25px; border-radius: 0; font-size: .55rem; }
@keyframes cv-pulse { to { opacity: .25; transform: translateY(-5px); } }
@media (max-width: 767.98px) { .cv-page { padding-top: 1.5rem; } .cv-header { grid-template-columns: minmax(0, 1fr) 92px; align-items: start; gap: 1.5rem; min-height: auto; padding: 2.7rem 2rem; } .cv-header h1 { font-size: clamp(2.7rem, 13vw, 4.4rem); } .cv-portrait { width: 92px; min-width: 92px; border-radius: 20px; } .cv-edition { display: none; } .cv-contact-strip { grid-template-columns: 1fr; padding: .6rem 2rem; } .cv-contact-strip > * { padding: .55rem 0; border-right: 0; } .cv-grid { grid-template-columns: 1fr; } .cv-grid aside { padding: 2.5rem 2rem; border-right: 0; border-bottom: 1px solid #dfe5df; } .cv-main { padding: 2.8rem 2rem; } .cv-entry-head { grid-template-columns: 1fr; gap: .2rem; } .cv-footer { align-items: flex-start; padding: 1rem 2rem; } .cv-footer span:last-child { margin-left: 0; } }
@media (max-width: 480px) { .cv-header { grid-template-columns: 1fr; } .cv-portrait { display: none; } .cv-footer { flex-wrap: wrap; } }
@media print {
  @page { size: A4; margin: 12mm 10mm 14mm; }
  html, body { background: #fff !important; }
  .no-print { display: none !important; }
  .cv-page { min-height: 0; padding: 0; background: #fff; }
  .container { max-width: none; padding: 0; }
  .cv-sheet { max-width: none; overflow: visible; border: 1px solid #dfe5df; border-radius: 0; box-shadow: none; }
  .cv-sheet::before, .cv-header, .cv-grid aside, .cv-footer strong, .cv-entry-dot { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
  .cv-sheet::before { width: 3px; }
  .cv-header { grid-template-columns: minmax(0, 1fr) 100px; min-height: 176px; padding: 1.7rem 2.2rem 1.55rem; break-inside: avoid; }
  .cv-header::after { display: none; }
  .cv-header h1 { font-size: 2.8rem; }
  .cv-kicker-row { margin-bottom: .75rem; }
  .cv-role { margin: .7rem 0 .3rem; font-size: .92rem; }
  .cv-headline { font-size: .76rem; line-height: 1.4; }
  .cv-portrait { width: 96px; min-width: 96px; border-radius: 20px; }
  .cv-contact-strip { grid-template-columns: 1.45fr 1fr .85fr; padding-inline: 2.2rem; break-inside: avoid; }
  .cv-contact-strip > * { padding: .65rem .8rem; font-size: .68rem; }
  .cv-grid { display: grid; grid-template-columns: 185px minmax(0, 1fr); align-items: stretch; }
  .cv-grid aside { display: block; padding: 1.65rem 1.25rem 2rem 1.55rem; border-right: 1px solid #dfe5df; border-bottom: 0; }
  .cv-grid aside section + section { margin-top: 1.45rem; }
  .cv-grid aside h2 { margin-bottom: .55rem; padding-top: .45rem; font-size: .56rem; }
  .cv-grid aside a, .cv-grid aside p { font-size: .65rem; line-height: 1.48; }
  .cv-socials { gap: .3rem; }
  .cv-skill-group + .cv-skill-group { margin-top: .75rem; }
  .cv-skill-group h3 { margin-bottom: .35rem; font-size: .5rem; }
  .cv-tags { gap: .22rem; }
  .cv-tags span { padding: .18rem .3rem; font-size: .52rem; }
  .cv-main { padding: 1.65rem 1.8rem 2rem; }
  .cv-main section + section { margin-top: 1.7rem; }
  .cv-section-title { margin-bottom: .85rem; padding-bottom: .45rem; }
  .cv-intro { font-size: .88rem; line-height: 1.5; }
  .cv-bio, .cv-main p, .cv-main li { font-size: .74rem; line-height: 1.52; }
  .cv-entry { padding-bottom: 1.2rem; break-inside: auto; page-break-inside: auto; }
  .cv-entry-head { break-after: avoid; page-break-after: avoid; }
  .cv-entry-description :deep(p), .cv-entry-description :deep(li) { orphans: 3; widows: 3; }
  .cv-entry-tech { break-before: avoid; page-break-before: avoid; }
  .cv-entry h3 { font-size: .92rem; }
  .cv-entry-head p { font-size: .68rem; }
  .cv-entry time { font-size: .58rem; }
  .cv-entry-description :deep(p) { margin-bottom: .5rem; }
  .cv-entry-tech span { font-size: .52rem; }
  .cv-footer { padding: .7rem 2.2rem; break-inside: avoid; }
}
</style>
