import { defineConfig } from 'astro/config'
import react from '@astrojs/react'

export default defineConfig({
  site: 'https://fppdesign.com.au',
  trailingSlash: 'always',
  integrations: [react()],
})
