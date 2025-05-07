// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    'nuxt-gtag',
    '@nuxtjs/seo',
  ],
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  site: {
    url: 'https://pixelgame.vip',
    name: 'Pixel Game | FC SFC GBA GBC',
  },
  appConfig: {
    ui: {
      colors: {
        primary: 'retro',
        neutral: 'slate',
      },
    },
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    },
  },
  compatibilityDate: '2024-11-01',
  eslint: {
    config: {
      stylistic: true,
    },
  },
  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: 'G-HK4VN84PYQ',
  },
  ogImage: {
    defaults: {
      renderer: 'satori',
    },
    fonts: [
      'Noto+Sans+SC:400',
    ],
  },
  robots: {
    disallow: ['/api'],
  },
  seo: {
  },
  sitemap: {
    sitemapName: 'sitemap.xml',
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
})
