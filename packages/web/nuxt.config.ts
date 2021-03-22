import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  /*
   ** Headers of the page
   */
  head: {
    title: '',
    titleTemplate: (titleChunk) => {
      // If undefined or blank then we don't need the hyphen
      return titleChunk ? `${titleChunk} - twilens` : 'twilens'
    },
    meta: [{ name: 'robots', content: 'noindex,nofollow' }],
    link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }]
  },

  /*
   ** PWA module configuration
   */
  pwa: {
    manifest: {
      name: 'twilens',
      short_name: 'twilens',
      description: '🔍 Full-text search for your tweets'
    }
  },

  /*
   ** Customize the progress-bar color
   */
  // loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify', '@nuxtjs/pwa'],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios', '@nuxtjs/proxy'],

  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    prefix: '/api'
  },

  proxy: {
    '/api': {
      target: process.env.TWILENS_API_BASE_URL,
      pathRewrite: {
        '^/api': ''
      }
    }
  },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    // theme: {
    //   dark: true
    // },
    defaultAssets: {
      /*
       ** Font settings are applies only on production.
       ** https://github.com/nuxt-community/vuetify-module#defaultassets
       */
      font: {
        family: 'Noto Sans JP'
      }
    }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(_config, _ctx) {}
  }
}

export default config
