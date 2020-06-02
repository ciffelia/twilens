import { ActionTree, MutationTree } from 'vuex'

export const state = () => ({
  browserBaseURL: null
})

export type RootState = ReturnType<typeof state>

export const actions: ActionTree<RootState, RootState> = {
  nuxtServerInit (store, context) {
    const serverBaseUrl = process.env.TWILENS_API_BASE_URL_SERVER
    const browserBaseURL = process.env.TWILENS_API_BASE_URL_BROWSER

    context.$axios.setBaseURL(serverBaseUrl)
    store.commit('SET_BROWSER_BASE_URL', browserBaseURL)
  },

  nuxtClientInit (store, context) {
    context.$axios.setBaseURL(store.state.browserBaseURL)
  }
}

export const mutations: MutationTree<RootState> = {
  SET_BROWSER_BASE_URL (state, browserBaseURL) {
    state.browserBaseURL = browserBaseURL
  }
}
