<template>
  <v-container>
    <v-row>
      <v-col>
        <search-form
          v-model="searchOptions.query"
          @submit="applySearchOptionsChange"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <search-mode-select
          v-model="searchOptions.mode"
          @input="applySearchOptionsChange"
        />
      </v-col>
      <v-col>
        <user-select
          v-model="searchOptions.user"
          :users="userList"
          @input="applySearchOptionsChange"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tweets-table
          :display-options.sync="searchOptions.displayOptions"
          :search-result="searchResult"
          @update:displayOptions="applySearchOptionsChange"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { SearchOptions, SearchResult } from '@twilens/types'
import { buildSearchQuery } from '~/utils/elastic/buildSearchQuery'
import { buildListQuery } from '~/utils/elastic/buildListQuery'
import { parseSearchResult } from '~/utils/elastic/parseSearchResult'
import { parseListResult } from '~/utils/elastic/parseListResult'
import SearchForm from '~/components/SearchForm.vue'
import SearchModeSelect from '~/components/search/SearchModeSelect.vue'
import UserSelect from '~/components/search/UserSelect.vue'
import TweetsTable from '~/components/search/TweetsTable.vue'

@Component({
  components: {
    SearchForm,
    SearchModeSelect,
    UserSelect,
    TweetsTable
  },
  watchQuery: ['q']
})
export default class SearchPage extends Vue {
  searchOptions: SearchOptions = {} as any
  searchResult: SearchResult = {} as any
  userList: string[] = []

  head() {
    return {
      title: this.searchOptions.query
    }
  }

  applySearchOptionsChange() {
    this.$router.push({
      path: '/search',
      query: {
        q: JSON.stringify(this.searchOptions)
      }
    })
  }

  async asyncData({ $axios, query }: Context) {
    const searchOptions = JSON.parse(query.q as string) as SearchOptions

    const searchBody = buildSearchQuery(searchOptions)
    const { data: rawSearchResult } = await $axios.post('/search', searchBody)
    const searchResult = parseSearchResult(rawSearchResult)

    const userListQuery = buildListQuery('user')
    const { data: rawListResult } = await $axios.post('/search', userListQuery)
    const userList = parseListResult(rawListResult)

    return {
      searchOptions,
      searchResult,
      userList
    }
  }
}
</script>
