<template>
  <v-data-table
    :headers="tableHeaders"
    :items="searchResult.tweets"
    :server-items-length="searchResult.count"
    item-key="_id"
    :page="displayOptions.page"
    :items-per-page="
      displayOptions.itemsPerPage === 10000 ? -1 : displayOptions.itemsPerPage
    "
    :sort-by="displayOptions.sortKey"
    :sort-desc="displayOptions.sortOrder === 'desc'"
    must-sort
    @update:options="onDataOptionsUpdated"
  >
    <template #item.created_at="{ value }">
      <formatted-date :unix-time="value" />
    </template>

    <template #item.open="{ item }">
      <external-link
        :to="`https://twitter.com/${item.user}/status/${item._id}`"
      >
        <v-icon>mdi-open-in-new</v-icon>
      </external-link>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { SearchDisplayOptions, SearchResult } from '@twilens/types'
import { DataOptions, TableHeader } from '~/utils/DataTable'
import ExternalLink from '~/components/ExternalLink.vue'
import FormattedDate from '~/components/FormattedDate.vue'

@Component({
  components: {
    ExternalLink,
    FormattedDate
  }
})
export default class TweetsTable extends Vue {
  readonly tableHeaders: TableHeader[] = [
    { text: 'User', value: 'user' },
    { text: 'Date', value: 'created_at' },
    { text: 'Text', value: 'text', sortable: false },
    { text: 'Source', value: 'source' },
    { text: 'Retweets', value: 'retweet_count', align: 'end' },
    { text: 'Likes', value: 'like_count', align: 'end' },
    { text: 'Open', value: 'open', sortable: false }
  ]

  @Prop({
    type: Object,
    required: true
  })
  readonly displayOptions!: SearchDisplayOptions

  @Prop({
    type: Object,
    required: true
  })
  readonly searchResult!: SearchResult

  onDataOptionsUpdated({ page, itemsPerPage, sortBy, sortDesc }: DataOptions) {
    const newDisplayOptions: SearchDisplayOptions = {
      page,
      itemsPerPage: itemsPerPage === -1 ? 10000 : itemsPerPage,
      sortKey: sortBy[0],
      sortOrder: sortDesc[0] ? 'desc' : 'asc'
    }
    this.$emit('update:displayOptions', newDisplayOptions)
  }
}
</script>
