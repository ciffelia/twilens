<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col>
        <search-form v-model="searchQuery" @submit="search" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { SearchOptions } from '@twilens/types'
import SearchForm from '~/components/SearchForm.vue'

@Component({
  components: {
    SearchForm
  }
})
export default class IndexPage extends Vue {
  readonly DefaultSearchOptions = {
    mode: 'exact',
    user: null,
    displayOptions: {
      page: 1,
      itemsPerPage: 10,
      sortKey: 'created_at',
      sortOrder: 'desc'
    }
  } as const

  searchQuery: string = ''

  search() {
    const searchOptions: SearchOptions = {
      ...this.DefaultSearchOptions,
      query: this.searchQuery
    }

    this.$router.push({
      path: '/search',
      query: {
        q: JSON.stringify(searchOptions)
      }
    })
  }
}
</script>
