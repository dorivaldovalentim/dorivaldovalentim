<script setup lang="ts">
const achievements = useAchievements()
const { locale, t } = useLocale()

const formatDate = (value: string) => new Date(value).toLocaleDateString(
  locale.value === 'pt' ? 'pt-PT' : 'en-US',
  { year: 'numeric', month: 'long', timeZone: 'UTC' }
)
</script>

<template>
  <section v-if="achievements?.length" id="conquistas" class="container section-space">
    <div class="achievement-heading">
      <div>
        <p class="achievement-eyebrow">01 · {{ t('achievements') }}</p>
        <h2 class="section-heading display-5">{{ t('achievements') }}</h2>
      </div>
      <p>{{ t('achievementsLead') }}</p>
    </div>

    <article v-for="achievement in achievements" :key="achievement.id" class="achievement-card">
      <div class="achievement-rank" aria-hidden="true">
        <span>1</span><sup>º</sup>
      </div>

      <div class="achievement-content">
        <div class="achievement-meta">
          <span>{{ formatDate(achievement.achievementDate) }}</span>
          <a v-if="achievement.websiteUrl" :href="achievement.websiteUrl" target="_blank" rel="noopener noreferrer">
            {{ achievement.organization }} ↗
          </a>
          <span v-else>{{ achievement.organization }}</span>
          <span v-if="achievement.teamSize">{{ t('teamOf') }} {{ achievement.teamSize }} {{ t('people') }}</span>
        </div>

        <div class="achievement-title-row">
          <div>
            <p class="achievement-result">{{ achievement.result }}</p>
            <h3>{{ achievement.title }}</h3>
          </div>
          <span class="achievement-medal" aria-hidden="true">✦</span>
        </div>

        <p class="achievement-summary">{{ achievement.summary }}</p>
        <div v-if="achievement.description" class="achievement-description" v-html="achievement.description"></div>

        <div v-if="achievement.technologies?.length" class="achievement-stack">
          <span v-for="technology in achievement.technologies" :key="technology">{{ technology }}</span>
        </div>
      </div>
    </article>
  </section>
</template>

<style scoped>
.achievement-heading { display: grid; grid-template-columns: 1fr minmax(250px, 430px); align-items: end; gap: 2rem; margin-bottom: 2.5rem; }
.achievement-heading h2 { margin: 0; }
.achievement-heading > p { margin: 0 0 .35rem; color: var(--portfolio-muted); font-size: 1.05rem; line-height: 1.65; }
.achievement-eyebrow { margin: 0 0 .65rem; color: var(--portfolio-accent); font-size: .72rem; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
.achievement-card { position: relative; display: grid; grid-template-columns: 180px 1fr; overflow: hidden; border: 1px solid var(--portfolio-line); border-radius: 12px; background: var(--portfolio-card); }
.achievement-card::after { position: absolute; right: -90px; bottom: -130px; width: 300px; height: 300px; border: 1px solid rgba(223, 245, 109, .13); border-radius: 50%; box-shadow: 0 0 0 45px rgba(87, 214, 154, .025); content: ''; pointer-events: none; }
.achievement-rank { display: flex; align-items: flex-start; justify-content: center; min-height: 100%; padding: 2.5rem 1rem; border-right: 1px solid var(--portfolio-line); background: linear-gradient(145deg, rgba(87, 214, 154, .13), rgba(223, 245, 109, .025)); color: var(--portfolio-accent-2); }
.achievement-rank span { font-size: clamp(4.5rem, 9vw, 7.5rem); font-weight: 900; letter-spacing: -.09em; line-height: .8; }
.achievement-rank sup { margin: -.15rem 0 0 .2rem; font-size: 1.1rem; font-weight: 900; }
.achievement-content { position: relative; z-index: 1; padding: 2.5rem 3rem; }
.achievement-meta { display: flex; flex-wrap: wrap; gap: .6rem 1.4rem; margin-bottom: 2rem; color: var(--portfolio-muted); font-size: .72rem; font-weight: 750; letter-spacing: .08em; text-transform: uppercase; }
.achievement-meta a { color: var(--portfolio-accent); text-decoration: none; }
.achievement-title-row { display: flex; align-items: start; justify-content: space-between; gap: 1.5rem; }
.achievement-result { margin: 0 0 .35rem; color: var(--portfolio-accent); font-size: .76rem; font-weight: 850; letter-spacing: .14em; text-transform: uppercase; }
.achievement-title-row h3 { margin: 0; color: var(--portfolio-ink); font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 850; letter-spacing: -.045em; }
.achievement-medal { display: grid; width: 3.4rem; aspect-ratio: 1; flex: 0 0 auto; place-items: center; border: 1px solid var(--portfolio-accent); border-radius: 50%; color: var(--portfolio-accent-2); font-size: 1.4rem; }
.achievement-summary { max-width: 760px; margin: 1.4rem 0 .75rem; color: var(--portfolio-ink); font-size: 1.08rem; font-weight: 650; line-height: 1.65; }
.achievement-description { max-width: 780px; color: var(--portfolio-muted); line-height: 1.7; }
.achievement-description :deep(p:last-child) { margin-bottom: 0; }
.achievement-stack { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 1.6rem; }
.achievement-stack span { padding: .4rem .7rem; border: 1px solid var(--portfolio-line); border-radius: 999px; color: var(--portfolio-accent); font-size: .72rem; font-weight: 750; }
@media (max-width: 767px) {
  .achievement-heading { grid-template-columns: 1fr; gap: .75rem; }
  .achievement-card { grid-template-columns: 1fr; }
  .achievement-rank { justify-content: flex-start; min-height: auto; padding: 1.5rem 2rem; border-right: 0; border-bottom: 1px solid var(--portfolio-line); }
  .achievement-rank span { font-size: 4rem; }
  .achievement-content { padding: 2rem; }
}
</style>
