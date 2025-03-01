import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://dithered.diy',
  trailingSlash: 'never',
  adapter: vercel({ webAnalytics: { enabled: true }, imageService: true }),
  experimental: { responsiveImages: true },
  vite: { plugins: [tailwindcss()] },
  integrations: [icon(), sitemap(), robotsTxt({ policy: [{ userAgent: '*', disallow: ['/404'] }] })],
});
