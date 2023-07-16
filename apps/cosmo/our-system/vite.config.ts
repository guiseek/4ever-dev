/// <reference types="vitest" />
import {defineConfig} from 'vite'

import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  cacheDir: '../../../node_modules/.vite/cosmo-our-system',
  assetsInclude: [
    'assets/textures/cosmo/our-system/**/*.png',
    'assets/audio/**/*.mp3',
  ],
  publicDir: 'assets',
  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    viteTsConfigPaths({
      root: '../../../',
    }),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../../',
  //    }),
  //  ],
  // },
})
