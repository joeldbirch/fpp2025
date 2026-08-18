import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://fppdesign.com.au',
  trailingSlash: 'always',
  integrations: [react()],

  vite: {
    server: {
      watch: {
        ignored: ['**/.obsidian/**', '**/_bases/**', '**/bases/**', '**/_home/**', '**/home/**', '**/_base/**', '**/base/**']
      }
    },
    assetsInclude: ['**/*.base', '**/.obsidian/**', '**/_bases/**'],
    plugins: [tailwindcss()],
  },
})