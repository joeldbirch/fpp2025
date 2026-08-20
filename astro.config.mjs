import { defineConfig, passthroughImageService} from 'astro/config'
import react from '@astrojs/react'

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://fppdesign.com.au',
  trailingSlash: 'always',
  integrations: [react()],
  image: {
    service: passthroughImageService()
  },

  vite: {
    assetsInclude: ['**/*.base', '**/.obsidian/**', '**/_bases/**'],
    plugins: [tailwindcss()],
  },
})
