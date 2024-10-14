// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Home'
    }
  },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/fonts', '@nuxtjs/tailwindcss', '@nuxt/icon', '@nuxtjs/seo'],
  site: {
    url: 'https://teyvat-dev.vercel.app',
    name: 'Teyvat Dev',
    description:
      'Teyvat-dev is an open-source API that provides information about Genshin Impact',
    defaultLocale: 'en'
  },
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
