// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  debug: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    preference: 'system', // 'light', 'dark', یا 'system'
    fallback: 'dark',
    classSuffix: '',
  },
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    '@fortawesome/fontawesome-free/css/all.css',
    'vue3-toastify/dist/index.css',
    '~/assets/styles/main.css',
    'vazir-font/dist/font-face.css',
    'bootstrap-icons/font/bootstrap-icons.css'
  ],
  app: {
    head: {
      title: 'کافه شیک',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'viewport-fit=cover,width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no' },
        { name: 'description', content: 'سیستم مدیریت کافه شیک' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE || 'http://localhost:3000'
    }
  }
})
