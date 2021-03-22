<template>
  <v-container class="mt-3">
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
        <user-select
          v-model="searchOptions.user"
          :users="userList"
          @input="applySearchOptionsChange"
        />
      </v-col>
      <v-col>
        <source-select
          v-model="searchOptions.source"
          :sources="sourceList"
          @input="applySearchOptionsChange"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <tweets-table
          :search-options.sync="searchOptions"
          :search-response="searchResponse"
          @update:search-options="applySearchOptionsChange"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { classToPlain, plainToClass } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import {
  ISearchRequest,
  ISearchResponse,
  SearchRequest,
  IStats
} from '@twilens/types'
import SearchForm from '~/components/SearchForm.vue'
import UserSelect from '~/components/search/UserSelect.vue'
import SourceSelect from '~/components/search/SourceSelect.vue'
import TweetsTable from '~/components/search/TweetsTable.vue'

@Component({
  components: {
    SearchForm,
    UserSelect,
    SourceSelect,
    TweetsTable
  },
  watchQuery: true
})
export default class SearchPage extends Vue {
  searchOptions: ISearchRequest = {} as any
  searchResponse: ISearchResponse = {} as any
  userList: string[] = []
  sourceList: string[] = []

  head() {
    return {
      title: this.searchOptions.query
    }
  }

  applySearchOptionsChange() {
    this.$router.push({
      path: '/search',
      query: classToPlain(this.searchOptions)
    })
  }

  async asyncData({ $axios, query }: Context) {
    const classSearchOptions = plainToClass(SearchRequest, query, {
      excludeExtraneousValues: true
    })

    await validateOrReject(classSearchOptions, {
      forbidUnknownValues: true
    })

    const searchOptions = classToPlain(classSearchOptions) as ISearchRequest

    const { data: searchResponse } = await $axios.get<ISearchResponse>(
      '/search',
      {
        params: searchOptions
      }
    )

    const { data: stats } = await $axios.get<IStats>('/stats')
    const userList = stats.users.map((user) => user.name)
    const sourceList = stats.sources.map((source) => source.name)

    return {
      searchOptions,
      searchResponse,
      userList,
      sourceList
    }
  }
}
</script>
