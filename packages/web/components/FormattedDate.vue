<template>
  <span>{{ formattedDate }}</span>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { DateTime } from 'luxon'

@Component
export default class FormattedDate extends Vue {
  @Prop({ type: Number, required: true })
  readonly unixTime!: number

  get formattedDate (): string {
    const dateTime = DateTime.fromSeconds(this.unixTime)
    return dateTime.toLocaleString(DateTime.DATETIME_SHORT) ?? 'Invalid date'
  }
}
</script>
