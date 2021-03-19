<template>
  <a :href="to" target="_blank" rel="noopener noreferrer">
    <slot />
  </a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class ExternalLink extends Vue {
  @Prop({ type: String, required: true })
  readonly to!: string
}
</script>
