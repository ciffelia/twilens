<template>
  <v-form @submit.stop.prevent="$emit('submit')">
    <v-text-field
      type="search"
      prepend-inner-icon="mdi-magnify"
      hide-details
      solo

      :value="value"
      @input="$emit('input', $event)"
    />
  </v-form>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class SearchForm extends Vue {
  @Prop(String)
  readonly value?: string
}
</script>
