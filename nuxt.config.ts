// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@nuxtjs/strapi'],

  runtimeConfig: {
    app: {
      strapi: {
        token: process.env.STRAPI_API_TOKEN
      }
    }
  }
})