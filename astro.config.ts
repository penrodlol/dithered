import alpine from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dithered.diy',
  trailingSlash: 'never',
  output: 'server',
  adapter: vercel({ webAnalytics: { enabled: true }, imageService: true }),
  experimental: { responsiveImages: true },
  vite: { plugins: [tailwindcss()] },
  integrations: [
    alpine({ entrypoint: '/alpine.config.ts' }),
    icon(),
    sitemap(),
    robotsTxt({ policy: [{ userAgent: '*', disallow: ['/404'] }] }),
  ],
});
