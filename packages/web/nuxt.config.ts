import { Configuration } from '@nuxt/types'

const config: Configuration = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: (titleChunk) => {
      // If undefined or blank then we don't need the hyphen
      return titleChunk ? `${titleChunk} - twilens` : 'twilens'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'robots', content: 'noindex,nofollow' },
      { hid: 'description', name: 'description', content: '🔍 Full-text search for your tweets' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  /*
  ** PWA module configuration
  */
  pwa: {
    icon: {
      iconFileName: 'favicon.png'
    },
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
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-client-init-module',
    '@nuxtjs/axios'
  ],

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
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
    extend (_config, _ctx) {
    }
  }
}

export default config
