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
    '@nuxtjs/supabase',
    '@nuxtjs/i18n',
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
  runtimeConfig: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_SERVER_KEY,
  },
  compatibilityDate: '2024-11-01',
  nitro: {
    externals: {
      external: ['@resvg/resvg-js'],
    },
  },
  eslint: {
    config: {
      stylistic: true,
    },
  },
  gtag: {
    enabled: process.env.NODE_ENV === 'production',
    id: 'G-HK4VN84PYQ',
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
    langDir: 'locales/',
    baseUrl: 'https://pixelgame.vip', // seo： https://i18n.nuxtjs.org/docs/guide/seo
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en_US.json' },
      { code: 'zh', language: 'zh-CN', name: '简体中文', file: 'zh_CN.json' },
      { code: 'ja', language: 'ja-JP', name: '简体中文', file: 'ja_JP.json' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },
  ogImage: {
    enabled: false,
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
  sitemap: {
    sitemapName: 'sitemap.xml',
    sources: [
      '/api/__sitemap__/urls',
    ],
  },
  supabase: {
    redirect: false,
  },
})
