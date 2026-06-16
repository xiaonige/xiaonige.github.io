import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://xiaonige.github.io',
  output: 'static',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
