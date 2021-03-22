<template>
  <v-data-table
    :headers="tableHeaders"
    :items="searchResponse.tweets"
    :server-items-length="searchResponse.count"
    item-key="id"
    :page="searchOptions.page"
    :items-per-page="searchOptions.itemsPerPage"
    :sort-by="searchOptions.sortKey"
    :sort-desc="searchOptions.sortOrder === 'desc'"
    must-sort
    @update:options="onOptionsUpdated"
  >
    <template #item.createdAt="{ value }">
      <formatted-date :iso-time="value" />
    </template>

    <template #item.open="{ item }">
      <external-link :to="`https://twitter.com/${item.user}/status/${item.id}`">
        <v-icon>mdi-open-in-new</v-icon>
      </external-link>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { ISearchRequest, ISearchResponse } from '@twilens/types'
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
    { text: 'User', value: 'user', sortable: false },
    { text: 'Date', value: 'createdAt' },
    { text: 'Text', value: 'text', sortable: false },
    { text: 'Source', value: 'source', sortable: false },
    { text: 'Retweets', value: 'retweets', align: 'end' },
    { text: 'Likes', value: 'likes', align: 'end' },
    { text: 'Open', value: 'open', sortable: false }
  ]

  @Prop({
    type: Object,
    required: true
  })
  readonly searchOptions!: ISearchRequest

  @Prop({
    type: Object,
    required: true
  })
  readonly searchResponse!: ISearchResponse

  onOptionsUpdated({ page, itemsPerPage, sortBy, sortDesc }: DataOptions) {
    const newSearchOptions: ISearchRequest = {
      ...this.searchOptions,
      page,
      itemsPerPage,
      sortKey: sortBy[0] as any,
      sortOrder: sortDesc[0] ? 'desc' : 'asc'
    }

    this.$emit('update:search-options', newSearchOptions)
  }
}
</script>
