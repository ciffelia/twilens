<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-alert type="error" prominent>
        <div class="text-h5">Error {{ error.statusCode }}</div>
        <pre class="body-1">{{ error.message }}</pre>
      </v-alert>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { NuxtError } from '@nuxt/types'

@Component
export default class ErrorPage extends Vue {
  @Prop({ type: Object, required: true })
  readonly error!: NuxtError

  head() {
    return {
      title: `Error ${this.error.statusCode}`
    }
  }
}
</script>
