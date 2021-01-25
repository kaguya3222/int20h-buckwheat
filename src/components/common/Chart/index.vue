<template>
  <div class="chart-wrapper">
    <div ref="chart"></div>
  </div>
</template>

<script>
import { Chart } from 'frappe-charts/dist/frappe-charts.min.esm'

export default {
  name: 'Chart',
  props: {
    chartOptions: {
      type: Object,
      default: () => ({})
    },
    chartData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.chart = new Chart(this.$refs.chart, {
      data: this.chartData,
      ...this.chartOptions
    })
  }
}
</script>
