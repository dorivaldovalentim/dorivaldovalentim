// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/strapi', '@nuxtjs/i18n'],

  runtimeConfig: {
    app: {
      strapi: {
        token: process.env.STRAPI_API_TOKEN
      }
    }
  },

  i18n: {
    defaultLocale: 'pt',
    langDir: "lang",
    strategy: 'prefix_except_default',
    customRoutes: 'page',
    locales: [
      { code: 'pt', name: 'Português', file: 'pt.ts' },
      { code: 'en', name: 'Inglês', file: 'en.ts' }
    ],
    compilation: {
      strictMessage: false
    }
  },
})