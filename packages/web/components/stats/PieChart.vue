<script lang="ts">
import { Component, Prop, mixins } from 'nuxt-property-decorator'
import VueChart, { Pie } from 'vue-chartjs'
import { ChartData, ChartOptions } from 'chart.js'

// eslint-disable-next-line import/no-named-as-default-member
const { reactiveProp } = VueChart.mixins

@Component({
  extends: Pie,
  mixins: [reactiveProp]
})
export default class PieChart extends mixins(reactiveProp, Pie) {
  @Prop({ type: Object, required: true })
  readonly chartData!: ChartData

  @Prop({ type: Object })
  readonly options!: ChartOptions

  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
