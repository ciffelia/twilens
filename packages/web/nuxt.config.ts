import { NuxtConfig } from '@nuxt/types'

const config: NuxtConfig = {
  /*
   ** Headers of the page
   */
  head: {
    title: '',
    titleTemplate: (titleChunk) => {
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
   ** Vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    defaultAssets: {
      /*
       ** Font settings are applied only on production.
       ** https://github.com/nuxt-community/vuetify-module#defaultassets
       */
      font: {
        family: 'Noto Sans JP'
      }
    }
  }
}

export default config
