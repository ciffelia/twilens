<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col>
        <search-form v-model="searchOptions.query" @submit="search" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { ISearchRequest } from '@twilens/types'
import SearchForm from '~/components/SearchForm.vue'

@Component({
  components: {
    SearchForm
  }
})
export default class IndexPage extends Vue {
  searchOptions: ISearchRequest = {
    query: '',
    user: '',
    source: '',
    page: 1,
    itemsPerPage: 10,
    sortKey: 'createdAt',
    sortOrder: 'desc'
  }

  search() {
    this.$router.push({
      path: '/search',
      query: this.searchOptions as any
    })
  }
}
</script>
