// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/fonts', '@nuxtjs/tailwindcss', '@nuxt/icon'],
  tailwindcss: {
    viewer: false
  },
  fonts: {
    families: [
      { name: 'Space Grotesk', provider: 'google' },
      { name: 'IBM Plex Sans', provider: 'google' }
    ],
    defaults: {
      weights: [400, 500, 600, 700, 800]
    }
  }
})
