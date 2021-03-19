<template>
  <v-select
    prepend-inner-icon="mdi-tag-outline"
    label="Search mode"
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
export default class SearchModeSelect extends Vue {
  @Prop(String)
  readonly value!: string

  readonly items: SelectItem[] = [
    { text: 'Exact match', value: 'exact' },
    { text: 'Fuzzy match', value: 'fuzzy' }
  ]
}
</script>
