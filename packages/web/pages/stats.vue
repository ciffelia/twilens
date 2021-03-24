<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Statistics</h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col class="col-8 col-sm-6">
        <h2 class="mb-2 text-center">Accounts</h2>
        <stats-chart :data="stats.users" />
      </v-col>
      <v-col class="col-8 col-sm-6">
        <h2 class="mb-2 text-center">Sources</h2>
        <stats-chart :data="stats.sources" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { Context } from '@nuxt/types'
import { IStats } from '@twilens/types'
import StatsChart from '~/components/stats/StatsChart.vue'

@Component({
  components: {
    StatsChart
  }
})
export default class StatsPage extends Vue {
  stats: IStats = {} as any

  head() {
    return {
      title: 'Stats'
    }
  }

  async asyncData({ $axios }: Context) {
    const { data: stats } = await $axios.get<IStats>('/stats')

    return {
      stats
    }
  }
}
</script>
