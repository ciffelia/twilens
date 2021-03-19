<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-alert type="error">
        {{ message }}
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

  get message(): string {
    return `Error ${this.error.statusCode}: ${this.error.message}`
  }

  head() {
    return {
      title: this.message
    }
  }
}
</script>
