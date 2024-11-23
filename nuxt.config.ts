// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Dorivaldo Valentim",
      meta: [
        { charset: "utf-8" },
        { name: "author", content: "Dorivaldo Valentim" },
      ],
    },
  },
  css: [
    '~/assets/scss/main.scss'
  ],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/strapi', '@nuxtjs/i18n'],

  runtimeConfig: {
    app: {
      appName: process.env.APP_NAME,
      strapi: {
        token: process.env.STRAPI_API_TOKEN
      }
    }
  },

  i18n: {
    defaultLocale: 'pt-AO',
    langDir: "lang",
    strategy: 'prefix_except_default',
    customRoutes: 'page',
    locales: [
      { code: 'pt-AO', name: 'Português', file: 'pt.ts' },
      { code: 'en', name: 'Inglês', file: 'en.ts' }
    ],
    compilation: {
      strictMessage: false
    }
  },
})