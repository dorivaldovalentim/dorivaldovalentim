// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '~/assets/css/variables.css',
    '~/assets/css/main.css'
  ],
  vite: {
    optimizeDeps: {
      include: ['bootstrap', '@popperjs/core']
    }
  },
  modules: ['nuxt-gtag'],
  runtimeConfig: {
    cmsProvider: process.env.NUXT_CMS_PROVIDER ?? 'squidex',
    directusToken: process.env.NUXT_DIRECTUS_TOKEN ?? '',
    directusUrl: process.env.NUXT_DIRECTUS_URL ?? process.env.NUXT_PUBLIC_DIRECTUS_URL ?? '',
    squidexClientId: `${process.env.NUXT_SQUIDEX_CLIENT_ID ?? ''}`,
    squidexClientSecret: `${process.env.NUXT_SQUIDEX_CLIENT_SECRET ?? ''}`,
    public: {
      gtagId: process.env.NUXT_PUBLIC_GTAG_ID ?? '',
      directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL ?? '',
      squidexUrl: `${process.env.NUXT_PUBLIC_SQUIDEX_URL ?? ''}`,
      squidexApp: `${process.env.NUXT_PUBLIC_SQUIDEX_APP ?? ''}`
    }
  },
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID ?? ''
  },
  app: {
    head: {
      htmlAttrs: { lang: 'pt' },
      titleTemplate: '%s · Dorivaldo Valentim',
      meta: [
        { name: 'theme-color', content: '#08110f' },
        { name: 'color-scheme', content: 'dark' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'pt_AO' },
        { property: 'og:site_name', content: 'Dorivaldo Valentim' },
        { name: 'twitter:card', content: 'summary_large_image' }
      ]
    }
  }
})
