import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://droiddeck-guide.gg',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh', 'ja'],
    routing: {
      prefixDefaultLocale: false
    },
    fallback: {
      zh: 'en',
      ja: 'en'
    }
  }
});
