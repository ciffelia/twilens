<template>
  <v-select
    prepend-inner-icon="mdi-account-outline"
    label="User"
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
export default class UserSelect extends Vue {
  @Prop(String)
  readonly value!: string

  @Prop({
    type: Array,
    required: true
  })
  readonly users!: SelectItem[]

  get items(): SelectItem[] {
    return [
      // @ts-ignore
      { text: 'All', value: null },
      ...this.users
    ]
  }
}
</script>
