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
    public: {
      gtagId: process.env.NUXT_PUBLIC_GTAG_ID ?? '',
    }
  },
  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID ?? ''
  }
})
