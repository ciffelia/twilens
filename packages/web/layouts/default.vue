<template>
  <v-app dark>
    <v-app-bar app hide-on-scroll>
      <v-toolbar-title>
        <nuxt-link to="/" class="toolbar-title">
          <span class="font-weight-black">
            🔎 twilens
          </span>
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon nuxt to="/settings">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>

    <v-footer app :absolute="true">
      <v-container>
        <v-row justify="center">
          (c) Ciffelia 2020
        </v-row>
        <v-row justify="center">
          Favicon by
          &nbsp;
          <external-link to="https://twemoji.twitter.com/">
            Twemoji
          </external-link>
          , licensed under
          &nbsp;
          <external-link to="https://creativecommons.org/licenses/by/4.0/">
            CC-BY 4.0
          </external-link>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import ExternalLink from '~/components/ExternalLink.vue'

@Component({
  components: {
    ExternalLink
  }
})
export default class DefaultLayout extends Vue {
}
</script>

<style lang="scss" scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>
