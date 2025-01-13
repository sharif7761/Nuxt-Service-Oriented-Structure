import type { NuxtPage } from '@nuxt/schema'
import fs from 'fs'
import path from 'path'
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
  hooks: {
    'pages:extend'(pages) {
      // Function to read files and add routes dynamically
      function addFeaturePages(featureDir: string, basePath: string) {
        const featurePagesDir = path.resolve(__dirname, featureDir)
        const featureDirs = fs.readdirSync(featurePagesDir)

        featureDirs.forEach((dir) => {
          const dirPath = path.join(featurePagesDir, dir)

          if (fs.statSync(dirPath).isDirectory()) {
            // If it's a directory, process its pages
            const pageFiles = fs.readdirSync(dirPath)

            pageFiles.forEach((file) => {
              const pagePath = path.join(dirPath, file)
              let middleware:any = []
              // if (basePath !== 'auth') {
              //    middleware = ['auth-check']
              // }
              if (fs.statSync(pagePath).isFile() && file.endsWith('.vue')) {
                const routeName = file.replace('.vue', '')
                pages.push({
                  name: `${basePath}-${routeName}`,
                  path: `/${basePath}/${routeName}`,
                  file: `~/${featureDir}/${dir}/${file}`,
                  meta: {
                    middleware: middleware
                  }
                })
              }
            })
          }
        })
      }

      // Add pages for each feature folder (auth, list, etc.)
      const featuresDir = path.resolve(__dirname, 'features')
      const featureFolders = fs.readdirSync(featuresDir)

      featureFolders.forEach((folder) => {
        const folderPath = path.join(featuresDir, folder)

        if (fs.statSync(folderPath).isDirectory()) {
          // For each feature folder (auth, list, etc.), add the pages
          addFeaturePages(`features/${folder}`, folder)
        }
      })
    }
  },
  runtimeConfig: {
    secretKey: '',
    public: {
      api_base_url: process.env.VITE_API_BASE_URL,
      task_token: process.env.VITE_TASK_MODAL_TOKEN,
    }
  },
})

