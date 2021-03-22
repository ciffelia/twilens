<template>
  <span>{{ formattedDate }}</span>
</template>

<script lang="ts">
import { parseISO, format } from 'date-fns'
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class FormattedDate extends Vue {
  @Prop({ type: String, required: true })
  readonly isoTime!: string

  get formattedDate(): string {
    const date = parseISO(this.isoTime)
    return format(date, 'yyyy/MM/dd HH:mm')
  }
}
</script>
