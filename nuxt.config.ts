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
  runtimeConfig: {
    squidexClientId: `${process.env.NUXT_SQUIDEX_CLIENT_ID ?? ''}`,
    squidexClientSecret: `${process.env.NUXT_SQUIDEX_CLIENT_SECRET ?? ''}`,
    public: {
      squidexUrl: `${process.env.NUXT_PUBLIC_SQUIDEX_URL ?? ''}`,
      squidexApp: `${process.env.NUXT_PUBLIC_SQUIDEX_APP ?? ''}`
    }
  }
})
