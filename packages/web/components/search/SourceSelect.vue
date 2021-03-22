<template>
  <v-select
    prepend-inner-icon="mdi-cellphone-link"
    label="Source"
    hide-details
    :items="items"
    :value="value"
    @input="$emit('input', $event)"
  />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { SelectItem } from '~/utils/Select'

@Component
export default class SourceSelect extends Vue {
  @Prop(String)
  readonly value!: string

  @Prop({
    type: Array,
    required: true
  })
  readonly sources!: SelectItem[]

  get items(): SelectItem[] {
    return [
      // @ts-ignore
      { text: 'All', value: null },
      ...this.sources
    ]
  }
}
</script>
