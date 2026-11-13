import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://droiddeck-guide.gg',
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
