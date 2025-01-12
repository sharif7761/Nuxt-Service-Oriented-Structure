export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s - Task',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800;900&display=swap'
        }
      ]
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: {enabled: true},
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@pinia/nuxt", "@nuxt/image", "@nuxtjs/i18n", "@nuxtjs/color-mode"],
  plugins: [{ src: '~/plugins/storeInit.ts', mode: 'client' }, '~/plugins/fetchInterceptor.ts'],
  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  tailwindcss: {
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: "last" }],
    configPath: 'tailwind.config',
    exposeConfig: {
      level: 2
    },
    config: {},
    viewer: true,
  },
  image: {

  },
  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      alwaysRedirect: false
    },
    defaultLocale: 'en',
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        iso:'en-US',
        dir: 'ltr'
      },
      {
        code: 'bn',
        name: 'Bangla',
        file: 'bn.json',
        iso:'bn-BD',
        dir: 'rtl'
      },
    ],
    fallbackLocale: 'en',
    langDir: 'locales',
  },
  runtimeConfig: {
    secretKey: '',
    public: {
      api_base_url: process.env.VITE_API_BASE_URL,
      task_token: process.env.VITE_TASK_MODAL_TOKEN,
    }
  },
})

