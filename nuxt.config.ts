import type { NuxtPage } from '@nuxt/schema'
import fs from 'fs'
import path from 'path'
export default defineNuxtConfig({
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
})

