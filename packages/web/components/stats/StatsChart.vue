<template>
  <pie-chart :chart-data="chartData" :options="options" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { ChartData, ChartOptions } from 'chart.js'
import 'chartjs-plugin-colorschemes/src/plugins/plugin.colorschemes'
// @ts-expect-error
import { Paired12 } from 'chartjs-plugin-colorschemes/src/colorschemes/colorschemes.brewer'
import PieChart from '~/components/stats/PieChart.vue'

@Component({
  components: {
    PieChart
  }
})
export default class StatsChart extends Vue {
  @Prop({ type: Array, required: true })
  readonly data!: Array<{ name: string; count: number }>

  readonly options: ChartOptions = {
    legend: {
      display: false
    },
    plugins: {
      colorschemes: {
        scheme: Paired12
      }
    }
  } as const

  get chartData(): ChartData {
    return {
      labels: this.data.map((x) => x.name),
      datasets: [
        {
          data: this.data.map((x) => x.count)
        }
      ]
    }
  }
}
</script>
